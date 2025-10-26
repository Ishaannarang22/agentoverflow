#!/bin/bash

# AgentOverflow MCP Server Test Script
# This script sends test requests to the MCP server using curl

MCP_ENDPOINT="http://localhost:3000/mcp"
TEST_DIR="test"

echo "====================================="
echo "AgentOverflow MCP Server Tests"
echo "====================================="
echo ""

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to run a test
run_test() {
    local test_name=$1
    local json_file=$2

    echo -e "${BLUE}Testing: ${test_name}${NC}"
    echo "Request file: ${json_file}"
    echo "---"

    if [ ! -f "${json_file}" ]; then
        echo -e "${RED}ERROR: Test file not found: ${json_file}${NC}"
        echo ""
        return 1
    fi

    # Send request and capture response
    response=$(curl -s -X POST "${MCP_ENDPOINT}" \
        -H "Content-Type: application/json" \
        -H "Accept: application/json, text/event-stream" \
        -d @"${json_file}")

    # Check if request was successful
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Response:${NC}"
        echo "${response}" | jq '.' 2>/dev/null || echo "${response}"
        echo ""
        return 0
    else
        echo -e "${RED}ERROR: Request failed${NC}"
        echo ""
        return 1
    fi
}

# Check if server is running
echo "Checking if MCP server is running..."
health_check=$(curl -s http://localhost:3000/healthz)
if [ $? -ne 0 ]; then
    echo -e "${RED}ERROR: MCP server is not running at http://localhost:3000${NC}"
    echo "Please start the server with: npm run dev"
    exit 1
fi
echo -e "${GREEN}Server is running!${NC}"
echo ""

# Run all tests
echo "====================================="
echo "Running Tests..."
echo "====================================="
echo ""

run_test "Search for Questions" "${TEST_DIR}/search-request.json"
run_test "Get Answer by ID" "${TEST_DIR}/get-answer-request.json"
run_test "Submit Question" "${TEST_DIR}/submit-question-request.json"
run_test "Submit Answer" "${TEST_DIR}/submit-answer-request.json"

echo "====================================="
echo "All tests completed!"
echo "====================================="
