chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const video = document.querySelector("video");

  if (request.action === "check") {
    sendResponse({ loaded: true });
    return;
  }

  if (!video) return;

  if (request.action === "pause") {
    video.pause();
  } else if (request.action === "play") {
    video.play();
  }
});

// Listen for the visibility change event
document.addEventListener("visibilitychange", () => {
  const video = document.querySelector("video");
  if (video) {
    if (document.visibilityState === "hidden") {
      video.pause();
    } else if (document.visibilityState === "visible") {
      video.play();
    }
  }
});
