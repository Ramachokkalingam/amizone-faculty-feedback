# Amizone Faculty Feedback Auto-Fill

Auto-fills the faculty feedback form on the [Amizone portal](https://s.amizone.net) used by Amity University. It marks every rating question as **"Strongly Agree"**, selects **"Yes"** for the 3 Yes/No questions, and fills the comment box.

Available as a **browser extension** (recommended) or as the original **console script**.

> ⚠️ Use responsibly. Provided for educational and productivity purposes only.

---

## 🧩 Browser Extension

A Manifest V3 extension for Chrome, Edge, Brave, and other Chromium browsers.

### Install

1. Open `chrome://extensions` (or `edge://extensions`).
2. Turn on **Developer mode**.
3. Click **Load unpacked** and select the `extension/` folder from this repo.

### Use

1. Open your faculty feedback form on Amizone.
2. Click the extension icon in the toolbar.
3. Optionally change the comment text or tick **Submit the form after filling**.
4. Click **Fill form**, review the result, and submit.

### Features

- ✅ Selects "Strongly Agree" (value = 5) for every rating question on the page.
- ✅ Selects "Yes" for the 3 Yes/No questions.
- ✅ Fills the comment box with your own text (default `"na"`), remembered between uses.
- ✅ Optional auto-submit, off by default.
- ✅ Runs only when you click the button, and only on `s.amizone.net`.

### Files

| File | Purpose |
| --- | --- |
| `extension/manifest.json` | Extension manifest (MV3) |
| `extension/popup.html` / `popup.css` / `popup.js` | Toolbar popup and settings |
| `extension/fill.js` | Injected into the page to fill the form |

---

## 📋 Console Script

The original one-off version, `amizone-faculty-feedback.js`:

1. Open your faculty feedback form on Amizone.
2. Press <kbd>F12</kbd> → **Console** tab.
3. Paste the script and press **Enter**. If pasting is blocked, type `allow pasting` first.
4. Review the form and submit.

To submit automatically, run:

```javascript
document.querySelector("input[type='submit'], button[type='submit']").click();
```
