// document.addEventListener("DOMContentLoaded", listener)

// game name title
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML =
  `${gameName} Game Created By Elzero Web school`;

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
let letterCount = 6;
let currentTry = 1;

function generateInput() {
  const inputsCont = document.querySelector(".inputs");

  // create main try div
  for (let i = 1; i <= triesCount; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;

    if (i !== 1) tryDiv.classList.add("disable-input");

    // Create inputs
    for (let j = 1; j <= letterCount; j++) {
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
      input.value = input.value.toLowerCase();
      if (input.value.length && inputs[index + 1]) {
        const nextInput = inputs[index + 1];
        nextInput.focus()
      };
    });
    input.addEventListener("keydown", (e) => {
      const currentIndex = index;
      const prevIndex = currentIndex - 1;
      const nextIndex = currentIndex + 1;

      if (e.key == "ArrowLeft") {
        e.preventDefault();
        if (inputs[prevIndex]) inputs[prevIndex].focus();
        
      } else if (e.key == "ArrowRight") {
        e.preventDefault();
        if (inputs[nextIndex]) inputs[nextIndex].focus();
        
      } else if (e.key == "Backspace") {
        // e.preventDefault();
        if (inputs[currentIndex].value != "") {
          inputs[currentIndex].value = "";
        } else if (inputs[prevIndex]) {
          inputs[prevIndex].focus();
        }
      }
    });
  });
}
// settings button
const settingsCont = document.querySelector(".settings-cont");
const settingsButton = document.querySelector(".settings-btn");
const settingsOverlay = document.querySelector(".settings-cont .overlay");

settingsOverlay.classList.add("displayNone");
settingsCont.addEventListener("mousemove", () => {
  settingsOverlay.classList.remove("displayNone");
});
settingsCont.addEventListener("mouseleave", () => {
  settingsOverlay.classList.add("displayNone");
});

window.onload = function () {
  generateInput();
};
