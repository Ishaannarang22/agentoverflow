import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { LRUCache } from "lru-cache";
import { chromium } from "playwright";
import * as cheerio from "cheerio";
import { GoogleGenerativeAI } from "@google/generative-ai";

const {
  GOOGLE_API_KEY,
  PORT = 8080,
  CORS_ORIGIN = "*",
  ALLOW_PAID_FEATURES = "false",
  MAX_TURNS = "30",
  RATE_LIMIT_PER_MIN = "10",
} = process.env;

if (!GOOGLE_API_KEY) {
  console.error("Missing GOOGLE_API_KEY in .env");
  process.exit(1);
}

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(cors({ origin: CORS_ORIGIN === "*" ? true : CORS_ORIGIN }));

// Rate limit (avoid blowing free tier)
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: parseInt(RATE_LIMIT_PER_MIN, 10),
});
app.use(limiter);

// Tiny usage counter
const usage = { totalCalls: 0 };
app.use((req, _res, next) => {
  usage.totalCalls += 1;
  next();
});

// Cache by share link for 15 min
const cache = new LRUCache({ max: 200, ttl: 15 * 60 * 1000 });

// Gemini setup (AI Studio key; free tier)
const genai = new GoogleGenerativeAI(GOOGLE_API_KEY);
const MODEL = "gemini-2.5-flash"; // free-tier-friendly
const model = genai.getGenerativeModel({ model: MODEL });

