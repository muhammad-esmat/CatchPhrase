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

// game options
let triesCount = 6;
let maxTriesCount = 6;
let letterCount = 6;
let maxLetterCount = 6;
let currentTry = 1;

// manage words
let wordToGuess = "";
let words = new Map()
words.set(4, ["cake", "wake", "plus", "java", "rust", "iron"]);
words.set(5, ["break", "phone", "bread", "alive", "awake"]);
words.set(6, ["Elzero", "Coffee", "School", "Python", "Pencil", "Banana", "Carrot"]);
  
function chooseWord() {
  letterCount = ([4,5,6])[ Math.min(Math.floor(Math.random() * 3), 2) ];
  console.log("letterCount when choosing letter", letterCount);
  const wordArr = words.get(letterCount);
  
  console.log(words.get(letterCount));
  wordToGuess = wordArr[Math.floor(Math.random() * wordArr.length)].toLowerCase();
  
  console.log(wordToGuess);
}
const messageEl = document.querySelector(".message");

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
    input.disabled = true;
  });

  const inputs = document.querySelectorAll(".inputs input");
  inputs.forEach((input, index) => {
    // event input only detects characters and symbols (no special keys) (detects when a character is changed (can detect 'Backspace' or 'Delete' if a character is changed))
    // event keyup detects all of them

    input.addEventListener("keydown", (e) => {
      const currentIndex = index;
      const prevIndex = currentIndex - 1;
      const nextIndex = currentIndex + 1;
      const enteredChar = String.fromCharCode(e.keyCode);
      const keyIsChar = /^[A-Za-z]+$/.test(enteredChar);

      if (e.key === "ArrowLeft") {
        if (inputs[prevIndex]) inputs[prevIndex].focus();
      } else if (e.key === "ArrowRight") {
        if (inputs[nextIndex]) inputs[nextIndex].focus();
      } else if (e.key === "Backspace") {
        if (inputs[currentIndex].value !== "") {
          inputs[currentIndex].value = "";
        } else if (inputs[prevIndex]) {
          inputs[prevIndex].focus();
        }
      } else if (e.key === " ") {
        inputs[currentIndex].value = "";
      } else if (e.key === "Enter") {
        handleGuesses();
      } else if (keyIsChar) {
        e.preventDefault();
        inputs[currentIndex].value = enteredChar.toLowerCase();
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

// check word
const guessBtn = document.querySelector(".check");
guessBtn.addEventListener("click", handleGuesses);
function handleGuesses() {
  let successfulGuess = true;
  const hintBtn = document.querySelector(".hint");


  console.log("letterCount in handleGuesses: ", letterCount);
  for (let i = 1; i <= letterCount; i++) {
    console.log(currentTry, i);
    let inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
    let enteredLetter = inputField.value.toLowerCase();
    let correctLetter = wordToGuess[i - 1];
    if (enteredLetter === correctLetter) {
      inputField.classList.add("in-place");
    } else if (wordToGuess.includes(enteredLetter) && enteredLetter !== "") {
      inputField.classList.add("not-in-place");
      successfulGuess = false;
    } else {
      inputField.classList.add("wrong");
      successfulGuess = false;
    }
  }

  // Check if user won or lost
  if (successfulGuess) {
    messageEl.innerHTML = `You succeeded after <span>${currentTry}</span> ${currentTry===1? "try" : "tries"}`
    
    // add disable class to try inputs
    const allTries = document.querySelectorAll('.inputs > div');
    allTries.forEach((tryDiv) => {
      controlTry(tryDiv, disable = true);
    })
    // add disable class to try guess btn & hint btn
    guessBtn.classList.add("disabled");
    hintBtn.classList.add("disabled");
  } else {
    const tries = document.querySelectorAll(".inputs > div");
    // if we aren't in the last try
    if (currentTry !== triesCount) {
      console.log("not last try");
      // disable the current try
      controlTry(tries[currentTry - 1], disable = true);
      
      // enable the next try
      controlTry(tries[currentTry], disable = false);
      tries[currentTry].children[1].focus();
      currentTry++;
    }
    else {
      console.log("last try");
      messageEl.innerHTML = `You lost after <span>${currentTry}</span> tries`;
      controlTry(tries[currentTry-1], disable = true);
      
      // add disable class to try guess btn & hint btn
      guessBtn.classList.add("disabled");
      hintBtn.classList.add("disabled");
    }
    
    // add disable class to try guess btn & hint btn
    guessBtn.classList.add("disabled");
    hintBtn.classList.add("disabled");
  }
  
}
function controlTry(inputDiv, disable) {
  if (disable) {
    inputDiv.classList.add("disable-input");
    for (let i = 0; i < inputDiv.children.length; i++) {
      if (inputDiv.children[i].tagName === "INPUT") {
        inputDiv.children[i].disabled = true;
      }
    }
  }
  else {
    inputDiv.classList.remove("disable-input");
    for (let i = 0; i < inputDiv.children.length; i++) {
      if (inputDiv.children[i].tagName === "INPUT") {
        inputDiv.children[i].disabled = false;
      }
    }
  }
}

// document.addEventListener("DOMContentLoaded", listener)
document.addEventListener("DOMContentLoaded", () => {
  chooseWord();
  console.log("letterCount when content loaded: ", letterCount);
  generateInput(tCount = triesCount, lCount = letterCount);
});
