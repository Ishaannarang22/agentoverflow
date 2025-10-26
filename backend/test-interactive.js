/**
 * Interactive Test Script with Progress
 * Usage: node test-interactive.js
 */

import readline from 'readline';
import fs from 'fs';

const API_BASE = "http://localhost:8080";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function testAPI() {
  console.log("\n" + "=".repeat(80));
  console.log("🧪 AgentOverflow API Test");
  console.log("=".repeat(80) + "\n");

  // Get URL from user
  const shareUrl = await question("📎 Enter Claude share URL: ");
  
  if (!shareUrl || !shareUrl.includes("claude.ai/share/")) {
    console.error("❌ Invalid URL. Must be a Claude share link.");
    rl.close();
    return;
  }

  // Get action type
  const action = await question("🎯 Action type (share/find) [share]: ") || "share";
  
  if (!["share", "find"].includes(action)) {
    console.error("❌ Action must be 'share' or 'find'");
    rl.close();
    return;
  }

  console.log("\n" + "=".repeat(80));
  console.log(`🔍 Processing: ${action.toUpperCase()} action`);
  console.log(`📎 URL: ${shareUrl}`);
  console.log("=".repeat(80) + "\n");

  // Show progress
  console.log("⏳ Step 1: Sending request to backend...");
  
  const startTime = Date.now();
  let progressInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    process.stdout.write(`\r⏳ Processing... ${elapsed}s elapsed (scraping + AI extraction)`);
  }, 1000);

  try {
    const response = await fetch(`${API_BASE}/api/process-conversation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url: shareUrl,
        action: action
      })
    });

    clearInterval(progressInterval);
    console.log("\n");

    const data = await response.json();
    const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);

    if (data.ok) {
      console.log("✅ SUCCESS! (" + totalTime + "s)\n");
      
      if (data.cached) {
        console.log("💾 Result returned from cache (instant)\n");
      }

      console.log("📊 Quick Summary:");
      console.log("─".repeat(80));
      console.log(`  Type:              ${data.result.type}`);
      console.log(`  Title:             ${data.result.title}`);
      console.log(`  Problem:           ${data.result.problem.substring(0, 70)}...`);
      
      if (data.result.solution) {
        console.log(`  Solution:          ${data.result.solution.substring(0, 70)}...`);
      } else {
        console.log(`  Solution:          null (not solved yet)`);
      }
      
      console.log(`  Tags:              ${data.result.tags?.slice(0, 5).join(", ")}${data.result.tags?.length > 5 ? '...' : ''}`);
      console.log(`  Code Snippets:     ${data.result.code_snippets?.length || 0}`);
      console.log(`  Error Messages:    ${data.result.error_messages?.length || 0}`);
      console.log(`  Attempted Solutions: ${data.result.attempted_solutions?.length || 0}`);
      console.log("─".repeat(80));

      // Show code snippets summary
      if (data.result.code_snippets?.length > 0) {
        console.log("\n💻 Code Snippets:");
        data.result.code_snippets.forEach((snippet, i) => {
          console.log(`  ${i + 1}. ${snippet.description}`);
          console.log(`     Lines: ${snippet.code.split('\n').length}`);
        });
      }

      // Show errors
      if (data.result.error_messages?.length > 0) {
        console.log("\n❌ Error Messages:");
        data.result.error_messages.forEach((err, i) => {
          console.log(`  ${i + 1}. ${err.substring(0, 70)}${err.length > 70 ? '...' : ''}`);
        });
      }

      console.log("\n" + "=".repeat(80));
      console.log("📋 FULL JSON:");
      console.log("=".repeat(80) + "\n");
      console.log(JSON.stringify(data.result, null, 2));
      console.log("\n" + "=".repeat(80));

      // Save to file
      const filename = `result-${action}-${Date.now()}.json`;
      fs.writeFileSync(filename, JSON.stringify(data.result, null, 2));
      console.log(`\n💾 Full result saved to: ${filename}`);
      
      // Ask if want to test again
      console.log("\n");
      const again = await question("🔄 Test another URL? (y/n): ");
      if (again.toLowerCase() === 'y') {
        await testAPI();
      } else {
        console.log("\n👋 Goodbye!\n");
        rl.close();
      }

    } else {
      console.error("❌ ERROR:", data.error);
      console.log("\n💡 Common issues:");
      console.log("  - Is the Claude share link valid and public?");
      console.log("  - Is your LAVA_FORWARD_TOKEN set correctly?");
      console.log("  - Check the server logs for details");
      rl.close();
    }

  } catch (error) {
    clearInterval(progressInterval);
    console.log("\n");
    console.error("❌ Request failed:", error.message);
    console.log("\n💡 Make sure:");
    console.log("  1. Server is running: npm run dev");
    console.log("  2. Server is on port 8080");
    console.log("  3. You have network connectivity");
    rl.close();
  }
}

// Check if server is running first
async function checkServer() {
  console.log("🔍 Checking if server is running...");
  try {
    const response = await fetch(`${API_BASE}/healthz`);
    const data = await response.json();
    if (data.ok) {
      console.log("✅ Server is running!");
      console.log(`   Provider: ${data.provider || 'Unknown'}`);
      console.log(`   Total calls: ${data.usage?.totalCalls || 0}`);
      console.log(`   Total tokens: ${data.usage?.totalTokens || 0}\n`);
      return true;
    }
  } catch (error) {
    console.error("❌ Server is not running!");
    console.log("\n💡 Start the server first:");
    console.log("   cd backend-3");
    console.log("   npm run dev\n");
    return false;
  }
}

// Main
(async () => {
  const serverRunning = await checkServer();
  if (serverRunning) {
    await testAPI();
  }
  process.exit(0);
})();