// --- helpers ---
const strip = (s = "") =>
  s.replace(/```[\s\S]*?```/g, m => m.replace(/```/g, "")) // keep code, drop fences
   .replace(/`/g, "")
   .replace(/<[^>]+>/g, " ")
   .replace(/\s+/g, " ")
   .trim();

const hardCapWords = (s = "", n) => {
  const w = s.match(/\w+(?:'\w+)?/g) || [];
  return w.length <= n ? w.join(" ") : w.slice(0, n).join(" ");
};

function normalizePairs(rawHtml) {
  const $ = cheerio.load(rawHtml);
  let mainText =
    $("main").text() || $("article").text() || $("body").text() || $.text();
  mainText = mainText.replace(/\r/g, "");
  const blocks = mainText
    .split(/(?=(?:User:|Human:|Claude:|Assistant:))/)
    .map(s => s.trim())
    .filter(Boolean);
  const roleRe = /^(User|Human|Claude|Assistant)\s*:\s*/i;
  const messages = [];
  if (blocks.length > 1) {
    for (const b of blocks) {
      const m = b.match(roleRe);
      if (m) {
        const role = /user|human/i.test(m[1]) ? "user" : "assistant";
        const content = b.replace(roleRe, "").trim();
        messages.push({ role, content: strip(content) });
      } else if (messages.length) {
        messages[messages.length - 1].content = strip(
          (messages[messages.length - 1].content + "\n" + b).trim()
        );
      }
    }
  } else {
    messages.push({ role: "unknown", content: strip(mainText) });
  }
  return messages;
}

async function fetchClaudeShareHTML(url) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(1500);
  const html = await page.content();
  await browser.close();
  return html;
}

// Strict JSON response schema
const responseSchema = {
  type: "object",
  properties: {
    problem: { type: "string" },
    context: { type: "string" },
    error_messages: {
      type: "array",
      items: { type: "string" }
    },
    attempted_solutions: {
      type: "array",
      items: { type: "string" }
    },
    code_snippets: {
      type: "array",
      items: {
        type: "object",
        properties: {
          description: { type: "string" },
          code: { type: "string" }
        },
        required: ["description", "code"]
      }
    },
    tags: {
      type: "array",
      items: { type: "string" }
    }
  },
  required: [
    "problem",
    "context",
    "error_messages",
    "attempted_solutions",
    "code_snippets",
    "tags"
  ]
};

async function summarizeWithGemini(messages, maxTurns) {
  const trimmed = messages.slice(-Math.max(1, maxTurns));
  const compact = trimmed.map(m => {
    let c = m.content;
    // NOTE: keep code blocks; they’re needed for code_snippets extraction.
    if (c.length > 12000) c = c.slice(0, 11800) + " …snip…";
    return { role: m.role, content: c };
  });

  const system = `
You are Agent Overflow’s extractor. Return ONLY valid JSON following this schema:
{
  "problem": string,                      // 1–2 sentences describing the core issue
  "context": string,                      // concise background (stack, versions, what they are trying)
  "error_messages": string[],             // up to 5 distinct messages/symptoms (verbatim if possible)
  "attempted_solutions": string[],        // up to 5 actions already tried (short phrases)
  "code_snippets": [                      // up to 2 critical snippets
    { "description": string, "code": string }
  ],
  "tags": string[]                        // 4–10 concise tags (kebab or snake case)
}

Guidelines:
- Prefer concrete, verifiable details lifted from the transcript.
- Keep "problem" to 1–2 sentences; "context" <= ~80 words.
- Collapse duplicates; preserve exact error text when available.
- Include at least 1 code_snippet if any code appears in the transcript.
- If something is unknown, use an empty array [] or empty string "" accordingly.
`.trim();

  const resp = await model.generateContent({
    contents: [
      { role: "user", parts: [{ text: system }] },
      { role: "user", parts: [{ text: JSON.stringify({ transcript: compact }) }] }
    ],
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 600,
      responseMimeType: "application/json",
      responseSchema
    }
  });

  // With responseSchema, this should be valid JSON:
  let out;
  try {
    out = JSON.parse(resp.response.text());
  } catch {
    // Fallback to a minimal empty object with required keys
    out = {
      problem: "",
      context: "",
      error_messages: [],
      attempted_solutions: [],
      code_snippets: [],
      tags: []
    };
  }

  // Optional tightening/caps (light-touch)
  const limitWords = (s, n) => {
    const w = s.match(/\w+(?:'\w+)?/g) || [];
    return w.length <= n ? w.join(" ") : w.slice(0, n).join(" ");
  };
  out.problem = limitWords(out.problem || "", 40);     // ~1–2 sentences
  out.context = limitWords(out.context || "", 100);    // compact
  out.error_messages = Array.isArray(out.error_messages) ? out.error_messages.slice(0, 5) : [];
  out.attempted_solutions = Array.isArray(out.attempted_solutions) ? out.attempted_solutions.slice(0, 5) : [];
  out.code_snippets = Array.isArray(out.code_snippets) ? out.code_snippets.slice(0, 2) : [];
  out.tags = Array.isArray(out.tags) ? out.tags.slice(0, 10) : [];

  return out;
}

// --- routes ---
app.get("/healthz", (_req, res) => {
  res.json({ ok: true, model: MODEL, usage });
});

/**
 * POST /api/share-solution
 * body: { url: "https://claude.ai/share/..." }
 * Flow: fetch -> parse -> summarize (Gemini) -> return JSON
 */
app.post("/api/share-solution", async (req, res) => {
  try {
    const { url } = req.body || {};
    if (!url || typeof url !== "string") {
      return res.status(400).json({ ok: false, error: "Missing 'url' (Claude share link)." });
    }

    if (cache.has(url)) {
      return res.json({ ok: true, summary: cache.get(url) });
    }

    const html = await fetchClaudeShareHTML(url);
    const messages = normalizePairs(html);
    const summary = await summarizeWithGemini(messages, parseInt(MAX_TURNS, 10));
    cache.set(url, summary);

    res.json({ ok: true, summary });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: "Failed to parse/summarize chat." });
  }
});

// Stub for later: vector DB search
app.post("/api/find-solution", async (_req, res) => {
  res.json({ ok: true, matches: [] });
});

app.listen(PORT, () => {
  console.log(`Agent Overflow backend listening on :${PORT} (free-tier Gemini)`);
});
