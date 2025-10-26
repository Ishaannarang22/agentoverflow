/**
 * Test Script for AgentOverflow Backend
 * Tests both "share" and "find" actions
 */

const API_BASE = "http://localhost:8080";

// Test Claude share link (replace with a real one)
const TEST_SHARE_LINK = "https://claude.ai/share/your-share-id-here";

/**
 * Test Share Action (completed solution)
 */
async function testShareAction() {
  console.log("\n" + "=".repeat(80));
  console.log("TEST 1: SHARE ACTION (Solution Extraction)");
  console.log("=".repeat(80) + "\n");

  try {
    const response = await fetch(`${API_BASE}/api/process-conversation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url: TEST_SHARE_LINK,
        action: "share"
      })
    });

    const data = await response.json();

    if (data.ok) {
      console.log("✅ Success!\n");
      console.log("Result:");
      console.log("  - Type:", data.result.type);
      console.log("  - Title:", data.result.title);
      console.log("  - Problem:", data.result.problem);
      console.log("  - Solution:", data.result.solution?.substring(0, 100) + "...");
      console.log("  - Tags:", data.result.tags?.join(", "));
      console.log("  - Code snippets:", data.result.code_snippets?.length || 0);
      console.log("  - Error messages:", data.result.error_messages?.length || 0);
      console.log("\nFull result:");
      console.log(JSON.stringify(data.result, null, 2));
    } else {
      console.error("❌ Error:", data.error);
    }
  } catch (error) {
    console.error("❌ Request failed:", error.message);
  }
}

/**
 * Test Find Action (problem seeking solution)
 */
async function testFindAction() {
  console.log("\n" + "=".repeat(80));
  console.log("TEST 2: FIND ACTION (Problem Extraction)");
  console.log("=".repeat(80) + "\n");

  try {
    const response = await fetch(`${API_BASE}/api/process-conversation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url: TEST_SHARE_LINK,
        action: "find"
      })
    });

    const data = await response.json();

    if (data.ok) {
      console.log("✅ Success!\n");
      console.log("Result:");
      console.log("  - Type:", data.result.type);
      console.log("  - Title:", data.result.title);
      console.log("  - Problem:", data.result.problem);
      console.log("  - Solution:", data.result.solution); // Should be null
      console.log("  - Tags:", data.result.tags?.join(", "));
      console.log("  - Code snippets:", data.result.code_snippets?.length || 0);
      console.log("  - Attempted solutions:", data.result.attempted_solutions?.length || 0);
      console.log("\nFull result:");
      console.log(JSON.stringify(data.result, null, 2));
    } else {
      console.error("❌ Error:", data.error);
    }
  } catch (error) {
    console.error("❌ Request failed:", error.message);
  }
}

/**
 * Test Health Endpoint
 */
async function testHealth() {
  console.log("\n" + "=".repeat(80));
  console.log("TEST 3: HEALTH CHECK");
  console.log("=".repeat(80) + "\n");

  try {
    const response = await fetch(`${API_BASE}/healthz`);
    const data = await response.json();
    
    console.log("✅ Server is healthy!");
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("❌ Health check failed:", error.message);
  }
}

/**
 * Run all tests
 */
async function runTests() {
  console.log("\n╔═══════════════════════════════════════════════════════════════════╗");
  console.log("║           AgentOverflow Backend - Test Suite                     ║");
  console.log("╚═══════════════════════════════════════════════════════════════════╝");

  // Test health first
  await testHealth();

  // Test both actions
  await testShareAction();
  await testFindAction();

  console.log("\n" + "=".repeat(80));
  console.log("ALL TESTS COMPLETE");
  console.log("=".repeat(80) + "\n");
}

// Run tests
runTests().catch(console.error);