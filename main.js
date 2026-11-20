// game name title
let gameName = "CatchPhrase";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
const myProfileLink = document.createElement("a");
myProfileLink.innerHTML = "Muhammad Esmat";
myProfileLink.setAttribute("href", "https://github.com/muhammad-esmat");
myProfileLink.classList.add("footer-link");
myProfileLink.setAttribute("target", "_blank");
document.querySelector("footer").innerHTML =
  `Created By Elzero Web school, improved by `;
document.querySelector("footer").appendChild(myProfileLink);

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
let allTryDivs;

// game options
let maxTriesCount = 6;
let maxLetterCount = 6;
let currentTry = 1;
let triesCount, letterCount, hintCount;
let difficultyMap = new Map()
  .set(0, "easy")
  .set(1, "medium")
  .set(2, "hard")
  .set(3, "extreme");
let difficulty = difficultyMap.get(1);
console.log(difficulty);

if (difficulty === "easy") {
  triesCount = 6;
  hintCount = 3;
} else if (difficulty === "medium") {
  triesCount = 5;
  hintCount = 3;
} else if (difficulty === "hard") {
  triesCount = 4;
  hintCount = 2;
} else if (difficulty === "extreme") {
  triesCount = 3;
  hintCount = 1;
}

// manage words
let wordToGuess;
let words = [
  // of 4 letters
  { text: "plus", categoryArticle: "a", category: "mathematical operator" },
  { text: "zero", categoryArticle: "a", category: "number" },
  { text: "java", categoryArticle: "a", category: "programming language" },
  { text: "fish", categoryArticle: "a", category: "marine animal" },
  { text: "iron", categoryArticle: "a", category: "chemical element" },
  { text: "nine", categoryArticle: "a", category: "number" },
  { text: "milk", categoryArticle: "a", category: "beverage" },
  { text: "wolf", categoryArticle: "a", category: "wild animal" },
  { text: "bear", categoryArticle: "a", category: "wild animal" },

  // of 5 letters
  { text: "shark", categoryArticle: "a", category: "marine animal" },
  { text: "minus", categoryArticle: "a", category: "mathematical operator" },
  { text: "candy", categoryArticle: "a", category: "snack" },
  { text: "swift", categoryArticle: "a", category: "programming language" },
  { text: "seven", categoryArticle: "a", category: "number" },
  { text: "juice", categoryArticle: "a", category: "beverage" },
  { text: "tiger", categoryArticle: "a", category: "wild animal" },
  { text: "angry", categoryArticle: "an", category: "adjective" },
  { text: "brave", categoryArticle: "an", category: "adjective" },

  // of 6 letters
  { text: "divide", categoryArticle: "a", category: "mathematical operator" },
  { text: "jaguar", categoryArticle: "a", category: "wild animal" },
  { text: "castle", categoryArticle: "a", category: "place" },
  { text: "shrimp", categoryArticle: "a", category: "marine animal" },
  { text: "eleven", categoryArticle: "a", category: "number" },
  { text: "boring", categoryArticle: "an", category: "adjective" },
  { text: "palace", categoryArticle: "a", category: "place" },
  { text: "python", categoryArticle: "a", category: "programming language"},
  { text: "clever", categoryArticle: "an", category: "adjective" },
];

function chooseWord() {
  /* Math.Random() returns [0.0, 1.0), can never return 1.0
    Math.Random() * 3 returns [0.0, 3.0) can never return 3.0 only less than 3.0 */
  wordToGuess = words[Math.floor(Math.random() * words.length)];
  letterCount = wordToGuess.text.length;

  console.log(wordToGuess);
}
chooseWord();
const messageEl = document.querySelector(".message");
messageEl.innerHTML = `It's ${wordToGuess.categoryArticle} <span>${wordToGuess.category}</span>`;

// settings icon
const settingsCont = document.querySelector(".settings-cont");
const settingsIcon = document.querySelector(".settings-icon");
const settingsIconCont = document.querySelector(".icon-cont");
const settingsPanel = document.querySelector(".settings-cont .settings-panel");

settingsPanel.classList.add("displayNone");

settingsIcon.addEventListener("focus", () => {
  settingsIconCont.classList.add("active");
  settingsPanel.classList.remove("displayNone");
});
settingsIcon.addEventListener("blur", () => {
  settingsIconCont.classList.remove("active");
  settingsPanel.classList.add("displayNone");
});

// difficulty
const difficultyBtns = document.querySelectorAll(".choice button");
const difficultySettingCont = document.querySelector(
  ".settings-cont .settings-panel .choice",
);
// make difficulty button have 'selected' class
function syncDifficultyBtns() {
  difficultyBtns.forEach((btn, index) => {
    // console.log(btn.classList);
    // console.log(difficultyMap.get(index));
    if (btn.classList.contains(difficulty)) {
      btn.classList.add("selected");
    } else if (btn.classList.contains("selected")) {
      btn.classList.remove("selected");
    }
  });
}
syncDifficultyBtns();

const hintBtn = document.querySelector(".hint");
function setHintCount() {
  if (difficulty === "easy") {
    hintCount = 3;
  } else if (difficulty === "medium") {
    hintCount = 3;
  } else if (difficulty === "hard") {
    hintCount = 2;
  } else if (difficulty === "extreme") {
    hintCount = 1;
  }

  hintBtn.innerHTML =
    hintCount === 1
      ? `<span>${hintCount}</span> hint`
      : `<span>${hintCount}</span> hints`;
}
setHintCount();

function setTriesCount() {
  if (difficulty === "easy") {
    triesCount = 6;
  } else if (difficulty === "medium") {
    triesCount = 5;
  } else if (difficulty === "hard") {
    triesCount = 4;
  } else if (difficulty === "extreme") {
    triesCount = 3;
  }
}
setTriesCount();

