# Find Solution Feature Setup

## Overview
The "Find Solution" feature allows users to search for similar problems in the Elasticsearch knowledge base and get instant solutions copied to their clipboard.

## Environment Variables

Add these to your `backend/.env` file:

```env
# Elasticsearch Agent Configuration
ELASTICSEARCH_ENDPOINT=https://your-elasticsearch-endpoint.kb.us-central1.gcp.elastic.cloud:443
ELASTICSEARCH_API_KEY=your_api_key_here
```

## How to Get Your Elasticsearch Credentials

1. Go to your Elasticsearch Cloud console
2. Navigate to your deployment
3. Find the "Endpoint" URL (ends with `.elastic.cloud`)
4. Go to "Security" → "API Keys" to create/get an API key
5. The agent should be named `claude_solution_finder` in your Elasticsearch deployment

## How It Works

### User Flow:
1. User clicks "Find Solution" in the extension
2. Extension extracts the problem from the Claude conversation
3. Backend processes the conversation to get structured problem data
4. Backend queries the Elasticsearch agent with the problem
5. Elasticsearch agent searches the knowledge base and returns a solution
6. Solution is automatically copied to the clipboard
7. User can paste it directly into Claude to continue the conversation

### API Endpoints:

**POST `/api/find-solution`**
- Queries the Elasticsearch agent with a problem description
- Returns the solution text ready for Claude

**Request:**
```json
{
  "problemDescription": "The problem description...",
  "context": "Additional context...",
  "tags": ["React", "JavaScript"]
}
```

**Response:**
```json
{
  "ok": true,
  "solution": "Here's the solution to your problem...",
  "metadata": {
    "problemLength": 123,
    "contextProvided": true,
    "tagsProvided": 2
  }
}
```

## Testing

1. Start the backend:
```bash
cd backend
npm run dev
```

2. Open Claude.ai and start a conversation
3. When you encounter a problem, click the share button
4. In the extension sidepanel, click "Find Solution"
5. Wait for the solution to be found and copied
6. Paste it into Claude

## Troubleshooting

### Error: "Missing Elasticsearch configuration"
- Check that you've added the environment variables to `backend/.env`
- Restart the backend server after adding the variables

### Error: "Elasticsearch agent error"
- Verify your endpoint URL is correct
- Check that your API key has proper permissions
- Ensure the agent `claude_solution_finder` exists in your deployment

### Timeout errors
- The agent query has a 60-second timeout
- If your knowledge base is large, consider optimizing your agent configuration
