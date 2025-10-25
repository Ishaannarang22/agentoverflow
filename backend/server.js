import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { LRUCache } from "lru-cache";
import { chromium } from "playwright"; // Still needed
// import * as cheerio from "cheerio"; // No longer needed
import { GoogleGenerativeAI } from "@google/generative-ai";

// --- Config and Express Setup ---
const {
    GOOGLE_API_KEY,
    PORT = 8080,
    CORS_ORIGIN = "*",
    MAX_TURNS = "30",
    RATE_LIMIT_PER_MIN = "10"
} = process.env;

if (!GOOGLE_API_KEY) {
    console.error("Missing GOOGLE_API_KEY in .env");
    process.exit(1);
}

const app = express();
app.use(express.json({ limit: "1mb" })); // Allow larger bodies for potentially long text
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

//const cache = new LRUCache({ max: 200, ttl: 15 * 60 * 1000 });

// --- Gemini Setup ---
const genai = new GoogleGenerativeAI(GOOGLE_API_KEY);
const MODEL = "gemini-2.5-flash"; // Using Flash model as requested
const model = genai.getGenerativeModel({ model: MODEL });

/**
 * Scrapes a Claude share link using local Playwright with anti-detection measures.
 * Extracts and returns the plain text content directly using page.evaluate().
 * @param {string} url - Claude share link
 * @returns {Promise<string>} - Plain text content of the chat
 */
async function fetchClaudeChatText(url) {
    console.log(`[Scraper] Launching local browser to scrape: ${url}`);
    let browser = null; // Initialize browser to null
    try {
        browser = await chromium.launch({
            headless: true, // Keep headless true for server deployment
            args: [
                '--disable-blink-features=AutomationControlled',
                '--disable-dev-shm-usage',
                '--no-sandbox',
                '--disable-setuid-sandbox',
            ]
        });

        const context = await browser.newContext({
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            viewport: { width: 1920, height: 1080 },
            locale: 'en-US',
            timezoneId: 'America/Los_Angeles', // Choose relevant timezone
            javaScriptEnabled: true, // Ensure JS is enabled
            extraHTTPHeaders: {
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
                'Upgrade-Insecure-Requests': '1'
            }
        });

        const page = await context.newPage();

        // Anti-webdriver detection script
        await page.addInitScript(() => {
            Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
            window.chrome = { runtime: {} }; // Mock chrome object
        });

        console.log('[Scraper] Navigating to page...');
        await page.goto(url, {
            waitUntil: "domcontentloaded", // Wait for initial HTML structure
            timeout: 60000 // Increased timeout to 60 seconds
        });

        console.log('[Scraper] Initial page load complete. Checking for Cloudflare...');
        await page.waitForTimeout(5000); // Wait for initial scripts/checks

        const title = await page.title();
        if (title.includes('Just a moment') || title.includes('Cloudflare')) {
            console.warn('[Scraper] Cloudflare challenge detected. Waiting longer...');
            await page.waitForTimeout(15000); // Increase wait time for Cloudflare
            const newTitle = await page.title();
            if (newTitle.includes('Just a moment') || newTitle.includes('Cloudflare')) {
                console.error('[Scraper] Still on Cloudflare page after extended wait.');
                throw new Error("Cloudflare challenge blocked scraping.");
            }
            console.log('[Scraper] Passed Cloudflare check (based on title change).');
        } else {
            console.log('[Scraper] No obvious Cloudflare challenge detected on initial load.');
        }

        console.log('[Scraper] Waiting for actual chat content indicator (User/Claude labels)...');
        try {
            // Wait for elements containing the text "User" or "Claude" to ensure chat is loaded
            const chatContentSelector = 'div:has-text("User"), div:has-text("Claude"), p:has-text("User"), p:has-text("Claude")'; // Added p tag just in case
            await page.waitForSelector(chatContentSelector, { timeout: 30000 }); // Increase wait time to 30 seconds
            console.log('[Scraper] Chat content labels found.');
            await page.waitForTimeout(2000); // Give an extra 2 seconds for rendering after labels appear
        } catch (e) {
            console.error('[Scraper] Chat content labels not found after extended wait.');
            // Attempt to capture HTML for debugging before throwing
            try {
                 const errorHtml = await page.content();
                 console.error("[Scraper] HTML content when labels not found:", errorHtml.substring(0, 1000) + "...");
            } catch (htmlError) {
                 console.error("[Scraper] Could not get HTML content after timeout.");
            }
            throw new Error("Timed out waiting for chat content labels (User/Claude). Page might be blocked or structured differently.");
        }

        console.log('[Scraper] Extracting text directly using page.evaluate()...');
        // Use page.evaluate to get innerText directly from the browser context
        const conversationText = await page.evaluate(() => {
            const main = document.querySelector('main') ||
                         document.querySelector('article') ||
                         document.querySelector('[role="main"]') ||
                         document.body; // Fallback to body
            // Check if main element exists before trying to get innerText
            return main ? main.innerText : null;
        });

        await browser.close();
        console.log('[Scraper] Browser closed.');

        // Check if extracted text is valid
        if (!conversationText || conversationText.trim().length < 50) { // Check if text is reasonably long
            console.warn("[Scraper] Warning: Extracted text via page.evaluate() seems too short or empty.");
            console.warn("[Scraper] Text Preview:", conversationText ? conversationText.substring(0,200) + "..." : "null");
            throw new Error("Failed to extract meaningful text content via page.evaluate(). Check page structure or if content loaded.");
        }

        console.log(`[Scraper] Successfully extracted ${conversationText.trim().length} characters via page.evaluate().`);
        return conversationText.trim(); // Return the clean plain text

    } catch (error) {
        console.error('[Scraper] Error during local Playwright scraping:', error.message);
        if (browser) {
            try { await browser.close(); } catch (closeError) { /* Ignore */ }
        }
        // Re-throw the error to be caught by the API endpoint handler
        throw new Error(`Scraping failed: ${error.message}`);
    }
}


