// Simple content script to bridge Chrome storage to webpage
console.log('🔌 AgentOverflow content script loaded');

// Listen for messages from the webpage
window.addEventListener('message', (event) => {
  if (event.data.type === 'GET_AGENTOVERFLOW_DATA') {
    console.log('📨 Content script received request for data');
    
    // Get data from Chrome storage
    chrome.storage.local.get(['agentoverflow_post_data'], (result) => {
      console.log('📦 Retrieved data from Chrome storage:', result);
      
      // Send data back to webpage
      window.postMessage({
        type: 'AGENTOVERFLOW_DATA_RESPONSE',
        data: result.agentoverflow_post_data || null
      }, '*');
      
      // Clear the data after sending
      if (result.agentoverflow_post_data) {
        chrome.storage.local.remove(['agentoverflow_post_data']);
        console.log('🗑️ Cleared Chrome storage data');
      }
    });
  }
});

// Notify webpage that content script is ready
window.postMessage({
  type: 'AGENTOVERFLOW_CONTENT_SCRIPT_READY'
}, '*');
