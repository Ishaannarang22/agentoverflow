// server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { chromium } from "playwright";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ---------------------
// Config & App setup
// ---------------------
const {
  GOOGLE_API_KEY,
  PORT = 8080,
  CORS_ORIGIN = "*",
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

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: parseInt(RATE_LIMIT_PER_MIN, 10),
});
app.use(limiter);

const usage = { totalCalls: 0 };
app.use((req, _res, next) => {
  usage.totalCalls += 1;
  next();
});

// ---------------------
// Gemini setup
// ---------------------
const genai = new GoogleGenerativeAI(GOOGLE_API_KEY);
const MODEL = "gemini-2.5-flash";
const model = genai.getGenerativeModel({ model: MODEL });

const responseSchema = {
  type: "object",
  properties: {
    title: { type: "string", description: "Brief descriptive title..." },
    problem: { type: "string", description: "1-2 sentence description..." },
    context: { type: "string", description: "Summarized overview..." },
    technical_description: { type: "string", description: "Detailed technical explanation..." },
    solution: { type: "string", description: "Clear description of the working solution..." },
    summary: { type: "string", description: "Brief 2-3 sentence summary..." },
    error_messages: { type: "array", items: { type: "string" }, description: "List of exact error messages..." },
    attempted_solutions: { type: "array", items: { type: "string" }, description: "List of solutions tried and failed..." },
    code_snippets: {
      type: "array",
      items: {
        type: "object",
        properties: {
          description: { type: "string", description: "e.g., 'Broken implementation'"},
          code: { type: "string", description: "The actual code snippet." },
        },
        required: ["description", "code"],
      },
      description: "Key code snippets...",
    },
    technical_deep_context: { type: "string", description: "Extract MAXIMUM information..." },
    tags: { type: "array", items: { type: "string" }, description: "List of relevant tags..." },
  },
  required: [
    "title", "problem", "context", "technical_description", "solution",
    "summary", "error_messages", "attempted_solutions", "code_snippets",
    "technical_deep_context", "tags",
  ],
};

// ---------------------
// Scraper helpers
// ---------------------

async function expandAll(page) {
  const selectors = [
    'button:has-text("Show more")',
    'button:has-text("Expand")',
    'button:has-text("Continue")',
    'button:has-text("Read more")',
    "summary",
  ];
  for (const sel of selectors) {
    try {
      for (let i = 0; i < 20; i++) {
        const el = page.locator(sel).first();
        if (!(await el.isVisible().catch(() => false))) break;
        await el.click({ timeout: 2000 }).catch(() => {});
        await page.waitForTimeout(250);
      }
    } catch {
      // ignore
    }
  }
}

async function autoScrollAll(page) {
  // Scroll down to trigger lazy/virtualized content
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    let lastHeight = 0;
    let stablePasses = 0;
    for (let i = 0; i < 80; i++) {
      window.scrollBy(0, 2000);
      await sleep(200);
      const sh =
        document.scrollingElement?.scrollHeight || document.body.scrollHeight;
      if (sh === lastHeight) {
        if (++stablePasses >= 3) break;
      } else {
        stablePasses = 0;
        lastHeight = sh;
      }
    }
    // Scroll back to the top in case older messages render on reverse scroll
    stablePasses = 0;
    for (let i = 0; i < 80; i++) {
      window.scrollBy(0, -2000);
      await sleep(200);
      const st = document.scrollingElement?.scrollTop || 0;
      if (st <= 0) {
        if (++stablePasses >= 3) break;
      } else {
        stablePasses = 0;
      }
    }
  });
}

function tryExtractMessagesFromJSON(data) {
  const out = [];
  const visit = (node) => {
    if (!node) return;
    if (Array.isArray(node)) {
      node.forEach(visit);
      return;
    }
    if (typeof node === "object") {
      // Common pattern: { messages: [...] }
      if (Array.isArray(node.messages)) {
        for (const m of node.messages) {
          let role =
            (m.role || m.author || m.sender || m.type || "").toString().toLowerCase();
          if (role.includes("assistant") || role.includes("claude")) role = "assistant";
          else if (role.includes("user") || role.includes("human")) role = "user";
          else role = "unknown";

          let content = "";
          if (typeof m.content === "string") content = m.content;
          else if (Array.isArray(m.content)) {
            content = m.content
              .map((p) =>
                typeof p === "string"
                  ? p
                  : (p.text || p.value || p.content || "").toString()
              )
              .filter(Boolean)
              .join("\n");
          } else if (m.text) content = String(m.text);
          if (content && content.trim()) out.push({ role, content: content.trim() });
        }
      }
      // Walk children
      for (const k of Object.keys(node)) visit(node[k]);
    }
  };
  visit(data);
  return out;
}

