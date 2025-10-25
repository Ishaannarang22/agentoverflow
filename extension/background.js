chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'openSidePanel') {
    console.log("Opening side panel for tab:", sender.tab.id);
    
    // Open side panel
    chrome.sidePanel.open({ tabId: sender.tab.id });
  }
});