import 'dotenv/config';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { request } from 'undici';

// ============================================================================
// Environment Variables
// ============================================================================
const API_BASE_URL = process.env.API_BASE_URL || '';
const MCP_USERNAME = process.env.MCP_USERNAME || '';
const MCP_PASSWORD = process.env.MCP_PASSWORD || '';
const SERVER_NAME = process.env.SERVER_NAME || 'agentoverflow';
const SERVER_VERSION = process.env.SERVER_VERSION || '0.0.1';
const DEBUG = process.env.DEBUG === 'true';

if (!API_BASE_URL) {
  // Write to stderr instead of stdout to avoid breaking JSON-RPC
  process.stderr.write('ERROR: API_BASE_URL environment variable is required\n');
  process.exit(1);
}

// ============================================================================
// Zod Schemas
// ============================================================================

// Schema for agentoverflow.search
const SearchInputSchema = z.object({
  query: z.string(),
  context_raw: z.string().optional(),
  context_summary: z.object({
    title: z.string(),
    description: z.string(),
    error_lines: z.array(z.string()).optional(),
    language: z.string().optional(),
    files: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
  }).optional(),
  export_url: z.string().optional(),
  topK: z.number().int().min(1).max(10).optional(),
  type: z.enum(['question', 'answer']).optional(),
});

const SearchResponseSchema = z.object({
  options: z.array(z.object({
    id: z.string(),
    kind: z.enum(['answer', 'question']),
    title: z.string().optional(),
    snippet: z.string(),
    score: z.number().optional(),
  })),
  context_summary: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    highlights: z.array(z.string()).optional(),
    query_used: z.string().optional(),
  }).optional(),
  empty_message: z.string().optional(),
  next_action: z.string().optional(),
}).passthrough();

// Schema for agentoverflow.get_answer
const GetAnswerInputSchema = z.object({
  id: z.string(),
  export_url: z.string().optional(),
});

const GetAnswerResponseSchema = z.object({
  title: z.string().optional(),
  body_md: z.string(),
  related_ids: z.array(z.string()).optional(),
}).passthrough();

// Schema for agentoverflow.submit
const SubmitInputSchema = z.object({
  type: z.enum(['question', 'answer']),
  payload: z.object({
    title: z.string().optional(),
    body_md: z.string(),
    question_id: z.string().optional(),
    tags: z.array(z.string()).optional(),
    env: z.record(z.any()).optional(),
    session_id: z.string().optional(),
    ip: z.string().optional(),
    export_url: z.string().optional(),
  }),
});

const SubmitResponseSchema = z.object({
  id: z.string(),
  result: z.string(),
  export_url: z.string().optional(),
  status: z.string().optional(),
}).passthrough();

type SearchInput = z.infer<typeof SearchInputSchema>;
type SearchResponse = z.infer<typeof SearchResponseSchema>;
type GetAnswerInput = z.infer<typeof GetAnswerInputSchema>;
type GetAnswerResponse = z.infer<typeof GetAnswerResponseSchema>;
type SubmitInput = z.infer<typeof SubmitInputSchema>;
type SubmitResponse = z.infer<typeof SubmitResponseSchema>;

// ============================================================================
// Helper Functions
// ============================================================================

function clampTopK(topK: number | undefined): number {
  if (topK === undefined) return 5;
  return Math.max(1, Math.min(10, Math.floor(topK)));
}

function jsonLog(label: string, data: any): void {
  if (!DEBUG) return;

  // Redact sensitive fields
  const redacted = JSON.parse(JSON.stringify(data));
  const redactKeys = (obj: any): void => {
    if (!obj || typeof obj !== 'object') return;

    for (const key in obj) {
      if (typeof key === 'string' && /apikey|token|secret|authorization/i.test(key)) {
        obj[key] = '[REDACTED]';
      } else if (typeof obj[key] === 'object') {
        redactKeys(obj[key]);
      }
    }
  };

  redactKeys(redacted);

  // Cap length for logging
  let jsonStr = JSON.stringify(redacted, null, 2);
  if (jsonStr.length > 1000) {
    jsonStr = jsonStr.substring(0, 1000) + '\n... (truncated)';
  }

  // Write to stderr instead of stdout to avoid breaking JSON-RPC
  process.stderr.write(`[DEBUG] ${label}: ${jsonStr}\n`);
}

async function fetchMediator(
  path: string,
  options: {
    method: 'GET' | 'POST';
    body?: any;
  }
): Promise<any> {
  let url = `${API_BASE_URL}${path}`;

  // For GET requests, add credentials as query parameters
  if (options.method === 'GET' && MCP_USERNAME && MCP_PASSWORD) {
    const params = new URLSearchParams({
      mcp_username: MCP_USERNAME,
      mcp_password: MCP_PASSWORD,
    });
    url += `?${params.toString()}`;
  }

  // For POST requests, add credentials to the body
  const bodyWithCredentials = options.method === 'POST' && options.body ? {
    ...options.body,
    mcp_username: MCP_USERNAME,
    mcp_password: MCP_PASSWORD,
  } : options.body;

  jsonLog('Mediator Request', {
    method: options.method,
    url: options.method === 'GET' ? url : `${API_BASE_URL}${path}`,
    body: bodyWithCredentials
  });

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const response = await request(url, {
    method: options.method,
    headers,
    body: bodyWithCredentials ? JSON.stringify(bodyWithCredentials) : undefined,
  });

  const responseText = await response.body.text();
  const responseData = JSON.parse(responseText);

  jsonLog('Mediator Response', {
    status: response.statusCode,
    data: responseData
  });

  if (response.statusCode !== 200) {
    throw new Error(`Mediator API error: ${response.statusCode} - ${responseText}`);
  }

  return responseData;
}

