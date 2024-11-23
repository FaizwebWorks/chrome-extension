document.addEventListener("DOMContentLoaded", () => {
    const toggleSwitch = document.getElementById("toggleSwitch");
  
    // Load the saved state
    chrome.storage.sync.get("autoControlEnabled", (data) => {
      toggleSwitch.checked = data.autoControlEnabled ?? true; // Default: enabled
    });
  
    // Save the state when toggled
    toggleSwitch.addEventListener("change", () => {
      chrome.storage.sync.set({ autoControlEnabled: toggleSwitch.checked });
    //   chrome.runtime.sendMessage({ action: "updateState" });
      console.log("State saved: ", toggleSwitch.checked);
    });
  });
  