/**
 * Parses plain text into a message list based on role markers.
 * @param {string} rawText - The plain text scraped from the chat.
 * @returns {Array<{role: string, content: string}>} - Parsed messages.
 */
function normalizePairs(rawText) {
    console.log("[Parser] Received raw text length:", rawText ? rawText.length : 0);
    try {
        if (!rawText) {
            throw new Error("Received empty or null text to parse.");
        }
        const cleanText = rawText.replace(/\r/g, ""); // Remove carriage returns

        // Split by the role markers using regex lookahead. Handles User:, Human:, Claude:, Assistant:
        const blocks = cleanText
            .split(/(?=(?:User:|Human:|Claude:|Assistant:))/)
            .map((s) => s.trim()) // Trim whitespace
            .filter(Boolean); // Remove any empty strings resulting from split

        console.log("[Parser] Number of blocks found after split:", blocks.length);
        if (blocks.length > 0) {
            console.log("[Parser] First block preview:", blocks[0].substring(0, 200) + "...");
        } else {
             console.warn("[Parser] Split operation resulted in 0 blocks. The text might lack role markers.");
             // Return a single 'unknown' block as fallback if no markers found
             return [{ role: "unknown", content: cleanText }];
        }

        const roleRe = /^(User|Human|Claude|Assistant)\s*:\s*/i;
        const messages = [];

        for (const b of blocks) {
            const match = b.match(roleRe);
            if (match) {
                // Found a role marker at the beginning
                const role = /user|human/i.test(match[1]) ? "user" : "assistant";
                const content = b.replace(roleRe, "").trim(); // Get text after the marker
                messages.push({ role, content });
            } else if (messages.length > 0) {
                // This block doesn't start with a role marker, append it to the previous message
                console.log("[Parser] Appending block to previous message (no role marker found). Preview:", b.substring(0, 100) + "...");
                messages[messages.length - 1].content = (
                    messages[messages.length - 1].content + "\n\n" + b // Add double newline for separation
                ).trim();
            } else {
                // This is the first block and it doesn't have a role marker (unusual)
                console.warn("[Parser] First block did not match role pattern:", b.substring(0, 100) + "...");
                messages.push({ role: "unknown", content: b });
            }
        }

        // Final check if messages array is somehow empty
        if (messages.length === 0) {
            console.error("[Parser] Failed to parse any messages structure even after processing blocks.");
             // Use the original clean text as a last resort
             return [{ role: "unknown", content: cleanText }];
        }

        console.log(`[Parser] Successfully parsed ${messages.length} messages.`);
        return messages;

    } catch (e) {
        console.error("[Parser] Error parsing raw text:", e);
        // Ensure an error is thrown to be caught by the endpoint
        throw new Error(`Failed to parse scraped text: ${e.message}`);
    }
}


// --- Gemini Summarization ---
// (Your complex response schema definition goes here)
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

