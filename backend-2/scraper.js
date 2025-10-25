import { chromium } from "playwright";

/**
 * Scrapes a Claude share link and returns the full conversation text
 * @param {string} url - Claude share link (e.g., https://claude.ai/share/xxx)
 * @returns {Promise<string>} - Full conversation text
 */
async function scrapeClaudeChat(url) {
  console.log(`🔍 Scraping: ${url}`);
  
  const browser = await chromium.launch({ 
    headless: true, // Use headed mode to avoid Cloudflare detection
    args: [
      '--disable-blink-features=AutomationControlled',
      '--disable-dev-shm-usage',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process'
    ]
  });
  
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1080 },
    locale: 'en-US',
    timezoneId: 'America/New_York',
    extraHTTPHeaders: {
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Upgrade-Insecure-Requests': '1'
    }
  });
  
  const page = await context.newPage();
  
  // Remove automation detection
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => undefined
    });
    
    window.chrome = {
      runtime: {}
    };
  });
  
  try {
    console.log('⏳ Loading page...');
    await page.goto(url, { 
      waitUntil: "domcontentloaded", 
      timeout: 45000 
    });
    
    // Wait for Cloudflare check
    console.log('⏳ Waiting for Cloudflare...');
    await page.waitForTimeout(5000);
    
    // Check if blocked by Cloudflare
    const title = await page.title();
    if (title.includes('Just a moment')) {
      console.log('⚠️  Cloudflare challenge detected, waiting...');
      await page.waitForTimeout(10000);
    }
    
    // Wait for main content
    console.log('⏳ Waiting for content to load...');
    try {
      await page.waitForSelector('main, article, [role="main"]', { timeout: 10000 });
    } catch (e) {
      console.log('⚠️  Main content selector not found, proceeding anyway...');
    }
    
    // Extract all text from the conversation
    console.log('📝 Extracting conversation text...');
    const conversationText = await page.evaluate(() => {
      // Try to find the main conversation container
      const main = document.querySelector('main') || 
                   document.querySelector('article') || 
                   document.querySelector('[role="main"]') ||
                   document.body;
      
      return main.innerText;
    });
    
    await browser.close();
    
    console.log('✅ Scraping complete!');
    console.log(`📊 Extracted ${conversationText.length} characters`);
    
    return conversationText;
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    await browser.close();
    throw error;
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const url = process.argv[2];
  
  if (!url) {
    console.error('Usage: node scraper.js <claude-share-url>');
    console.error('Example: node scraper.js https://claude.ai/share/abc123');
    process.exit(1);
  }
  
  scrapeClaudeChat(url)
    .then(text => {
      console.log('\n' + '='.repeat(80));
      console.log('CONVERSATION TEXT:');
      console.log('='.repeat(80) + '\n');
      console.log(text);
    })
    .catch(error => {
      console.error('Failed to scrape:', error.message);
      process.exit(1);
    });
}

export { scrapeClaudeChat };