# AgentOverflow

**Stack Overflow for the AI era** — capture validated problem–solution pairs from AI debugging sessions, index them in Elasticsearch, and feed them back into future LLM sessions so nobody has to re-solve the same bug twice.

🏆 Winner of **Best Use of Elastic Agents** at **CalHacks 12.0**.

## The Problem

Every day, developers solve real bugs inside AI chat sessions — and then the fix disappears into an unsearchable conversation log. The next person (or the next LLM session) starts from zero, burning tokens and time rediscovering the same solution.

AgentOverflow turns those one-off debugging sessions into a durable, searchable knowledge base:

1. **Capture** — share a solved Claude conversation from a Chrome extension side panel.
2. **Extract** — the backend scrapes the share link and uses Claude to distill it into a structured solution JSON (problem, root cause, code snippets, error messages, attempted fixes, deep technical context, tags).
3. **Validate** — the author adds human context, and a second LLM pass merges it into a final, polished post.
4. **Index** — the post is stored in Elasticsearch, searchable by the community through a React web app.
5. **Retrieve** — when you're stuck, "Find Solution" queries an Elastic Agent over the knowledge base and copies a ready-to-paste solution to your clipboard. An MCP server (on the [`mcp`](../../tree/mcp) branch) exposes the same knowledge base directly to LLMs and agents.

## How It Works

```
┌──────────────────┐   share link    ┌─────────────────────────┐
│ Chrome Extension │ ──────────────► │ Pipeline Server (:3001) │
│  (side panel on  │                 │  Playwright scraper     │
│   claude.ai)     │ ◄────────────── │  Claude via Lava API    │
└──────────────────┘  solution JSON  └───────────┬─────────────┘
                                                 │ finalized post
        ┌──────────────────┐                     ▼
        │ React Web App    │  /api   ┌─────────────────────────┐
        │  (:8080)         │ ──────► │ API Server (:3002)      │
        │  browse/search/  │         │  posts, search, auth    │
        │  submit posts    │         └───────────┬─────────────┘
        └──────────────────┘                     │
                                                 ▼
┌──────────────────┐   MCP (stdio)   ┌─────────────────────────┐
│ LLMs / Agents    │ ──────────────► │ Elasticsearch +         │
│  (mcp branch)    │                 │ Elastic Agent Builder   │
└──────────────────┘                 └─────────────────────────┘
```

### Components

- **Chrome extension** (`extension/`) — Manifest V3 side panel that runs on `claude.ai`. Two actions:
  - **Share Solution**: sends the current conversation's share link to the backend for extraction, then hands off to the web app for human review and publishing.
  - **Find Solution**: extracts your current problem and queries the knowledge base; the answer is copied to your clipboard so you can paste it straight back into the conversation.
- **Pipeline server** (`backend/server.js`, port 3001) — Express server that:
  - Scrapes Claude share pages with headless **Playwright** (with anti-bot-detection measures and Cloudflare handling).
  - Calls **Claude 3.5 Sonnet** through the **Lava API** forwarding proxy to extract a strict solution schema from the raw conversation, in either `share` (solved) or `find` (unsolved) mode.
  - Runs a second finalization pass that merges the extracted JSON with the author's human context into the final post.
  - Answers `POST /api/find-solution` by conversing with an **Elastic Agent Builder** agent (`claude_solution_finder`) over the indexed knowledge base.
  - Includes an LRU cache for repeated scrapes, rate limiting, and usage tracking.
- **API server** (`backend/src/server.js`, port 3002) — Express REST API backed by **Elasticsearch** (`@elastic/elasticsearch`):
  - `/api/search` — multi-field search with boosted relevance (`title^3`, `problem^2`, `solution^2`, ...), tag/category filters, trending.
  - `/api/posts` — create, update, like, and comment on posts (indices: `posts_ai`, `user_post_map`, `post_edges`).
  - `/api/auth` — JWT-based register/login with bcrypt.
  - Hardened with Helmet, CORS, compression, and rate limiting.
- **Web app** (`frontend/`) — React + TypeScript + Vite, styled with Tailwind CSS and shadcn/ui (Radix primitives), with TanStack Query for data fetching. Pages for browsing, searching, trending, tags, leaderboard, post detail, and submitting posts.
- **MCP server** (`mcp` branch) — a TypeScript **Model Context Protocol** server (`@modelcontextprotocol/sdk`, stdio transport) that lets any MCP-capable LLM or agent read from and write to the knowledge base.

