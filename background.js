chrome.windows.onFocusChanged.addListener((windowId) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const tabId = tabs[0].id;
      chrome.tabs.sendMessage(tabId, { action: "check" }, (response) => {
        if (chrome.runtime.lastError) {
        //   console.warn(
        //     "Content script not loaded. Sending pause/play may fail."
        //   );
        } else {
          if (windowId === chrome.windows.WINDOW_ID_NONE) {
            chrome.tabs.sendMessage(tabId, { action: "pause" });
          } else {
            chrome.tabs.sendMessage(tabId, { action: "play" });
          }
        }
      });
    }
  });
});