// diffiuculty settings
difficultySettingCont.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("easy")) {
    difficulty = "easy";
  } else if (e.target.classList.contains("medium")) {
    difficulty = "medium";
  } else if (e.target.classList.contains("hard")) {
    difficulty = "hard";
  } else if (e.target.classList.contains("extreme")) {
    difficulty = "extreme";
  }

  reloadGame();
});
function reloadGame() {
  // reset state variables
  reloadBtn.classList.add("displayNone");

  currentTry = 1;
  if (hintBtn.disabled) hintBtn.disabled = false;
  if (guessBtn.disabled) guessBtn.disabled = false;

  previousHints = [];
  chooseWord();
  messageEl.innerHTML = `It's ${wordToGuess.categoryArticle} <span>${wordToGuess.category}</span>`;

  setHintCount();
  syncDifficultyBtns();
  setTriesCount();
  replaceInput(triesCount, letterCount);
}

const reloadBtn = document.querySelector(".reload");
reloadBtn.addEventListener("click", reloadGame);
reloadBtn.classList.add("displayNone");

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
        if (inputs[prevIndex]) inputs[prevIndex].focus();
      } else if (e.key === " ") {
        if (inputs[nextIndex]) inputs[nextIndex].focus();
      } else {
        e.preventDefault();
      }
    });
  });

  allTryDivs = document.querySelectorAll(".inputs > div");
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleGuesses();
  }
});
// replace inputs
function replaceInput(tCount, lCount) {
  allTryDivs.forEach((div) => {
    div.remove();
  });

  triesCount = tCount;
  letterCount = lCount;
  // console.log("letterCount when replacing inputs: ", letterCount);

  generateInput((tCount = triesCount), (lCount = letterCount));
}

// check word
const guessBtn = document.querySelector(".check");

guessBtn.addEventListener("click", handleGuesses);

function countIn(countedIn, val) {
  let count = 0;
  for (let i = 0; i < countedIn.length; i++) {
    if (countedIn[i] === val) count++;
  }
  return count;
}
function handleGuesses() {
  let enteredLetters = [];
  let successfulGuess = true;
  const wordToGuessArr = Array.from(wordToGuess);
  // console.log("letterCount in handleGuesses: ", letterCount);
  for (let i = 1; i <= letterCount; i++) {
    // console.log(currentTry, i);
    let inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
    let enteredLetter = inputField.value.toLowerCase();
    let correctLetter = wordToGuess.text[i - 1];
    enteredLetters.push(enteredLetter);
    if (enteredLetter === correctLetter) {
      inputField.classList.add("in-place");
    } else if (
      !(
        countIn(wordToGuess, enteredLetter) <
        countIn(enteredLetters, enteredLetter)
      ) &&
      wordToGuess.text.includes(enteredLetter) &&
      enteredLetter !== ""
    ) {
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
      messageEl.innerHTML = `0 hints?? You're good at this .. <span>Keep it up!</span>`;
    else messageEl.innerHTML = `You won, <span>Good Job!</span>`;

    // disable tries
    allTryDivs.forEach((tryDiv) => {
      controlTry(tryDiv, (disable = true));
    });

    hintBtn.disabled = true;
    guessBtn.disabled = true;
    reloadBtn.classList.remove("displayNone");
    reloadBtn.innerHTML = "Crush it again?";
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
      messageEl.innerHTML = `You lost, the correct word is <span>${wordToGuess.text}</span>`;

      // disable guess btn & hint btn
      guessBtn.disabled = true;
      hintBtn.disabled = true;
      reloadBtn.classList.remove("displayNone");
      reloadBtn.innerHTML = "Try again?";
    }
  }
}

hintBtn.addEventListener("click", showHint);
let previousHints = [];
function showHint() {
  /* (Elzero's) const enabledInputs = document.querySelectorAll(".inputs input:not([disabled])");
    we used this instead of Elzero's way because his way assumes all enabled inputs will be in current try
    my approach includes disabling hint inputs so his way will not count 'hint' inputs causing variable 'enabledInputs' to not be in line with wordToGuess indexing
    so in order to have inputs indexes in line with word to guess i had to count all inputs in this try even if they are disabled
  */

  const currentInputs = Array.from(allTryDivs[currentTry - 1].children).slice(
    1,
  );
  // console.log(currentInputs);

  const validHintInputs = currentInputs.filter((el, index) => {
    // console.log(index);
    return (
      el.value !== wordToGuess.text[index] && !previousHints.includes(index)
    );
  });
  // console.log(validHintInputs);

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
    let indexToFill = currentInputs.indexOf(randomInput);

    // console.log(indexToFill)
    // console.log(randomInput);
    // console.log("randomIndex: ", randomIndex);
    // console.log("randomInput: ", randomInput);
    // console.log("wordToGuess[indexToFill]: ",wordToGuess[indexToFill]);
    // console.log("previousHints: ",previousHints);

    randomInput.value = wordToGuess.text[indexToFill];
    randomInput.disabled = true;
    previousHints.push(indexToFill);
    if (hintCount > 0) {
      hintCount--;
      hintBtn.innerHTML =
        hintCount === 1
          ? `<span>${hintCount}</span> hint`
          : `<span>${hintCount}</span> hints`;
    }
  }
  if (hintCount === 0) {
    hintBtn.disabled = true;
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

document.addEventListener("DOMContentLoaded", () => {
  // console.log("letterCount when content loaded: ", letterCount);
  generateInput((tCount = triesCount), (lCount = letterCount));
});
