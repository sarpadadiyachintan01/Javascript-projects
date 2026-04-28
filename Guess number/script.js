
let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;


const guessInput = document.getElementById('guessInput');
const submitBtn = document.getElementById('submitBtn');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');
const restartBtn = document.getElementById('restartBtn');


submitBtn.addEventListener('click', checkGuess);
restartBtn.addEventListener('click', resetGame);


guessInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    checkGuess();
  }
});


function checkGuess() {
  
  const userGuess = Number(guessInput.value);


  if (!userGuess || userGuess < 1 || userGuess > 100) {
    showMessage('Please enter a valid number between 1 and 100.', 'error');
    return;
  }

  
  attempts++;
  attemptsDisplay.textContent = `Attempts: ${attempts}`;

  
  if (userGuess === randomNumber) {
    showMessage(`Correct! You guessed the number in ${attempts} attempts!`, 'success');
    endGame();
  } else if (userGuess < randomNumber) {
    showMessage('Too low! Try a higher number.', 'warning');
  } else {
    showMessage('Too high! Try a lower number.', 'warning');
  }
  

  guessInput.value = '';
  guessInput.focus();
}


function showMessage(text, className) {
  message.textContent = text;
  message.className = className; 
}


function endGame() {
  guessInput.disabled = true;
  submitBtn.disabled = true;
  restartBtn.style.display = 'inline-block';
}


function resetGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  
  attemptsDisplay.textContent = 'Attempts: 0';
  message.textContent = '';
  message.className = '';
  
  guessInput.disabled = false;
  submitBtn.disabled = false;
  guessInput.value = '';
  
  restartBtn.style.display = 'none';
  guessInput.focus();
}