async function sniffNetworkForMessages(page) {
  let collected = [];
  const listeners = async (response) => {
    try {
      const req = response.request();
      const url = response.url();
      const type = req.resourceType();
      const headers = response.headers();
      const ct = (headers["content-type"] || headers["Content-Type"] || "").toLowerCase();

      // Only consider JSON XHR/fetch to claude.ai origins
      if (
        !url.includes("claude.ai") ||
        !["xhr", "fetch"].includes(type) ||
        !ct.includes("application/json")
      ) {
        return;
      }

      const json = await response.json().catch(() => null);
      if (!json) return;

      const extracted = tryExtractMessagesFromJSON(json);
      if (extracted.length) {
        collected = extracted; // overwrite with freshest
      }
    } catch {
      /* ignore */
    }
  };

  page.on("response", listeners);
  return {
    get: () => collected,
    dispose: () => page.off("response", listeners),
  };
}

async function extractMessagesFromDOM(page) {
  return await page.evaluate(() => {
    function* deepNodes(root) {
      const stack = [root];
      while (stack.length) {
        const n = stack.pop();
        if (!n) continue;
        if (n.shadowRoot) stack.push(n.shadowRoot);
        if (n.childNodes && n.childNodes.length) {
          for (let i = n.childNodes.length - 1; i >= 0; i--) stack.push(n.childNodes[i]);
        }
        yield n;
      }
    }

    const msgs = [];
    const seen = new Set();

    for (const n of deepNodes(document.documentElement)) {
      if (!(n instanceof Element)) continue;
      const el = n;

      const looksLikeMessage =
        el.getAttribute?.("data-author-role") ||
        el.getAttribute?.("data-testid")?.includes("message") ||
        el.getAttribute?.("role") === "article" ||
        /\bmessage\b/i.test(el.className || "") ||
        /\bprose\b|\bmarkdown\b|\bwhitespace-pre-wrap\b/.test(el.className || "");

      if (!looksLikeMessage) continue;

      let role =
        (el.getAttribute && el.getAttribute("data-author-role")) || "";
      if (!role) {
        const cls = (el.className || "").toString().toLowerCase();
        if (/\bassistant|claude\b/.test(cls)) role = "assistant";
        else if (/\buser|human\b/.test(cls)) role = "user";
      }
      let p = el.parentElement,
        hops = 0;
      while (!role && p && hops++ < 3) {
        const ra = p.getAttribute?.("data-author-role");
        if (ra) {
          role = ra;
          break;
        }
        const pc = (p.className || "").toString().toLowerCase();
        if (/\bassistant|claude\b/.test(pc)) {
          role = "assistant";
          break;
        }
        if (/\buser|human\b/.test(pc)) {
          role = "user";
          break;
        }
        p = p.parentElement;
      }

      const text = (el.innerText || el.textContent || "").trim();
      if (!text) continue;

      const key = role + "|" + text.slice(0, 200);
      if (seen.has(key)) continue;
      seen.add(key);

      msgs.push({
        role: role === "assistant" || role === "user" ? role : "unknown",
        content: text,
      });
    }

    if (!msgs.length) {
      const allVisible = [];
      for (const n of deepNodes(document.body)) {
        if (!(n instanceof Element)) continue;
        const style = getComputedStyle(n);
        if (style.display === "none" || style.visibility === "hidden") continue;
        const t = (n.innerText || "").trim();
        if (t) allVisible.push(t);
      }
      return [{ role: "unknown", content: allVisible.join("\n\n") }];
    }

    return msgs;
  });
}

function totalChars(messages) {
  return (messages || []).reduce((n, m) => n + (m.content?.length || 0), 0);
}

/**
 * Main scraper: returns array of { role, content }
 */
async function fetchClaudeChatMessages(url) {
  console.log(`[Scraper] Launching browser for: ${url}`);
  let browser = null;
  try {
    browser = await chromium.launch({
      headless: true,
      args: [
        "--disable-blink-features=AutomationControlled",
        "--disable-dev-shm-usage",
        "--no-sandbox",
        "--disable-setuid-sandbox",
      ],
    });

    const context = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      viewport: { width: 1920, height: 1080 },
      locale: "en-US",
      timezoneId: "America/Los_Angeles",
      javaScriptEnabled: true,
      extraHTTPHeaders: {
        "Accept-Language": "en-US,en;q=0.9",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Upgrade-Insecure-Requests": "1",
      },
    });

    const page = await context.newPage();

    // Anti-webdriver flag
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "webdriver", { get: () => undefined });
      window.chrome = { runtime: {} };
    });

    const netSniffer = await sniffNetworkForMessages(page);

    console.log("[Scraper] Navigating...");
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForLoadState("networkidle");
    await page.waitForSelector("main, [role='main']", { timeout: 30000 });

    await expandAll(page);
    await autoScrollAll(page);
    await page.waitForLoadState("networkidle");

    // Prefer network-captured messages if available
    let messages = netSniffer.get();
    if (!messages || messages.length === 0) {
      console.log("[Scraper] No network JSON found; extracting from DOM.");
      messages = await extractMessagesFromDOM(page);
    } else {
      console.log(
        `[Scraper] Extracted ${messages.length} messages from network JSON.`
      );
    }

    // If still too small, try one more slow pass
    if (totalChars(messages) < 800) {
      console.warn(
        `[Scraper] Low content (${totalChars(
          messages
        )} chars). Retrying with extra scroll & expand...`
      );
      await expandAll(page);
      await autoScrollAll(page);
      await page.waitForLoadState("networkidle");
      let fallback = await extractMessagesFromDOM(page);
      if (totalChars(fallback) > totalChars(messages)) {
        messages = fallback;
      }
    }

    netSniffer.dispose();
    await browser.close();

    if (!messages || !messages.length || totalChars(messages) < 200) {
      throw new Error(
        `Failed to extract meaningful chat content (chars=${totalChars(messages)})`
      );
    }

    console.log(
      `[Scraper] Success: ${messages.length} messages, ${totalChars(
        messages
      )} chars.`
    );
    return messages;
  } catch (err) {
    console.error("[Scraper] Error:", err?.stack || err?.message);
    if (browser) {
      try {
        await browser.close();
      } catch {}
    }
    throw new Error(`Scraping failed: ${err.message}`);
  }
}

