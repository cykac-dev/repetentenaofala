// Initialize date constants
const date1 = document.querySelectorAll(".date-1");
const date2 = document.querySelector(".date-2");
const firstYear = new Date(2016, 0, 1).getFullYear();
const secondYear = new Date(2019, 0, 1).getFullYear();
const currentYear = new Date().getFullYear();

// Update comment dates
date1.forEach((element) => {
  element.innerHTML = `${currentYear - firstYear} anos atrás`;
});
date2.innerHTML =
  currentYear - secondYear > 1
    ? (date2.innerHTML = `${currentYear - secondYear} anos atrás`)
    : (date2.innerHTML = `${currentYear - secondYear} ano atrás`);

// Initialize comment toggle constants
const toggleAnswersButton = document.querySelector(".toggle-answers");
const secondaryCommentBlocks = document.querySelectorAll(
  ".comment-block-secondary"
);

// Toggle comment visibility and button text
toggleAnswersButton.innerHTML = "▴  Ocultar respostas";
toggleAnswersButton.onclick = () => {
  secondaryCommentBlocks.forEach((block) => {
    block.style.display =
      toggleAnswersButton.innerHTML === "▴  Ocultar respostas" ? "none" : "";
  });
  toggleAnswersButton.innerHTML =
    toggleAnswersButton.innerHTML === "▴  Ocultar respostas"
      ? "▾  Ver respostas"
      : "▴  Ocultar respostas";
};

// Initialize comment rating constants
const localStorage = window.localStorage;
const ratingButtons = document.querySelectorAll(".rating-button");
const savedRatings =
  localStorage.getItem("savedRatings") === null
    ? []
    : JSON.parse(localStorage.getItem("savedRatings"));

// For each rating button...
ratingButtons.forEach((button, i) => {
  // Load saved ratings
  savedRatings.forEach((rating) => {
    if (button === ratingButtons[rating]) {
      button.classList.add("rating-button-active");
    }
  });

  // When button is clicked...
  button.onclick = () => {
    // Reset both like and dislike buttons
    if (button === button.parentNode.children[0]) {
      if (savedRatings.includes(i + 1)) {
        savedRatings.splice(savedRatings.indexOf(i + 1), 1);
        ratingButtons[i + 1].classList.remove("rating-button-active");
      }
    } else if (savedRatings.includes(i - 1)) {
      savedRatings.splice(savedRatings.indexOf(i - 1), 1);
      ratingButtons[i - 1].classList.remove("rating-button-active");
    }

    // Add this button's index to (or remove from) saved ratings
    if (savedRatings.includes(i)) {
      savedRatings.splice(savedRatings.indexOf(i), 1);
      button.classList.remove("rating-button-active");
    } else {
      savedRatings.push(i);
      button.classList.add("rating-button-active");
    }

    // Update local storage
    localStorage.setItem("savedRatings", JSON.stringify(savedRatings));
  };
});
