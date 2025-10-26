import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { LRUCache } from "lru-cache";
import { scrapeClaudeChat } from "./scraper.js";

const {
  LAVA_FORWARD_TOKEN,
  LAVA_BASE_URL = "https://api.lavapayments.com/v1",
  PORT = 3001,
  CORS_ORIGIN = "*",
  RATE_LIMIT_PER_MIN = "10",
} = process.env;

if (!LAVA_FORWARD_TOKEN) {
  console.error("❌ Missing LAVA_FORWARD_TOKEN in .env");
  process.exit(1);
}

const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(cors({ origin: CORS_ORIGIN === "*" ? true : CORS_ORIGIN }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: parseInt(RATE_LIMIT_PER_MIN, 10),
});
app.use(limiter);

// Cache
const cache = new LRUCache({ max: 200, ttl: 15 * 60 * 1000 });

// Usage tracking
const usage = { totalCalls: 0, totalTokens: 0 };

// ============================================================================
// INSTRUCTIONS FOR CLAUDE
// ============================================================================

const shareInstructions = `You are extracting information from a COMPLETED Claude conversation where a problem was successfully solved.

CRITICAL: Follow this EXACT schema structure:

{
  "solution_id": "[Extract UUID from share link - the part after /share/]",
  "share_link": "[The full share URL provided]",
  "type": "share",
  "title": "[Brief descriptive title - e.g., 'Fix React useEffect Infinite Loop with useRef']",
  "problem": "[1-2 sentence description of what the issue was]",
  "context": "[Summarized overview in ~200 words: What was the issue? What wasn't working? What was the current behavior vs expected behavior?]",
  "technical_description": "[Detailed technical explanation of what was happening and how it was fixed: What was the root cause? What are the underlying mechanisms? What's the technical solution? How does the fix work? Include framework-specific details and architectural patterns.]",
  "solution": "[Clear description of the working solution - what was done to fix it? What approach was taken? What was the key insight?]",
  "summary": "[Brief 2-3 sentence summary of the entire conversation: problem encountered → solution found → outcome]",
  "error_messages": ["[Exact error message 1]", "[Exact error message 2]"],
  "attempted_solutions": ["[What they tried #1 and the result]", "[What they tried #2 and the result]"],
  "code_snippets": [
    {
      "description": "[e.g., 'Broken implementation', 'Working solution', 'Final fix']",
      "code": "[The actual code from the conversation]"
    }
  ],
  "technical_deep_context": "[Extract MAXIMUM information from the chat for future similarity matching: Include all technical details, edge cases mentioned, specific version numbers, environment details (OS, browser, Node version, etc.), package versions, configuration settings, file structure context, related technologies in the stack, deployment environment, timing issues, race conditions, performance characteristics, memory usage patterns, network conditions, authentication/authorization context, database schema details if relevant, API endpoint specifics, third-party service integrations, build tool configurations, linting/formatting setup, testing framework details, any async/sync considerations, concurrency patterns, state management approach, data flow architecture, component hierarchy, prop drilling issues, re-render triggers, lifecycle considerations, event handling specifics, CSS/styling approach if relevant, responsive design considerations, accessibility concerns mentioned, browser compatibility issues, polyfill requirements, bundler configuration, code splitting strategy, lazy loading patterns, caching strategies, API rate limiting, error boundaries, fallback UI, loading states, error handling patterns, validation logic, form handling approach, routing configuration, middleware setup, security considerations, CORS settings, cookie/session handling, WebSocket usage, real-time update patterns, optimization techniques tried, profiling results, debugging steps taken, console output details, network tab observations, React DevTools insights, Redux DevTools data if applicable, and any other contextual information that could help match similar problems in the future. Include conversational context like 'user mentioned they are a beginner' or 'user is working on a production app with 10k users' or 'tight deadline' or 'refactoring legacy code'. The more context, the better the matching.]",
  "tags": ["[technology]", "[framework]", "[concept]", "[error-type]"],
  "created_at": "[Current ISO 8601 timestamp]"
}

IMPORTANT:
- Extract 2-5 code_snippets with actual code from the conversation
- Make technical_deep_context EXTREMELY detailed - include EVERYTHING
- Use current timestamp for created_at
- Extract exact error messages verbatim
- Return ONLY valid JSON, no markdown formatting`;

