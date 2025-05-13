(() => {
  for (let i = 0; i < 25; i++) {
    const radios = document.querySelectorAll(`input[name='FeedbackRating[${i}].Rating']`);
    const stronglyAgree = Array.from(radios).find(r => r.value === "5");
    if (stronglyAgree) stronglyAgree.checked = true;
  }

  const yesNoQuestions = ['FeedbackRating_Q1Rating', 'FeedbackRating_Q2Rating', 'FeedbackRating_Q3Rating'];
  yesNoQuestions.forEach(name => {
    const yesOption = document.querySelector(`input[name='${name}'][value='1']`);
    if (yesOption) yesOption.checked = true;
  });

  const commentBox = document.querySelector("textarea[name='Comments'], textarea[id*='Comments']");
  if (commentBox) commentBox.value = "na";

  console.log("Form filled");
})();
