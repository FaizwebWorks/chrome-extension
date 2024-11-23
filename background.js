const handleVideoControl = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const tabId = tabs[0].id;

      chrome.storage.sync.get("autoControlEnabled", (data) => {
        const autoControlEnabled = data.autoControlEnabled ?? true;

        if (!autoControlEnabled) return;

        chrome.tabs.sendMessage(tabId, { action: "check" }, (response) => {
          if (chrome.runtime.lastError) {
            console.warn("Content script not loaded.");
          } else {
            if (chrome.windows.WINDOW_ID_NONE) {
              chrome.tabs.sendMessage(tabId, { action: "pause" });
            } else {
              chrome.tabs.sendMessage(tabId, { action: "play" });
            }
          }
        });
      });
    }
  });
};
