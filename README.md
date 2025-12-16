# AgentOverflow

Stack Overflow for AI/agent problems.  
Break the prompt spiral and jump straight to proven fixes.

AgentOverflow captures, validates, and reuses real LLM and agent debugging solutions in a structured JSON format so developers can stop re-solving the same hallucination-driven issues and ship faster.[web:2]

## What is AgentOverflow?

Modern LLM and agent workflows generate tons of valuable debugging history that usually disappears in chat logs. AgentOverflow turns those one-off fixes into a reusable knowledge layer:

- Capture solved LLM/agent issues into a canonical **Share Solution JSON**.
- Validate and enrich them with an AI + human-in-the-loop pipeline.
- Index everything so other developers can **search and reuse** the exact fix.
- Pipe high-signal solutions directly into live LLM sessions via **MCP**.[web:2]

## Core Workflow

### 1. Share Solution JSON

When you solve an AI/agent issue:

- Use the Chrome side panel to trigger **“Share Solution”** on a Claude share or any public page.[web:2]
- The backend scrapes the page and assembles a **Share Solution JSON**: title, problem, context, technical description, code, tags, and more.[web:2]
- The **LAVA** pipeline validates and enforces the schema, then you add a short human summary in the web app for final alignment.[web:2]
- The validated JSON is stored and indexed in Elasticsearch as a reusable solution.[web:2]

### 2. Find Solution

When you are stuck on a new issue:

- Hit **“Find Solution”** in the side panel.[web:2]
- AgentOverflow scrapes your current conversation into a **query JSON**.[web:2]
- A hybrid Elasticsearch search (keyword + vector) runs over validated solutions.[web:2]
- You get ranked, community-verified fixes and can copy:
  - The final working code snippet, or
  - The exact prompt that solved a similar problem before.[web:2]

### 3. MCP: Inject Knowledge into Agents

AgentOverflow also exposes stored solutions through a **Modular Context Protocol (MCP) server**:

- LLMs and agents can pull relevant Share Solution JSONs at runtime.[web:2]
- Only high-signal context is injected: code, logs, configs, prior fixes.[web:2]
- This turns LLMs from stateless responders into context-aware debuggers plugged into a living knowledge base.[web:2]

## Architecture

The system is built as a full pipeline from browser to agents:

- **Chrome Extension (MV3 Side Panel)**  
  Captures the current URL and user actions to trigger Share/Find flows.[web:2]
- **Node.js Backend**  
  Orchestrates scraping, LAVA calls, normalization, and persistence.[web:2]
- **Playwright Scraper**  
  Extracts content from modern web apps (e.g. Claude’s Next.js pages), combining:
  - Inline JSON (`__NEXT_DATA__`)
  - DOM and shadow DOM
  - Code blocks
  - CDP snapshots  
  Falls back to Jina Reader / Readability, with an optional Bright Data proxy for tough pages.[web:2]
- **Normalizer**  
  Canonicalizes URLs, computes `solution_id = sha256(canonical_url)`, de-duplicates mirrored pages, and preserves raw code.[web:2]
- **LAVA (Assembler + Validator)**  
  Fills the solution schema, enforces required keys, and runs a second pass after human edits to keep summaries aligned with the underlying conversation.[web:2]
- **Web App**  
  Lets users review JSON, add human context, and publish solutions to DB + Elasticsearch.[web:2]
- **MCP Server**  
  Streams stored solutions into future LLM sessions for retrieval-augmented debugging.[web:2]

## Share Solution JSON Schema

AgentOverflow centers everything around a portable JSON schema that represents a solved issue:[web:2]

```
{
  "solution_id": "",
  "share_link": "",
  "type": "",
  "title": "",
  "problem": "",
  "context": "",
  "technical_description": "",
  "solution": "",
  "summary": "",
  "error_messages": [],
  "attempted_solutions": [],
  "code_snippets": [],
  "technical_deep_context": "",
  "tags": [],
  "created_at": ""
}
```

This format makes solutions easy to search, analyze, and inject into other tools or agents.[web:2]

## Technical Stack

- **Extension:** Chrome MV3 + Side Panel API[web:2]  
- **Backend:** Node.js, Express, Playwright[web:2]  
- **AI:** LAVA API + Claude Sonnet 3.5 for assembling and validating solution JSONs[web:2]  
- **Search:** Elasticsearch with hybrid vector + keyword retrieval[web:2]  
- **Storage:** DB + LRU cache for hot solutions[web:2]  
- **Scraping:** Playwright, Jina Reader, Readability, optional Bright Data proxy[web:2]

## Challenges & Learnings

- Scraping complex Claude pages (dynamic Next.js, shadow DOM, iframes) required multiple extraction strategies and careful normalization.[web:2]
- Strict schemas and validation are necessary to prevent fabricated fields and preserve raw code, making LLM output actually reusable as knowledge.[web:2]
- Canonical URLs plus hashing provide a single source of truth, and small UX details (side panel, copy button, “open in web app”) massively improve adoption.[web:2]

## Roadmap

Planned next steps for AgentOverflow:

- **Team Repos** – org-scoped libraries of solutions with permissions and ownership.[web:2]
- **Better Ranking** – solve-rate metrics and feedback signals to surface the most effective fixes.[web:2]
- **Deeper Elastic Integration** – richer vectors over code and deep technical context, plus framework-specific synonyms.[web:2]
- **More Input Channels** – ingest Slack, Discord, GitHub issues into the same schema.[web:2]
- **Quality Gates** – automatic spec/API validation before publishing.[web:2]
- **SDK + API** – let any LLM, agent, or tool read and write Share Solution JSONs.[web:2]

## Getting Started

> Note: Fill this section with your actual setup steps once the repo structure is finalized.

Example:

1. Clone the repo:
   ```
   git clone https://github.com/Ishaannarang22/agentoverflow.git
   cd agentoverflow
   ```
2. Install dependencies for extension, backend, and web app.
3. Set environment variables for LAVA, Elasticsearch, and MCP.
4. Run the dev stack (e.g., `docker-compose up` or individual services).

## Contributing

Issues, feature requests, and PRs are welcome.  
If you build a new ingestion path or consumer (e.g., for a different IDE or agent framework), aim to read/write the Share Solution JSON schema so the knowledge layer stays consistent across tools.[web:2]

## License

Add your chosen license here (e.g., MIT, Apache 2.0).
