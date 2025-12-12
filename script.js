// Winter / Christmas word list
const christmasWords = [
  "snowflake", "reindeer", "jingle", "mistletoe", "fireplace", "sleigh",
  "carols", "present", "gingerbread", "december", "festive", "blizzard",
  "chimney", "stocking", "holly", "snowman", "ornament", "candle",
  "angel", "star", "bells", "merry", "santa", "grinch"
];

const maxAttempts = 6;

// ---- Date-based deterministic word selection ----
function getDailyWord() {
  const today = new Date();
  const seed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();

  return christmasWords[seed % christmasWords.length];
}

// ---- Game state ----
let wordToGuess = getDailyWord();
let correctGuesses = [];
let wrongGuesses = [];
let attemptsLeft = maxAttempts;

// ---- Display helpers ----
function displayWord() {
  return wordToGuess
    .split("")
    .map(letter => (correctGuesses.includes(letter) ? letter : "_"))
    .join(" ");
}

function updateUI(message = "") {
  document.getElementById("word").textContent = displayWord();
  document.getElementById("wrong").textContent = wrongGuesses.join(", ");
  document.getElementById("attempts").textContent = attemptsLeft;
  document.getElementById("message").textContent = message;
}

// ---- Main guess handler ----
function makeGuess() {
  const input = document.getElementById("guessInput");
  const guess = input.value.toLowerCase();
  input.value = "";

  if (!guess.match(/^[a-z]$/)) {
    updateUI("Please enter a single letter.");
    return;
  }

  if (correctGuesses.includes(guess) || wrongGuesses.includes(guess)) {
    updateUI(`You already guessed "${guess}".`);
    return;
  }

  if (wordToGuess.includes(guess)) {
    correctGuesses.push(guess);
    updateUI(`Good guess! "${guess}" is in the word.`);
  } else {
    wrongGuesses.push(guess);
    attemptsLeft--;
    updateUI(`Sorry, "${guess}" is not in the word.`);
  }

  // Win condition
  if (!displayWord().includes("_")) {
    updateUI(`🎉 Congratulations! Today's word was "${wordToGuess.toUpperCase()}". Come back tomorrow!`);
    disableGame();
  }

  // Lose condition
  if (attemptsLeft === 0) {
    updateUI(`💀 Game Over! The word was "${wordToGuess.toUpperCase()}". Try again tomorrow.`);
    disableGame();
  }
}

function disableGame() {
  document.getElementById("guessInput").disabled = true;
}

// ---- Start game ----
updateUI("Welcome to the Daily Winter Word Guessing Game!");