const findInstructions = `You are extracting information from an INCOMPLETE Claude conversation where someone is seeking help with an unsolved problem.

CRITICAL: Follow this EXACT schema structure:

{
  "solution_id": "[Extract UUID from share link - the part after /share/]",
  "share_link": "[The full share URL provided]",
  "type": "find",
  "title": "[Brief descriptive title of the problem - e.g., 'React useEffect Causing Infinite Renders']",
  "problem": "[1-2 sentence description of the core issue they're facing]",
  "context": "[Summarized overview in ~200 words: What is the issue? What's not working? What's the current behavior vs expected behavior? What are they trying to accomplish?]",
  "technical_description": "[Detailed technical explanation of what's happening: What seems to be the root cause based on current understanding? What are the symptoms? What's the technical nature of the problem? Include any hypotheses about what might be wrong.]",
  "solution": null,
  "summary": "[Brief 2-3 sentence summary of the problem: what they're trying to do → what's going wrong → current status]",
  "error_messages": ["[Exact error message 1]", "[Exact error message 2]"],
  "attempted_solutions": ["[What they tried #1 and the result]", "[What they tried #2 and the result]"],
  "code_snippets": [
    {
      "description": "[e.g., 'Current broken implementation', 'First attempted fix that failed']",
      "code": "[The actual code from the conversation]"
    }
  ],
  "technical_deep_context": "[Extract MAXIMUM information from the chat for future similarity matching: Include all technical details, edge cases mentioned, specific version numbers, environment details (OS, browser, Node version, etc.), package versions, configuration settings, file structure context, related technologies in the stack, deployment environment, timing issues, race conditions, performance characteristics, memory usage patterns, network conditions, authentication/authorization context, database schema details if relevant, API endpoint specifics, third-party service integrations, build tool configurations, linting/formatting setup, testing framework details, any async/sync considerations, concurrency patterns, state management approach, data flow architecture, component hierarchy, prop drilling issues, re-render triggers, lifecycle considerations, event handling specifics, CSS/styling approach if relevant, responsive design considerations, accessibility concerns mentioned, browser compatibility issues, polyfill requirements, bundler configuration, code splitting strategy, lazy loading patterns, caching strategies, API rate limiting, error boundaries, fallback UI, loading states, error handling patterns, validation logic, form handling approach, routing configuration, middleware setup, security considerations, CORS settings, cookie/sessions handling, WebSocket usage, real-time update patterns, optimization techniques tried, profiling results, debugging steps taken, console output details, network tab observations, React DevTools insights, Redux DevTools data if applicable, and any other contextual information that could help match similar problems in the future. Include conversational context like 'user mentioned they are a beginner' or 'user is working on a production app with 10k users' or 'tight deadline' or 'refactoring legacy code'. The more context, the better the matching.]",
  "tags": ["[technology]", "[framework]", "[concept]", "[error-type]"],
  "created_at": "[Current ISO 8601 timestamp]"
}

IMPORTANT:
- solution must ALWAYS be null for find type
- Extract 2-5 code_snippets showing broken/attempted code
- Make technical_deep_context EXTREMELY detailed - include EVERYTHING
- Use current timestamp for created_at
- Extract exact error messages verbatim
- Return ONLY valid JSON, no markdown formatting`;

// ============================================================================
// LAVA API CALL - USING CLAUDE
// ============================================================================

