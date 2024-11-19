const loginContainer = document.getElementById("login-container");
const instructionsContainer = document.getElementById("instructions-container");
const gameContainer = document.getElementById("game-container");

const loginButton = document.getElementById("login-button");
const startGameButton = document.getElementById("start-game-button");
const loginMessage = document.getElementById("login-message");

// Function to handle login
loginButton.addEventListener("click", function() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simple check for demo purposes
    if (username && password) {
        loginContainer.style.display = "none";
        instructionsContainer.style.display = "block";
    } else {
        loginMessage.textContent = "Please enter a valid username and password.";
    }
});

// Function to start the game
startGameButton.addEventListener("click", function() {
    instructionsContainer.style.display = "none";
    gameContainer.style.display = "block";
    startGame();
});

// Function to initialize the game
function startGame() {
    const words = ["apple", "banana", "cherry", "grape", "orange"];
    let selectedWord = words[Math.floor(Math.random() * words.length)];
    let hiddenWord = Array(selectedWord.length).fill("_");
    let attempts = 0;
    let guessedLetters = [];

    const hiddenWordElement = document.getElementById("hidden-word");
    const guessInput = document.getElementById("guess-input");
    const guessButton = document.getElementById("guess-button");
    const messageElement = document.getElementById("message");
    const attemptsElement = document.getElementById("attempts");
    const guessedLettersElement = document.getElementById("guessed-letters");

    // Update the hidden word display
    function updateHiddenWord() {
        hiddenWordElement.textContent = hiddenWord.join(" ");
    }

    // Check if the guessed letter is in the word
    function handleGuess() {
        const guess = guessInput.value.toLowerCase();
        if (!guess || guessedLetters.includes(guess)) {
            messageElement.textContent = "Please enter a valid, new letter!";
            return;
        }

        guessedLetters.push(guess);
        guessedLettersElement.textContent = guessedLetters.join(", ");
        attempts++;

        if (selectedWord.includes(guess)) {
            // Reveal the guessed letters in the word
            for (let i = 0; i < selectedWord.length; i++) {
                if (selectedWord[i] === guess) {
                    hiddenWord[i] = guess;
                }
            }
            updateHiddenWord();
            messageElement.textContent = "Good guess!";
        } else {
            messageElement.textContent = "Wrong guess! Try again.";
        }

        attemptsElement.textContent = attempts;

        // Check if the game is won
        if (hiddenWord.join("") === selectedWord) {
            messageElement.textContent = `Congratulations! You guessed the word: ${selectedWord}`;
            guessButton.disabled = true; // Disable guessing after win
        }

        guessInput.value = ""; // Clear input field
    }

    // Event listener for the guess button
    guessButton.addEventListener("click", handleGuess);

    // Update the hidden word initially
    updateHiddenWord();
}
