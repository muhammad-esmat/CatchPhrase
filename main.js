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
let hintCount = 3;
let difficultyMap = new Map().set(1, "easy").set(2, "medium").set(3, "hard").set(4, "extreme");
let difficulty = difficultyMap.get(1);

// manage words
let wordToGuess = "";
let words = new Map();
words.set(4, ["cake", "wake", "plus", "zero", "rust", "iron"]);
words.set(5, ["break", "phone", "bread", "whale", "shark", "awake"]);
words.set(6, [
  "Elzero",
  "choose",
  "Coffee",
  "School",
  "Python",
  "Pencil",
  "Banana",
  "Carrot",
]);

function chooseWord() {
  /* Math.Random() returns [0.0, 1.0), can never return 1.0
    Math.Random() * 3 returns [0.0, 3.0) can never return 3.0 only less than 3.0 */
  letterCount = [4, 5, 6][Math.floor(Math.random() * 3)];
  // console.log("letterCount when choosing letter", letterCount);
  const wordArr = words.get(letterCount);

  // console.log(words.get(letterCount));
  wordToGuess =
    wordArr[Math.floor(Math.random() * wordArr.length)].toLowerCase();

  console.log(wordToGuess);
}

// settings icon
const settingsCont = document.querySelector(".settings-cont");
const settingsIcon = document.querySelector(".settings-icon");
const settingsIconCont = document.querySelector(".icon-cont");
const settingsPanel = document.querySelector(
  ".settings-cont .settings-panel",
);

settingsPanel.classList.add("displayNone");

settingsIcon.addEventListener("focus", () => {
  settingsIconCont.classList.add("active")
  settingsPanel.classList.remove("displayNone");
});
settingsIcon.addEventListener("blur", () => {
  settingsIconCont.classList.remove("active");
  settingsPanel.classList.add("displayNone");
});

