# Amizone Faculty Feedback Auto-Fill Script

This script auto-fills the faculty feedback form on the [Amizone portal](https://s.amizone.net) used by Amity University. It marks all questions as **"Strongly Agree"**, selects **"Yes"** for the last 3 Yes/No questions, and fills `"na"` in the comment box.

> ⚠️ Use responsibly. This script is provided for educational and productivity purposes only.

---

## 🔧 Features

- ✅ Automatically selects "Strongly Agree" (value = 5) for the first 25 questions.
- ✅ Selects "Yes" for the last 3 Yes/No questions.
- ✅ Fills the comment box with `"na"`.
- ✅ Optionally submits the form (you can enable it).

```javascript

document.querySelector("input[type='submit'], button[type='submit']").click();
```

---

## 🚀 How to Use

1. Open your faculty feedback form on Amizone.
2. Right-click anywhere → **Inspect** → Go to the **Console** tab. Or press Ctrl + C.
3. Paste the code and press **Enter**.
4. Review the form and submit.

---