async function callLavaAPI(conversationText, actionType, shareUrl) {
  const instructions = actionType === "share" ? shareInstructions : findInstructions;
  
  // Add clarification based on action type
  const systemContext = actionType === "share" 
    ? "This conversation contains a COMPLETED problem that was SOLVED. Extract the solution details."
    : "This conversation is about someone SEEKING HELP with an UNSOLVED problem. The solution field must be null.";
  
  // Extract solution_id from URL
  const urlMatch = shareUrl.match(/\/share\/([a-f0-9-]+)/);
  const solutionId = urlMatch ? urlMatch[1] : "";

  const response = await fetch(
    `${LAVA_BASE_URL}/forward?u=https://api.anthropic.com/v1/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${LAVA_FORWARD_TOKEN}`,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 4000,
        temperature: 0.1,
        messages: [
          {
            role: "user",
            content: `${systemContext}

${instructions}

REQUIRED FIELDS (must include exactly as specified):
- solution_id: "${solutionId}"
- share_link: "${shareUrl}"
- type: "${actionType}"

Claude Conversation to analyze:
${conversationText}

Extract the information following the EXACT schema above. Return ONLY valid JSON with no markdown formatting.`
          }
        ]
      })
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Lava API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  
  // Track usage
  if (data.usage) {
    usage.totalTokens += (data.usage.input_tokens || 0) + (data.usage.output_tokens || 0);
  }

  // Parse Claude's response
  const textContent = data.content[0].text;
  
  // Extract JSON from response (Claude might wrap it in markdown)
  let jsonText = textContent;
  const jsonMatch = textContent.match(/```json\n([\s\S]*?)\n```/);
  if (jsonMatch) {
    jsonText = jsonMatch[1];
  } else if (textContent.includes('```')) {
    jsonText = textContent.replace(/```\n?/g, '').trim();
  }
  
  const result = JSON.parse(jsonText);
  
  return result;
}

// ============================================================================
// ROUTES
// ============================================================================

app.get("/healthz", (_req, res) => {
  res.json({ 
    ok: true, 
    service: "AgentOverflow",
    provider: "Lava + Claude Sonnet 3.5",
    usage 
  });
});

app.post("/api/process-conversation", async (req, res) => {
  try {
    const { url, action } = req.body || {};

    // Validation
    if (!url || typeof url !== "string") {
      return res.status(400).json({ 
        ok: false, 
        error: "Missing 'url' (Claude share link)" 
      });
    }

    if (!action || !["share", "find"].includes(action)) {
      return res.status(400).json({ 
        ok: false, 
        error: "Missing or invalid 'action' (must be 'share' or 'find')" 
      });
    }

    // Check cache
    const cacheKey = `${url}-${action}`;
    if (cache.has(cacheKey)) {
      console.log("✓ Returning cached result");
      return res.json({ ok: true, result: cache.get(cacheKey), cached: true });
    }

    console.log(`\n${"=".repeat(80)}`);
    console.log(`Processing: ${action.toUpperCase()}`);
    console.log(`URL: ${url}`);
    console.log("=".repeat(80));

    // Scrape conversation
    console.log("\n1️⃣ Scraping conversation...");
    const conversationText = await scrapeClaudeChat(url);
    
    if (!conversationText || conversationText.length < 100) {
      return res.status(400).json({ 
        ok: false, 
        error: "Failed to extract conversation or conversation too short" 
      });
    }

    console.log(`✓ Scraped ${conversationText.length} characters`);

    // Process with Lava + Claude
    console.log(`\n2️⃣ Processing with Lava + Claude (${action} mode)...`);
    const result = await callLavaAPI(conversationText, action, url);
    
    console.log("✓ Successfully extracted structured data");
    console.log(`   - Title: ${result.title}`);
    console.log(`   - Tags: ${result.tags?.join(", ")}`);
    console.log(`   - Code snippets: ${result.code_snippets?.length || 0}`);

    // Cache result
    cache.set(cacheKey, result);

    // Update usage
    usage.totalCalls += 1;

    console.log("\n✅ Processing complete!\n");

    res.json({ 
      ok: true, 
      result,
      cached: false,
      metadata: {
        action,
        conversationLength: conversationText.length,
        cacheKey
      }
    });

  } catch (error) {
    console.error("\n❌ Error:", error.message);
    res.status(500).json({ 
      ok: false, 
      error: error.message || "Failed to process conversation" 
    });
  }
});

// ============================================================================
// START SERVER
// ============================================================================

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════════════╗
║              AgentOverflow Backend - Lava Edition                 ║
║                                                                   ║
║  Status: ✅ Running on http://localhost:${PORT.toString().padEnd(28)}║
║  Provider: Lava + Claude Sonnet 3.5                              ║
║                                                                   ║
║  Endpoints:                                                       ║
║  • GET  /healthz                     - Health check              ║
║  • POST /api/process-conversation    - Process Claude chat       ║
║                                                                   ║
║  Usage:                                                           ║
║  POST /api/process-conversation                                  ║
║  {                                                                ║
║    "url": "https://claude.ai/share/xxx",                         ║
║    "action": "share" | "find"                                    ║
║  }                                                                ║
║                                                                   ║
║  • action: "share" → Solution extraction (completed chat)        ║
║  • action: "find"  → Problem extraction (seeking help)           ║
╚═══════════════════════════════════════════════════════════════════╝
  `);
});