// ---------------------
// Summarization
// ---------------------
async function summarizeWithGemini(messages, maxTurns) {
  const trimmed = messages.slice(-Math.max(1, parseInt(maxTurns || 1, 10)));
  const compact = trimmed.map((m) => `${m.role}: ${m.content}`).join("\n\n---\n\n");

  const system = `You are an expert technical writer and code analyst. Your task is to analyze the following chat transcript and convert it into a single, precise JSON object adhering *perfectly* to the provided schema.

Guidelines:
- **title**: Create a short, descriptive title like a blog post or Stack Overflow question.
- **problem**: Describe the user's core problem in 1-2 sentences.
- **context**: Summarize the setup. What were they trying to do? What was happening vs. what was expected?
- **technical_description**: Explain the *root cause* of the problem.
- **solution**: Describe the *final, working fix* clearly.
- **summary**: 2-3 sentence overview.
- **error_messages**: Verbatim messages from the chat (or []).
- **attempted_solutions**: Specific fixes tried that failed (or []).
- **code_snippets**: Most important code blocks; include final, working solution.
- **technical_deep_context**: Be exhaustive (versions, libs, env, configs).
- **tags**: 5-10 relevant tags.

Return ONLY the valid JSON object.`;

  console.log("[Gemini] Sending transcript to AI for summarization...");
  console.log("--- START OF TEXT SENT TO GEMINI ---");
  console.log(compact.slice(0, 2000)); // limit log size
  console.log("--- END OF TEXT SENT TO GEMINI ---");

  const resp = await model.generateContent({
    contents: [
      { role: "user", parts: [{ text: system }] },
      { role: "user", parts: [{ text: `Transcript:\n\n${compact}` }] },
    ],
    generationConfig: {
      temperature: 0.1,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
      responseSchema,
    },
  });

  if (resp.response.candidates && resp.response.candidates[0].finishReason !== "STOP") {
    console.warn(
      `[Gemini] finishReason: ${resp.response.candidates[0].finishReason}. Output may be truncated.`
    );
  }

  const text = resp.response.text();
  return JSON.parse(text);
}

// ---------------------
// Routes
// ---------------------
app.get("/healthz", (_req, res) => {
  res.json({ ok: true, model: MODEL, usage });
});

app.post("/api/share-solution", async (req, res) => {
  const { url } = req.body || {};
  console.log(`[Server] Received request for URL: ${url}`);

  try {
    if (!url || typeof url !== "string" || !url.includes("claude.ai/share/")) {
      console.warn(`[Server] Invalid URL: ${url}`);
      return res.status(400).json({ ok: false, error: "Missing or invalid 'url'." });
    }

    console.log(`[Server] Processing (scrape): ${url}`);
    const messages = await fetchClaudeChatMessages(url);

    const summaryFromAI = await summarizeWithGemini(messages, parseInt(MAX_TURNS, 10));

    const solution_id = url.split("/").pop() || Date.now().toString();
    const finalJson = {
      ...summaryFromAI,
      solution_id,
      share_link: url,
      type: "share",
      created_at: new Date().toISOString(),
    };

    res.json({ ok: true, summary: finalJson });
  } catch (e) {
    console.error(`[Server] Error processing ${url}: ${e.stack || e.message}`);
    res.status(500).json({ ok: false, error: `Processing failed: ${e.message}` });
  }
});

app.post("/api/find-solution", async (_req, res) => {
  console.log("[Server] /api/find-solution called");
  res.json({ ok: true, matches: [] });
});

// ---------------------
// Start server
// ---------------------
app.listen(PORT, () => {
  console.log(`Backend listening on :${PORT} (Using Model: ${MODEL})`);
  console.log(`Scraping method: Playwright (shadow DOM + auto-scroll + JSON sniff)`);
});
