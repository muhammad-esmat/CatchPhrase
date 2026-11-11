// game name title
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML =
  `Created By Elzero Web school, improved by Muhammad Esmat`;

// dark mode toggle
const colorModeBtn = document.querySelector(".darkMode-btn");

let currentColorMode = "light";
colorModeBtn.addEventListener("click", syncColorThemeData);
function syncColorThemeData() {
  if (currentColorMode === "light") {
    currentColorMode = "dark";
  } else {
    currentColorMode = "light";
  }
  document.body.setAttribute("data-theme", currentColorMode);
  colorModeBtn.classList.toggle("darkMode-toggled");
}

// game settings
let triesCount = 6;
let maxTriesCount = 6;
let letterCount = 6;
let maxLetterCount = 6;
let currentTry = 1;

// settings icon
const settingsCont = document.querySelector(".settings-cont");
const settingsButton = document.querySelector(".settings-icon");
const settingsOverlay = document.querySelector(
  ".settings-cont .settings-panel",
);

settingsOverlay.classList.add("displayNone");
settingsCont.addEventListener("mousemove", () => {
  settingsOverlay.classList.remove("displayNone");
});
settingsCont.addEventListener("mouseleave", () => {
  settingsOverlay.classList.add("displayNone");
});

// diffiuculty settings
const difficultyChoice = document.querySelector(
  ".settings-cont .settings-panel .choice",
);
difficultyChoice.addEventListener("click", (e) => {
  e.stopPropagation();

  if (e.target.classList.contains("easy")) {
    replaceInput(6, 6);
  } else if (e.target.classList.contains("medium")) {
    replaceInput(5, 6);
  } else if (e.target.classList.contains("hard")) {
    replaceInput(4, 6);
  } else if (e.target.classList.contains("extreme")) {
    replaceInput(3, 6);
  }
});

// generate inputs
function generateInput(tCount, lCount) {
  const inputsCont = document.querySelector(".inputs");

  // create main try div
  for (let i = 1; i <= tCount; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;

    if (i !== 1) tryDiv.classList.add("disable-input");

    // Create inputs
    for (let j = 1; j <= lCount; j++) {
      const input = document.createElement("input");

      input.type = "text";
      input.setAttribute("id", `guess-${i}-letter-${j}`);
      input.setAttribute("maxLength", "1");
      input.setAttribute("autocomplete", "off");
      tryDiv.appendChild(input);
    }

    inputsCont.appendChild(tryDiv);
  }
  inputsCont.children[0].children[1].focus();

  // disabled all input except first one
  document.querySelectorAll(".disable-input input").forEach((input) => {
    input.disabled = "true";
  });

  const inputs = document.querySelectorAll(".inputs input");
  inputs.forEach((input, index) => {
    // event input only detects characters and symbols (no special keys) (detects when a character is changed (can detect 'Backspace' or 'Delete' if a character is changed))
    // event keyup detects all of them

    input.addEventListener("input", (e) => {
      if (input.value.length && inputs[index + 1]) {
        e.preventDefault();
        const nextInput = inputs[index + 1];
        nextInput.focus();
      }
    });
    input.addEventListener("keydown", (e) => {
      const currentIndex = index;
      const prevIndex = currentIndex - 1;
      const nextIndex = currentIndex + 1;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (inputs[prevIndex]) inputs[prevIndex].focus();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (inputs[nextIndex]) inputs[nextIndex].focus();
      } else if (e.key === "Backspace") {
        e.preventDefault();
        if (inputs[currentIndex].value !== "") {
          inputs[currentIndex].value = "";
        } else if (inputs[prevIndex]) {
          inputs[prevIndex].focus();
        }
      } else if (e.key === ' ') {
        e.preventDefault();
        inputs[currentIndex].value = "";
      } else if (
        ((e.key >= "a" && e.key <= "z") || (e.key >= "A" && e.key <= "Z")) &&
        !e.altKey &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey
      ) {
        e.preventDefault();
        inputs[currentIndex].value = e.key;
        inputs[nextIndex].focus();
      } else {
        e.preventDefault();
      }
    });
  });
}

// replace inputs
function replaceInput(tCount, lCount) {
  const inputsCont = document.querySelectorAll(".inputs > div");
  inputsCont.forEach((div) => {
    div.remove();
  });

  letterCount = lCount;
  triesCount = tCount;
  generateInput((tCount = triesCount), (lCount = letterCount));
}

// document.addEventListener("DOMContentLoaded", listener)
document.addEventListener("DOMContentLoaded", (e) => {
  // generateSettings((tCount = maxTriesCount), (lCount = maxLetterCount));
  generateInput((tCount = triesCount), (lCount = letterCount));
});
