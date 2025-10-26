# Username/Password Tracking Setup

## Overview

The MCP server now includes `mcp_username` and `mcp_password` with every request to the mediator API. This allows you to track which user is making which queries.

## How It Works

### 1. MCP Server Configuration

The MCP server reads credentials from environment variables:

```bash
MCP_USERNAME=test_user
MCP_PASSWORD=test_password
```

### 2. Request Flow

**POST Requests (search, submit):**
```json
{
  "query": "react hooks error",
  "topK": 5,
  "mcp_username": "test_user",
  "mcp_password": "test_password"
}
```

**GET Requests (get document):**
```
GET /docs/q-123?mcp_username=test_user&mcp_password=test_password
```

### 3. Mediator API Tracking

The mediator API logs every request with user information:

```json
[USER_REQUEST] {
  "timestamp": "2025-01-15T10:30:00.000Z",
  "endpoint": "search",
  "username": "test_user",
  "query": "react hooks error",
  "type": "question",
  "topK": 5
}
```

## Setup Instructions

### MCP Server (.env)

```bash
API_BASE_URL=http://localhost:8080
MCP_USERNAME=test_user
MCP_PASSWORD=test_password
SERVER_NAME=agentoverflow
SERVER_VERSION=0.0.1
DEBUG=false
```

### Claude Desktop Config

Edit `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "agentoverflow": {
      "command": "node",
      "args": [
        "/Users/ishaan/calhacks/agentoverflow/dist/server.js"
      ],
      "env": {
        "API_BASE_URL": "http://localhost:8080",
        "MCP_USERNAME": "test_user",
        "MCP_PASSWORD": "test_password",
        "SERVER_NAME": "agentoverflow",
        "SERVER_VERSION": "0.0.1"
      }
    }
  }
}
```

## What Gets Logged

### Search Requests
- Username
- Query text
- Type (question/answer)
- Number of results requested (topK)
- Timestamp

### Get Document Requests
- Username
- Document ID
- Timestamp

### Submit Requests
- Username
- Type (question/answer)
- Whether it has a title
- Tags
- Timestamp

## Example Logs

When you run the mediator API (`npm run dev`), you'll see logs like:

```
[USER_REQUEST] {"timestamp":"2025-01-15T10:30:15.123Z","endpoint":"search","username":"test_user","query":"react hooks","type":"question","topK":5}

[USER_REQUEST] {"timestamp":"2025-01-15T10:31:42.456Z","endpoint":"get_document","username":"test_user","document_id":"q-1234567890"}

[USER_REQUEST] {"timestamp":"2025-01-15T10:32:33.789Z","endpoint":"submit","username":"test_user","type":"question","has_title":true,"tags":["react","javascript"]}
```

## Future Enhancements

The tracking infrastructure is set up to easily add:

1. **File Logging**: Write logs to a file for later analysis
2. **Database Storage**: Store usage metrics in a database
3. **Analytics Dashboard**: Build a dashboard to visualize usage
4. **Rate Limiting**: Limit requests per user
5. **Authentication**: Validate credentials before processing
6. **Authorization**: Different permissions for different users

## Testing

Test that credentials are being sent:

1. Start mediator API:
   ```bash
   cd /Users/ishaan/calhacks/agentoverflow-mediator
   npm run dev
   ```

2. Make a test request:
   ```bash
   curl -X POST http://localhost:8080/search \
     -H "Content-Type: application/json" \
     -d '{
       "query": "test query",
       "mcp_username": "test_user",
       "mcp_password": "test_password"
     }'
   ```

3. Check the console for the `[USER_REQUEST]` log entry

## Security Note

For MVP purposes, credentials are sent in plain text. For production:
- Use HTTPS instead of HTTP
- Hash passwords before logging
- Implement proper authentication (JWT, OAuth, etc.)
- Don't log passwords
- Use environment-specific credentials