async function summarizeWithGemini(messages, maxTurns) {
    const trimmed = messages.slice(-Math.max(1, maxTurns));
    // Format for Gemini: Role: Content, separated by newlines
    const compact = trimmed.map((m) => `${m.role}: ${m.content}`)
        .join("\n\n---\n\n"); // Use triple dash separator for clarity

    const system = `You are an expert technical writer and code analyst. Your task is to analyze the following chat transcript and convert it into a single, precise JSON object adhering *perfectly* to the provided schema.

Guidelines:
- **title**: Create a short, descriptive title like a blog post or Stack Overflow question.
- **problem**: Describe the user's core problem in 1-2 sentences.
- **context**: Summarize the setup. What were they trying to do? What was happening vs. what was expected?
- **technical_description**: Explain the *root cause* of the problem (e.g., "The useEffect hook was re-running on every render because...").
- **solution**: Describe the *final, working fix* clearly.
- **summary**: Write a 2-3 sentence overview of the entire process.
- **error_messages**: Extract any verbatim error messages from the chat. If none, use [].
- **attempted_solutions**: List any specific fixes that were tried but did *not* work. If none, use [].
- **code_snippets**: Extract the most important code blocks. Always include the final, working solution. Use the 'description' field to label them (e.g., "Broken code", "Final working solution").
- **technical_deep_context**: THIS IS THE MOST IMPORTANT FIELD. Be exhaustive. Extract *all* technical details, library names, version numbers, environment details, file names, config settings, and any other context that could help a developer find this solution later.
- **tags**: Generate 5-10 relevant technical tags (e.g., 'react', 'javascript', 'use-effect', 'infinite-loop', 'data-fetching').

Return ONLY the valid JSON object.`;

    console.log("[Gemini] Sending transcript to AI for summarization...");
    console.log("--- START OF TEXT SENT TO GEMINI ---");
    console.log(compact); // Log the actual text being sent
    console.log("--- END OF TEXT SENT TO GEMINI ---");
    console.log("[Gemini] Transcript preview (first 500 chars):", compact.substring(0, 500) + "...");

    try {
        const resp = await model.generateContent({
            contents: [
                { role: "user", parts: [{ text: system }] },
                { role: "user", parts: [{ text: `Transcript:\n\n${compact}` }] },
            ],
            generationConfig: {
                temperature: 0.1, // Low temperature for factual extraction
                maxOutputTokens: 8192, // Max allowed
                responseMimeType: "application/json",
                responseSchema: responseSchema, // Enforce schema
            },
        });

        console.log("[Gemini] Received summary from AI.");
        // It's good practice to log the candidate itself for debugging
        // console.log("[Gemini] Response candidate:", JSON.stringify(resp.response.candidates[0], null, 2));

        // Check finish reason if available
        if (resp.response.candidates && resp.response.candidates[0].finishReason !== 'STOP') {
             console.warn(`[Gemini] AI response finished with reason: ${resp.response.candidates[0].finishReason}. Output might be truncated or incomplete.`);
        }


        // Attempt to parse the text response
        return JSON.parse(resp.response.text());

    } catch (e) {
        console.error("[Gemini] Error during AI generation or parsing:", e);
        // Log the raw response text if parsing fails
        if (e instanceof SyntaxError && resp && resp.response) {
             console.error("[Gemini] Raw AI response text on parse failure:", resp.response.text());
        }
        throw new Error(`AI failed to generate valid JSON or encountered an error: ${e.message}`);
    }
}


// --- API Routes ---
app.get("/healthz", (_req, res) => {
    res.json({ ok: true, model: MODEL, usage });
});

/**
 * Main endpoint: receives URL, scrapes text directly, parses text, summarizes with AI.
 */
app.post("/api/share-solution", async (req, res) => {
    const { url } = req.body || {}; // Get URL from request body
    console.log(`[Server] Received request for URL: ${url}`); // Log incoming request

    try {
        if (!url || typeof url !== 'string' || !url.includes("claude.ai/share/")) {
            console.warn(`[Server] Invalid URL received: ${url}`);
            return res.status(400).json({ ok: false, error: "Missing or invalid 'url'." });
        }

        // // Check cache first
        // const cachedResult = cache.get(url);
        // if (cachedResult) {
        //     console.log(`[Server] Returning cached response for: ${url}`);
        //     return res.json({ ok: true, summary: cachedResult });
        // }

        console.log(`[Server] No cache hit. Processing new request (local scrape): ${url}`);

        // 1. Scrape plain text using local Playwright & page.evaluate()
        const chatText = await fetchClaudeChatText(url);

        // 2. Parse the plain text into messages
        const messages = normalizePairs(chatText);
        // We rely on normalizePairs throwing an error if parsing fails fundamentally

        // 3. Summarize with Gemini AI
        const summaryFromAI = await summarizeWithGemini(messages, parseInt(MAX_TURNS, 10));

        // 4. Construct the final JSON object, adding server-side fields
        const solution_id = url.split("/").pop() || Date.now().toString(); // Use timestamp as fallback ID
        const finalJson = {
            ...summaryFromAI, // Spread the fields returned by the AI
            solution_id: solution_id,
            share_link: url,
            type: "share", // Fixed type as per schema
            created_at: new Date().toISOString(), // Add creation timestamp
        };

        // 5. Cache the final result before sending the response
        //cache.set(url, finalJson);
        console.log(`[Server] Successfully processed and cached (local scrape): ${url}`);

        // 6. Send the successful response
        res.json({ ok: true, summary: finalJson });

    } catch (e) {
        // Log the detailed error on the server
        console.error(`[Server] Error processing ${url}: ${e.stack || e.message}`);
        // Send a generic error message back to the client
        res.status(500).json({ ok: false, error: `Processing failed: ${e.message}` });
    }
});


app.post("/api/find-solution", async (req, res) => {
    // Placeholder for find-solution endpoint
    console.log("[Server] Received request for /api/find-solution");
    res.json({ ok: true, matches: [] });
});


// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Backend listening on :${PORT} (Using Model: ${MODEL})`);
    console.log(`Scraping method: Local Playwright (evaluate)`);
});