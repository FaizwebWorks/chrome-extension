chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const video = document.querySelector("video");

  if (request.action === "check") {
    sendResponse({ loaded: true });
    return;
  }

  if (!video) return;

  chrome.storage.sync.get("autoControlEnabled", (data) => {
    const autoControlEnabled = data.autoControlEnabled ?? true;

    // If autoControlEnabled is false, prevent playing/pausing
    if (!autoControlEnabled) return;

    // Perform the play/pause actions based on the request
    if (request.action === "pause") {
      video.pause();
    } else if (request.action === "play") {
      video.play();
    }
  });
});

// Listen for visibility change to pause/play based on tab's visibility
document.addEventListener("visibilitychange", () => {
  const video = document.querySelector("video");

  chrome.storage.sync.get("autoControlEnabled", (data) => {
    const autoControlEnabled = data.autoControlEnabled ?? true;

    if (!autoControlEnabled || !video) return;

    if (document.visibilityState === "hidden") {
      video.pause();
    } else if (document.visibilityState === "visible") {
      video.play();
    }
  });
});
