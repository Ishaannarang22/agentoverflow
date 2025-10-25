console.log("Side panel loaded!");
const API_BASE = "http://localhost:8080/api";

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
  status.innerHTML = '<div class="loader"></div>Processing...';
  
  // Get the active tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  // Execute script to get share link
  chrome.scripting.executeScript({
  target: { tabId: tab.id },
  func: getShareLink
}, async (results) => {
  if (results && results[0] && results[0].result) {
    const shareLink = results[0].result;

    // Copy + save
    navigator.clipboard.writeText(shareLink);
    saveLink(shareLink, type);

    // Call your backend to get the JSON summary
    try {
      status.className = '';
      status.innerHTML = '<div class="loader"></div>Summarizing via backend…';

      const resp = await fetch(`${API_BASE}/share-solution`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: shareLink })
      });

      const data = await resp.json();
      if (!data.ok) throw new Error(data.error || "Summarization failed");

      const s = data.summary; // <-- this already matches your desired JSON schema
      status.className = 'success';
      status.innerHTML =
        `Link copied & saved.<br><br>` +
        `<pre style="white-space: pre-wrap; font-size:12px; background:#f7f7f7; padding:8px; border-radius:6px; max-height: 40vh; overflow:auto;">` +
        `${JSON.stringify(s, null, 2)}` +
        `</pre>` +
        `<button id="copyJsonBtn" class="download-btn" style="margin-top:8px;">Copy JSON</button>`;

      // Optional: Copy JSON button
      document.getElementById('copyJsonBtn')?.addEventListener('click', () => {
        navigator.clipboard.writeText(JSON.stringify(s, null, 2));
      });

      // Refresh saved links UI
      loadSavedLinks();

    } catch (e) {
      console.error(e);
      status.className = 'error';
      status.innerHTML = 'Backend error: ' + e.message;
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
        
        return `
          <div class="link-item">
            <div class="link-type ${link.type}">${link.type === 'share' ? 'Share' : 'Find'}</div>
            <div class="link-url">${link.url}</div>
            <div class="link-time">${timeStr}</div>
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