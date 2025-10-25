console.log("Background script loaded");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received:", request.action);
  
  if (request.action === 'openSidePanel') {
    console.log("Opening side panel for tab:", sender.tab?.id);
    
    // Make sure we have a valid tab ID
    if (!sender.tab?.id) {
      console.error("No tab ID available");
      return;
    }
    
    // Open side panel
    chrome.sidePanel.open({ tabId: sender.tab.id })
      .then(() => {
        console.log("Side panel opened successfully");
      })
      .catch((error) => {
        console.error("Failed to open side panel:", error);
      });
  }
});