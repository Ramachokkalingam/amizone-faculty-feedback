const defaults = { comment: "na", autoSubmit: false };

const commentInput = document.getElementById("comment");
const autoSubmitInput = document.getElementById("autoSubmit");
const fillButton = document.getElementById("fill");
const status = document.getElementById("status");

const setStatus = (message, kind = "") => {
  status.textContent = message;
  status.className = kind ? `status ${kind}` : "status";
};

chrome.storage.sync.get(defaults).then((settings) => {
  commentInput.value = settings.comment;
  autoSubmitInput.checked = settings.autoSubmit;
});

const saveSettings = () =>
  chrome.storage.sync.set({
    comment: commentInput.value.trim() || defaults.comment,
    autoSubmit: autoSubmitInput.checked,
  });

commentInput.addEventListener("change", saveSettings);
autoSubmitInput.addEventListener("change", saveSettings);

const describe = (result) => {
  if (!result || result.ratingTotal === 0) {
    return {
      message: "No feedback form found on this page.",
      kind: "err",
    };
  }

  const parts = [`${result.ratings}/${result.ratingTotal} ratings`];
  if (result.yesNo) parts.push(`${result.yesNo} Yes/No`);
  if (result.comment) parts.push("comment");

  return {
    message: result.submitted
      ? `Filled ${parts.join(", ")} and submitted.`
      : `Filled ${parts.join(", ")}. Review, then submit.`,
    kind: "ok",
  };
};

fillButton.addEventListener("click", async () => {
  fillButton.disabled = true;
  setStatus("Filling…");

  try {
    await saveSettings();

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.url?.startsWith("https://s.amizone.net/")) {
      setStatus("Open your feedback form on s.amizone.net first.", "err");
      return;
    }

    const [injection] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["fill.js"],
    });

    const { message, kind } = describe(injection?.result);
    setStatus(message, kind);
  } catch (error) {
    setStatus(error.message || "Could not fill the form.", "err");
  } finally {
    fillButton.disabled = false;
  }
});
