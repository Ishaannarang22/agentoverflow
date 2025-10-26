console.log("Extension loaded!");

document.addEventListener('click', function(event) {
  const shareButton = event.target.closest('[data-testid="wiggle-controls-actions-share"]');
  
  if (shareButton) {
    console.log("Share button clicked!");
    
    // Tell background to open side panel
    chrome.runtime.sendMessage({ action: 'openSidePanel' }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error sending message:", chrome.runtime.lastError);
      }
    });
  }
}, true);