## The Solution Schema

Everything revolves around a portable JSON schema for a solved (or open) problem:

```json
{
  "solution_id": "...",
  "share_link": "https://claude.ai/share/...",
  "type": "share | find",
  "title": "Fix React useEffect Infinite Loop with useRef",
  "problem": "...",
  "context": "...",
  "technical_description": "...",
  "solution": "...",
  "summary": "...",
  "error_messages": ["..."],
  "attempted_solutions": ["..."],
  "code_snippets": [{ "description": "...", "code": "..." }],
  "technical_deep_context": "...",
  "tags": ["react", "hooks"],
  "created_at": "ISO 8601"
}
```

The `technical_deep_context` field is deliberately exhaustive (versions, environment, stack, debugging steps taken) — it exists purely to improve future similarity matching.

## Tech Stack

| Layer | Technology |
|---|---|
| Extension | Chrome Manifest V3, Side Panel API |
| Pipeline | Node.js, Express, Playwright, Lava API → Claude 3.5 Sonnet |
| Search | Elasticsearch (Elastic Cloud), Elastic Agent Builder |
| API | Express, JWT + bcrypt, Helmet, express-rate-limit, LRU cache |
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui (Radix), TanStack Query |
| MCP | TypeScript, `@modelcontextprotocol/sdk`, Zod, undici (on the `mcp` branch) |

## Getting Started

### Prerequisites

- Node.js >= 18
- An [Elastic Cloud](https://cloud.elastic.co/) deployment with an API key
- A [Lava](https://www.lavapayments.com/) forward token (used to proxy Anthropic API calls)

### 1. Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
# Pipeline server (server.js, port 3001)
LAVA_FORWARD_TOKEN=your_lava_token
ELASTICSEARCH_ENDPOINT=https://your-deployment.kb.us-central1.gcp.elastic.cloud:443
ELASTICSEARCH_API_KEY=your_kibana_api_key

# API server (src/server.js, port 3002)
ELASTIC_NODE=https://your-deployment.es.us-central1.gcp.elastic.cloud:443
ELASTIC_API_KEY=your_elasticsearch_api_key
API_PORT=3002
FRONTEND_URL=http://localhost:8080
```

Create the Elasticsearch indices, then start both servers:

```bash
node src/setup-indices.js   # creates posts_ai, user_post_map, post_edges
npm run dev:all             # pipeline server (3001) + API server (3002)
```

For "Find Solution" to work, your Elastic deployment needs an Agent Builder agent named `claude_solution_finder` (see `FIND_SOLUTION_SETUP.md`).

### 2. Frontend

```bash
cd frontend
npm install
npm run dev   # http://localhost:8080, proxies /api to :3002
```

### 3. Chrome Extension

1. Open `chrome://extensions`, enable **Developer mode**.
2. Click **Load unpacked** and select the `extension/` folder.
3. Open a conversation on `claude.ai`, open the side panel, and use **Share Solution** / **Find Solution**.

### Docker

The `DOCKER` file builds the pipeline server on the official Playwright image:

```bash
docker build -f DOCKER -t agentoverflow-backend ./backend
```

## MCP Server

The `mcp` branch contains a standalone MCP server that exposes the knowledge base to any MCP-capable client (Claude Desktop, agents, IDEs). It runs over stdio and forwards requests to the AgentOverflow mediator API, validating everything with Zod.

Tools:

- `agentoverflow_search` — search for similar questions/answers, with optional structured context (error lines, language, files, tags) and `topK`.
- `agentoverflow_get_answer` — fetch a full answer body in Markdown by ID.
- `agentoverflow_submit` — write a new question or answer back into the knowledge base.

```bash
git checkout mcp
npm install
API_BASE_URL=https://your-mediator-api npm run dev
```

This closes the loop: solutions captured from past AI debugging sessions get injected directly into future LLM contexts, so agents can cite proven fixes instead of guessing.

## Repository Layout

```
backend/            Express servers (pipeline + API), Playwright scraper, index setup
frontend/           React + Vite web app
extension/          Chrome MV3 side panel extension
supabase-schema.sql Relational schema (profiles, posts, comments, likes) for a Postgres/Supabase variant
FIND_SOLUTION_SETUP.md  Elastic agent setup guide for the Find Solution flow
DOCKER              Dockerfile for the pipeline server
```

Branches: `main` (app + pipeline), `mcp` (MCP server), plus feature branches for the extension and frontend.

## License

MIT
