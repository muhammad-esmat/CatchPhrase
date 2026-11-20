# CatchPhrase 🎯

A modern, browser-based word guessing game where players try to guess a hidden word within a limited number of attempts. Built with vanilla HTML, CSS, and JavaScript.

---

## 📖 Table of Contents

- [About the Project](#about-the-project)
- [Live Demo](#-live-demo)
- [Features](#features)
- [How to Play](#how-to-play)
- [Difficulty Levels](#difficulty-levels)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
- [Technologies Used](#technologies-used)
- [Credits](#credits)

---

## About the Project

**CatchPhrase** is an interactive word-guessing game inspired by Wordle. A random word is chosen from a curated list, and the player must guess it within a set number of tries. After each guess, the game provides color-coded feedback indicating which letters are correct, misplaced, or wrong.

The game also features a category hint system, difficulty selection, hint usage, and a dark/light mode toggle.

---

## 🚀 Live Demo

> **Think you can guess the word with zero hints?**
### 👉 [**Try it now** →](https://muhammad-esmat.github.io/CatchPhrase/)

--- 

## Features

- 🎲 **Random Word Selection** — Words are picked from categorized lists (4, 5, and 6-letter words).
- 🧠 **Category Clue** — Each round displays a category hint (e.g., *"It's a marine animal"*).
- 🎨 **Color-Coded Feedback** — Letters are marked as:
  - 🟩 **In place** (correct letter, correct position)
  - 🟨 **Not in place** (correct letter, wrong position)
  - ⬛ **Wrong** (letter not in the word)
- 🔁 **Dynamic Try Rows** — Number of attempts adapts to the selected difficulty.
- 💡 **Hint System** — Reveal a correct letter in a random unfilled position (limited by difficulty).
- ⚙️ **Difficulty Settings** — Choose between Easy, Medium, Hard, and Extreme.
- 🌗 **Dark/Light Mode** — Toggle the theme; persisted per session.
- ⌨️ **Keyboard Friendly** — Arrow keys, Backspace, and Enter are all supported.
- 📱 **Responsive Layout** — Works across screen sizes (thanks to CSS grid/flexbox).

---

## How to Play

1. Open `index.html` in any modern browser.
2. Read the category clue displayed at the top of the game area.
3. Type a word using the input tiles:
   - Typing auto-advances to the next tile.
   - Use **← / →** to move between tiles.
   - **Backspace** clears the current tile and moves back.
   - Press **Enter** or click **Check Word** to submit.
4. After submitting:
   - Green = correct letter in the correct spot.
   - Yellow = correct letter in the wrong spot.
   - Gray = letter not in the word.
5. Keep guessing until you find the word or run out of tries.
6. Use **Hints** if you're stuck — but use them wisely!
7. Click **Reload** to start a new round.

---

## Difficulty Levels

| Difficulty | Tries | Hints |
|------------|-------|-------|
| Easy       | 6     | 3     |
| Medium     | 5     | 3     |
| Hard       | 4     | 2     |
| Extreme    | 3     | 1     |

Change difficulty via the **⚙️ settings icon** in the top-left corner. Changing difficulty automatically starts a new round.

---

## File Structure

```
.
├── index.html        # Main HTML structure
├── style.css         # Styling (themes, layout, components)
├── main.js           # Game logic, state, and interactions
├── assets/
│   └── logo.png      # Favicon / logo
├── Design/           # Design assets (ignored via .gitignore)
└── .gitignore
```

---

## Getting Started

### Prerequisites

- Any modern browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required

### Running the Game

1. Clone the repository:
   ```bash
   git clone https://github.com/muhammad-esmat/CatchPhrase.git
   ```
2. Navigate into the project:
   ```bash
   cd CatchPhrase
   ```
3. Open `index.html` directly in your browser — or serve it locally:
   ```bash
   # With Python
   python -m http.server 8000

   # With Node.js (npx)
   npx serve .
   ```
4. Visit `http://localhost:8000` (or the port shown).

---

## Technologies Used

- **HTML5** — Semantic structure and SVG icons
- **CSS3** — Custom properties (variables), flexbox, grid, transitions, theming
- **Vanilla JavaScript (ES6+)** — Game logic, DOM manipulation, event handling
- **Font Awesome (SVG paths)** — Settings icon credited to Fonticons, Inc.

No frameworks. No libraries. No build step.

---

## Credits

- **Original concept & base**: [Elzero Web School](https://elzero.org/)
- **Improvements & maintenance**: [Muhammad Esmat](https://github.com/muhammad-esmat)

> The `Design/` folder is excluded from version control via `.gitignore`.

---

## License

This project is open source and available for learning purposes. Refer to the original author for any licensing inquiries regarding the base project.

---

Enjoy the game and try to beat it with **0 hints** — you might just earn the special victory message! 😉
