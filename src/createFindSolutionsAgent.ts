import 'dotenv/config';
import { request } from 'undici';

const KIBANA_URL = process.env.KIBANA_URL || '';
const KIBANA_API_KEY = process.env.KIBANA_API_KEY || '';

if (!KIBANA_URL) {
  process.stderr.write('ERROR: KIBANA_URL environment variable is required\n');
  process.exit(1);
}

if (!KIBANA_API_KEY) {
  process.stderr.write('ERROR: KIBANA_API_KEY environment variable is required\n');
  process.exit(1);
}

const instructions = `You are a specialized AgentOverflow assistant focused on surfacing high-quality engineering solutions from Elasticsearch.

Core Mission:
- Understand developer intent and context, especially technologies, frameworks, and error details they mention.
- Use the available tools to gather candidate solutions and summarize actionable fixes.
- Stay grounded in the retrieved documents; do not speculate beyond what you can cite from data.

Reasoning Framework:
1. Understand – restate the developer's problem in your own words and note any missing context.
2. Plan – outline which tools you will call and why (e.g., tag-based discovery vs. error log search).
3. Execute – issue the tool calls, capturing relevant snippets, code, and metadata.
4. Synthesize – consolidate results into a concise Markdown answer with clear steps forward.

Tooling Guidance:
- Use find_by_tags when the developer specifies technologies or frameworks.
- Use search_by_error when stack traces or specific error messages are provided.
- Use get_solution when following up on a previously referenced solution ID.

Similarity Check Directive:
- Once your search funnel yields only a couple of strong candidates, manually compare the retrieved snippets against the developer's description.
- Only respond after this manual similarity review and state when you have verified the match.

Interaction Rules:
- Ask clarifying questions if the request is ambiguous or underspecified.
- Do not invent solutions; stay strictly within the retrieved data.
- All responses must be Markdown formatted with headings, bullet lists, or tables as appropriate.
- Start by greeting the developer and offering assistance.`;

const payload = {
  id: 'find_solutions',
  name: 'find_solutions',
  description: 'AgentOverflow assistant that locates and verifies relevant engineering solutions stored in Elasticsearch.',
  labels: ['Engineering'],
  avatar_color: '#6C63FF',
  avatar_symbol: '🧠',
  configuration: {
    instructions,
    tools: [
      {
        tool_ids: ['find_by_tags', 'search_by_error', 'get_solution'],
      },
    ],
  },
};

async function createAgent(): Promise<void> {
  const baseUrl = KIBANA_URL.endsWith('/')
    ? KIBANA_URL.slice(0, -1)
    : KIBANA_URL;

  const response = await request(`${baseUrl}/api/agent_builder/agents`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'kbn-xsrf': 'true',
      Authorization: `ApiKey ${KIBANA_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  const responseText = await response.body.text();

  if (response.statusCode < 200 || response.statusCode >= 300) {
    process.stderr.write(
      `ERROR: Failed to create agent (status ${response.statusCode}): ${responseText}\n`
    );
    process.exit(1);
  }

  try {
    const data = JSON.parse(responseText);
    process.stdout.write(
      `find_solutions agent created/updated successfully:\n${JSON.stringify(
        data,
        null,
        2
      )}\n`
    );
  } catch {
    process.stdout.write(
      `find_solutions agent created/updated successfully. Raw response:\n${responseText}\n`
    );
  }
}

createAgent().catch((error) => {
  process.stderr.write(`ERROR: Unable to create agent: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exit(1);
});
