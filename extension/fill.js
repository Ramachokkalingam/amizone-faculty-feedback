// Injected into the Amizone feedback page by popup.js via chrome.scripting.
// The final expression is returned to the popup as the injection result.

(async () => {
  const defaults = { comment: "na", autoSubmit: false };
  const settings = await chrome.storage.sync.get(defaults);

  // Radios ignore a plain `.checked = true` in forms that listen for change
  // events, so drive them through a real click and only force the property
  // if the click was swallowed.
  const select = (input) => {
    if (!input) return false;
    if (!input.checked) input.click();
    if (!input.checked) {
      input.checked = true;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }
    return input.checked;
  };

  // The original script assumed exactly 25 rating rows. Read them off the page
  // instead so a form with more or fewer questions still fills completely.
  const ratingInputs = document.querySelectorAll(
    'input[type="radio"][name^="FeedbackRating["][name$=".Rating"]'
  );
  const ratingGroups = new Map();
  for (const input of ratingInputs) {
    if (!ratingGroups.has(input.name)) ratingGroups.set(input.name, []);
    ratingGroups.get(input.name).push(input);
  }

  let ratings = 0;
  for (const group of ratingGroups.values()) {
    const stronglyAgree = group.find((input) => input.value === "5");
    if (select(stronglyAgree)) ratings++;
  }

  let yesNo = 0;
  for (const question of ["Q1Rating", "Q2Rating", "Q3Rating"]) {
    const yes = Array.from(
      document.querySelectorAll('input[type="radio"][value="1"]')
    ).find(
      (input) => input.name.includes(question) || input.id.includes(question)
    );
    if (select(yes)) yesNo++;
  }

  const commentBox = document.querySelector(
    'textarea[name="Comments"], textarea[id*="Comments"]'
  );
  let comment = false;
  if (commentBox) {
    commentBox.value = settings.comment;
    commentBox.dispatchEvent(new Event("input", { bubbles: true }));
    commentBox.dispatchEvent(new Event("change", { bubbles: true }));
    comment = true;
  }

  const submitButton = document.querySelector(
    'input[type="submit"], button[type="submit"]'
  );
  let submitted = false;
  if (settings.autoSubmit && submitButton && ratingGroups.size > 0) {
    submitButton.click();
    submitted = true;
  }

  return {
    ratings,
    ratingTotal: ratingGroups.size,
    yesNo,
    comment,
    submitted,
    hasSubmitButton: Boolean(submitButton),
  };
})();
