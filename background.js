chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    /^https:\/\/(www\.)?(zara|hm)\.com/.test(tab.url)
  ) {
    // Optionally, you could add logic here to auto-trigger the content script
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["content.js"],
    });
  }
});
