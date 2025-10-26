console.log("Side panel loaded!");

// Load saved links on startup
loadSavedLinks();

document.getElementById('shareBtn').addEventListener('click', () => {
  handleChoice('share');
});

document.getElementById('findBtn').addEventListener('click', () => {
  handleChoice('find');
});

document.getElementById('downloadBtn').addEventListener('click', () => {
  downloadCSV();
});

async function handleChoice(type) {
  console.log("User chose:", type);
  
  const status = document.getElementById('status');
  status.style.display = 'block';
  status.className = '';
  status.innerHTML = '<div class="loader"></div>Getting share link...';
  
  // Get the active tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  // Execute script to get share link
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: getShareLink
  }, async (results) => {
    if (results && results[0] && results[0].result) {
      const shareLink = results[0].result;
      
      // Copy to clipboard
      navigator.clipboard.writeText(shareLink);
      
      console.log("Link copied:", shareLink);
      
      // Save to storage
      saveLink(shareLink, type);
      
      // Call backend API
      status.innerHTML = '<div class="loader"></div>Processing with backend...';
      
      try {
        const response = await fetch('http://localhost:3001/api/process-conversation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: shareLink,
            action: type
          })
        });
        
        const data = await response.json();
        
        if (data.ok) {
          status.className = 'success';
          status.innerHTML = `
            ✅ Successfully processed!<br>
            <small style="margin-top: 8px; display: block; opacity: 0.8;">
              Title: ${data.result.title}<br>
              Tags: ${data.result.tags?.join(', ') || 'None'}<br>
              ${data.cached ? '(From cache)' : ''}
            </small>
          `;
          
          // Save the full result with the link
          saveLinkWithResult(shareLink, type, data.result);
          
          console.log("Backend processing complete:", data);
        } else {
          throw new Error(data.error || 'Backend processing failed');
        }
        
        // Reload the saved links list
        loadSavedLinks();
        
      } catch (error) {
        console.error("Backend error:", error);
        status.className = 'error';
        status.innerHTML = `
          ❌ Backend processing failed<br>
          <small style="margin-top: 8px; display: block; opacity: 0.8;">
            ${error.message}<br>
            Make sure the backend is running on port 3001
          </small>
        `;
      }
      
    } else {
      status.className = 'error';
      status.innerHTML = 'Could not find share link.<br>Make sure the Claude share dialog is open!';
    }
  });
}

// This function runs in the page context
function getShareLink() {
  // Try to find the span with the link text
  const linkSpan = document.querySelector('span.group-hover\\:max-w-\\[calc\\(100\\%-20px\\)\\]');
  
  if (linkSpan && linkSpan.textContent.includes('claude.ai/share/')) {
    return linkSpan.textContent.trim();
  }
  
  // Fallback: try to find any element with claude.ai/share link
  const allElements = document.querySelectorAll('span, a, button');
  for (let el of allElements) {
    if (el.textContent && el.textContent.includes('claude.ai/share/')) {
      const text = el.textContent.trim();
      // Extract just the URL if there's extra text
      const match = text.match(/https:\/\/claude\.ai\/share\/[a-f0-9-]+/);
      if (match) {
        return match[0];
      }
    }
  }
  
  // Last resort: try input fields
  const linkInput = document.querySelector('input[readonly]') || 
                    document.querySelector('input[type="text"][value*="claude.ai"]');
  
  return linkInput ? linkInput.value : null;
}

// Save link to Chrome storage
function saveLink(url, type) {
  const timestamp = new Date().toISOString();
  const link = {
    url: url,
    type: type,
    timestamp: timestamp
  };
  
  // Get existing links
  chrome.storage.local.get(['links'], (result) => {
    const links = result.links || [];
    links.unshift(link); // Add to beginning
    
    // Keep only last 50 links
    if (links.length > 50) {
      links.length = 50;
    }
    
    // Save back to storage
    chrome.storage.local.set({ links: links }, () => {
      console.log("Link saved:", link);
    });
  });
}

// Save link with backend processing result
function saveLinkWithResult(url, type, result) {
  const timestamp = new Date().toISOString();
  const link = {
    url: url,
    type: type,
    timestamp: timestamp,
    result: result // Include the full backend result
  };
  
  // Get existing links
  chrome.storage.local.get(['links'], (data) => {
    const links = data.links || [];
    
    // Find and update existing link, or add new one
    const existingIndex = links.findIndex(l => l.url === url && l.type === type);
    if (existingIndex !== -1) {
      links[existingIndex] = link;
    } else {
      links.unshift(link);
    }
    
    // Keep only last 50 links
    if (links.length > 50) {
      links.length = 50;
    }
    
    // Save back to storage
    chrome.storage.local.set({ links: links }, () => {
      console.log("Link with result saved:", link);
    });
  });
}

// Load and display saved links
function loadSavedLinks() {
  chrome.storage.local.get(['links'], (result) => {
    const links = result.links || [];
    const linksList = document.getElementById('linksList');
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (links.length === 0) {
      linksList.innerHTML = '<p style="color: #A8A8A0; font-size: 13px;">No links saved yet</p>';
      downloadBtn.style.display = 'none';
    } else {
      linksList.innerHTML = links.map(link => {
        const date = new Date(link.timestamp);
        const timeStr = date.toLocaleString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        });
        
        // Display backend result if available
        let resultHtml = '';
        if (link.result) {
          resultHtml = `
            <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #E5E5E0;">
              <div style="font-weight: 600; color: #2D2D2D; margin-bottom: 4px;">${link.result.title}</div>
              ${link.result.tags && link.result.tags.length > 0 ? 
                `<div style="font-size: 10px; color: #A16207; margin-bottom: 4px;">
                  ${link.result.tags.map(tag => `<span style="background: #FEF3C7; padding: 2px 6px; border-radius: 3px; margin-right: 4px;">${tag}</span>`).join('')}
                </div>` 
                : ''}
              ${link.result.problem ? 
                `<div style="font-size: 11px; color: #706F6C; line-height: 1.4;">${link.result.problem}</div>` 
                : ''}
            </div>
          `;
        }
        
        return `
          <div class="link-item">
            <div class="link-type ${link.type}">${link.type === 'share' ? '✅ Share' : '🔍 Find'}</div>
            <div class="link-url">${link.url}</div>
            <div class="link-time">${timeStr}</div>
            ${resultHtml}
          </div>
        `;
      }).join('');
      
      downloadBtn.style.display = 'block';
    }
  });
}

// Download links as CSV
function downloadCSV() {
  chrome.storage.local.get(['links'], (result) => {
    const links = result.links || [];
    
    if (links.length === 0) {
      alert('No links to download');
      return;
    }
    
    // Create CSV content
    let csv = 'Type,URL,Timestamp\n';
    links.forEach(link => {
      csv += `"${link.type}","${link.url}","${link.timestamp}"\n`;
    });
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `claude-links-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    console.log('CSV downloaded');
  });
}