// diffiuculty settings
const difficultyChoice = document.querySelector(
  ".settings-cont .settings-panel .choice",
);
difficultyChoice.addEventListener("mousedown", (e) => {
  e.stopPropagation();

  // reset state variables
  currentTry = 1;
  messageEl.innerHTML = ``;
  if (hintBtn.disabled) hintBtn.disabled = false;
  if (guessBtn.disabled) guessBtn.disabled = false;

  previousHints = [];
  chooseWord();
  if (e.target.classList.contains("easy")) {
    replaceInput(6, letterCount);
    hintCount = 3;
  } else if (e.target.classList.contains("medium")) {
    replaceInput(5, letterCount);
    hintCount = 3;
  } else if (e.target.classList.contains("hard")) {
    replaceInput(4, letterCount);
    hintCount = 2;
  } else if (e.target.classList.contains("extreme")) {
    replaceInput(3, letterCount);
    hintCount = 1;
  }

  hintBtn.children[0].innerHTML = hintCount;
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

    // todo: move things from keydown to input
    /*
      input.addEventListener("input", (e) => {
        const currentIndex = index;
        const prevIndex = currentIndex - 1;
        const nextIndex = currentIndex + 1;
      })  
    */
    input.addEventListener("keydown", (e) => {
      const currentIndex = index;
      const prevIndex = currentIndex - 1;
      const nextIndex = currentIndex + 1;
      const enteredChar = String.fromCharCode(e.keyCode);
      const keyIsAlphabetical = /^[A-Za-z]+$/.test(enteredChar);
      
      if (keyIsAlphabetical) {
        e.preventDefault();
        input.value = enteredChar.toLowerCase();
        if (inputs[nextIndex]) inputs[nextIndex].focus();
      } else if (e.key === "ArrowLeft") {
        if (inputs[prevIndex]) inputs[prevIndex].focus();
      } else if (e.key === "ArrowRight") {
        if (inputs[nextIndex]) inputs[nextIndex].focus();
      } else if (e.key === "Backspace") {
        e.preventDefault();
        input.value = "";
        if (inputs[prevIndex]) 
          inputs[prevIndex].focus();
      } else if (e.key === " ") {
        input.value = "";
      } else if (e.key === "Enter") {
        handleGuesses();
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

  triesCount = tCount;
  letterCount = lCount;
  // console.log("letterCount when replacing inputs: ", letterCount);

  generateInput((tCount = triesCount), (lCount = letterCount));
}

// check word
const guessBtn = document.querySelector(".check");
const hintBtn = document.querySelector(".hint");
const messageEl = document.querySelector(".message");

guessBtn.addEventListener("click", handleGuesses);
function handleGuesses() {
  let successfulGuess = true;
  // console.log("letterCount in handleGuesses: ", letterCount);
  for (let i = 1; i <= letterCount; i++) {
    // console.log(currentTry, i);
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
    if (hintCount === 3)
      messageEl.innerHTML = `0 hints?! <span>Keep it up!</span>`;
    else messageEl.innerHTML = `You won, <span>Good Job!</span>`;

    // disable tries 
    const allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => {
      controlTry(tryDiv, (disable = true));
    });
  } else {
    let currentTryDiv = document.querySelector(`.try-${currentTry}`);
    // disable the current try
    controlTry(currentTryDiv, (disable = true));

    // if we aren't in the last try
    if (currentTry !== triesCount) {
      let nextTryDiv = document.querySelector(`.try-${currentTry + 1}`);
      // enable the next try
      controlTry(nextTryDiv, (disable = false));
      nextTryDiv.children[1].focus();
      currentTry++;
    } else {
      messageEl.innerHTML = `You lost, the correct word is <span>${wordToGuess}</span>`;
      
      // add disable class to try guess btn & hint btn
      guessBtn.disabled = true;
      hintBtn.disabled = true;
    }
  }
}

hintBtn.innerHTML =
  hintCount === 1
    ? `<span>${hintCount}</span> hint`
    : `<span>${hintCount}</span> hints`;
hintBtn.addEventListener("click", showHint);
let previousHints = [];
function showHint() {
  console.log(hintCount);
  if (hintCount > 0) {
    hintCount--;
    hintBtn.innerHTML =
      hintCount === 1
        ? `<span>${hintCount}</span> hint`
        : `<span>${hintCount}</span> hints`;
  }
  if (hintCount === 0) {
    hintBtn.classList.add("disabled");
    hintBtn.disabled = true;
  }

  const tryInputs = document.querySelectorAll(`.try-${currentTry} input`);
  /* (Elzero's) const enabledInputs = document.querySelectorAll(".inputs input:not([disabled])");
    we used this instead of Elzero's way because his way assumes all enabled inputs will be in current try
    my approach includes disabling hint inputs so his way will not count 'hint' inputs causing variable 'enabledInputs' to not be in line with wordToGuess indexing
    so in order to have inputs indexes in line with word to guess i had to count all inputs in this try even if they are disabled
  */

  const validHintInputs = Array.from(tryInputs).filter((input, index) => {
    return (
      input.value == "" && !input.disabled && !previousHints.includes(index)
    );
  });

  // console.log(tryInputs);
  // console.log(emptyEnabledInputs);

  /*
    remember the difference between an expression and a statement
    expression => evaluates to a value
    statement => any code that runs (expressions are subset of statements)

    if you dont use {} in arrow functions, 
      you must make an expression that returns a value
    if you use {} in arrow functions, 
      you must make a set of statements with 'return' statement at the end just like a regular function
    in arrow functions if you u
  */

  if (validHintInputs.length > 0) {
    let randomIndex = Math.floor(Math.random() * validHintInputs.length);
    let randomInput = validHintInputs[randomIndex];
    let indexToFill = Array.from(tryInputs).indexOf(randomInput);
    // console.log("randomIndex: ", randomIndex);
    // console.log("randomInput: ", randomInput);
    // console.log("wordToGuess[indexToFill]: ",wordToGuess[indexToFill]);
    // console.log("indexToFill: ", indexToFill);
    // console.log("previousHints: ",previousHints);
    previousHints.push(indexToFill);
    randomInput.value = wordToGuess[indexToFill];
    randomInput.disabled = true;
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
  } else {
    inputDiv.classList.remove("disable-input");
    for (let i = 0; i < inputDiv.children.length; i++) {
      if (inputDiv.children[i].tagName === "INPUT") {
        inputDiv.children[i].disabled = false;
      }
    }
  }
}
// todo(after course): make a global var for all tries (.inputs > div) bc we use it a lot

// document.addEventListener("DOMContentLoaded", listener)
document.addEventListener("DOMContentLoaded", () => {
  chooseWord();
  // console.log("letterCount when content loaded: ", letterCount);
  generateInput((tCount = triesCount), (lCount = letterCount));
});