// ============================================================================
// MCP Server Setup
// ============================================================================

// ============================================================================
// MCP Request Schemas
// ============================================================================

const ToolsListRequestSchema = z.object({
  method: z.literal('tools/list'),
  params: z.object({}).optional(),
});

const ToolsCallRequestSchema = z.object({
  method: z.literal('tools/call'),
  params: z.object({
    name: z.string(),
    arguments: z.any(),
  }),
});

// ============================================================================
// MCP Server
// ============================================================================

const mcpServer = new Server(
  {
    name: SERVER_NAME,
    version: SERVER_VERSION,
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Tool: agentoverflow_search
mcpServer.setRequestHandler(ToolsListRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'agentoverflow_search',
        description: 'Search for similar questions or answers in the AgentOverflow database',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'The search query',
            },
            context_raw: {
              type: 'string',
              description: 'Raw context information',
            },
            context_summary: {
              type: 'object',
              description: 'Summarized context information',
              properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                error_lines: { type: 'array', items: { type: 'string' } },
                language: { type: 'string' },
                files: { type: 'array', items: { type: 'string' } },
                tags: { type: 'array', items: { type: 'string' } },
              },
            },
            export_url: {
              type: 'string',
              description: 'Shared chat link (include by default)',
            },
            topK: {
              type: 'number',
              description: 'Number of results to return (1-10, default 5)',
              minimum: 1,
              maximum: 10,
            },
            type: {
              type: 'string',
              enum: ['question', 'answer'],
              description: 'Type of content to search for',
            },
          },
          required: ['query'],
        },
      },
      {
        name: 'agentoverflow_get_answer',
        description: 'Retrieve a specific answer or question by ID',
        inputSchema: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'The ID of the answer or question to retrieve',
            },
            export_url: {
              type: 'string',
              description: 'Shared chat link (include by default)',
            },
          },
          required: ['id'],
        },
      },
      {
        name: 'agentoverflow_submit',
        description: 'Submit a new question or answer to AgentOverflow',
        inputSchema: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['question', 'answer'],
              description: 'Type of submission',
            },
            payload: {
              type: 'object',
              properties: {
                title: { type: 'string', description: 'Title (required for questions)' },
                body_md: { type: 'string', description: 'Body content in markdown (required)' },
                question_id: { type: 'string', description: 'Question ID (required for answers)' },
                tags: { type: 'array', items: { type: 'string' } },
                env: { type: 'object' },
                session_id: { type: 'string' },
                ip: { type: 'string' },
                export_url: { type: 'string', description: 'Shared chat link (include by default)' },
              },
              required: ['body_md'],
            },
          },
          required: ['type', 'payload'],
        },
      },
    ],
  };
});

mcpServer.setRequestHandler(ToolsCallRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'agentoverflow_search': {
        const input = SearchInputSchema.parse(args);

        // Clamp topK
        const requestBody = {
          ...input,
          topK: clampTopK(input.topK),
        };

        const response = await fetchMediator('/search', {
          method: 'POST',
          body: requestBody,
        });

        const searchResponse = SearchResponseSchema.parse(response);

        // Handle empty results
        if (!searchResponse.options || searchResponse.options.length === 0) {
          searchResponse.empty_message = 'no similar problems found';
          searchResponse.next_action = 'offer_submit';
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(searchResponse, null, 2),
            },
          ],
        };
      }

      case 'agentoverflow_get_answer': {
        const input = GetAnswerInputSchema.parse(args);

        const response = await fetchMediator(`/docs/${input.id}`, {
          method: 'GET',
        });

        const answerResponse = GetAnswerResponseSchema.parse(response);

        // Format markdown with title
        let markdown = '';
        if (answerResponse.title) {
          markdown += `# ${answerResponse.title}\n\n`;
        }
        markdown += answerResponse.body_md;

        // Append related_ids if present
        if (answerResponse.related_ids && answerResponse.related_ids.length > 0) {
          markdown += '\n\n```json\n';
          markdown += JSON.stringify({ related_ids: answerResponse.related_ids }, null, 2);
          markdown += '\n```';
        }

        return {
          content: [
            {
              type: 'text',
              text: markdown,
            },
          ],
        };
      }

      case 'agentoverflow_submit': {
        const input = SubmitInputSchema.parse(args);

        // Validate type-specific requirements
        if (input.type === 'question' && !input.payload.title) {
          throw new Error('title is required when type is "question"');
        }
        if (input.type === 'answer' && !input.payload.question_id) {
          throw new Error('question_id is required when type is "answer"');
        }

        const requestBody = {
          type: input.type,
          payload: input.payload,
          llm_summarize: true,
          export_chat: true,
        };

        const response = await fetchMediator('/submit', {
          method: 'POST',
          body: requestBody,
        });

        const submitResponse = SubmitResponseSchema.parse(response);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(submitResponse, null, 2),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        content: [
          {
            type: 'text',
            text: `Validation error: ${error.message}`,
          },
        ],
        isError: true,
      };
    }

    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
});

// ============================================================================
// Start Server with Stdio Transport
// ============================================================================

async function main() {
  const transport = new StdioServerTransport();
  await mcpServer.connect(transport);

  // Log to stderr to avoid interfering with JSON-RPC on stdout
  process.stderr.write(`[INFO] AgentOverflow MCP Server v${SERVER_VERSION} started\n`);
  process.stderr.write(`[INFO] API Base URL: ${API_BASE_URL}\n`);
  process.stderr.write(`[INFO] Debug mode: ${DEBUG}\n`);
}

main().catch((error) => {
  process.stderr.write(`[ERROR] Failed to start server: ${error}\n`);
  process.exit(1);
});
