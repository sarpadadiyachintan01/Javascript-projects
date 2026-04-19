
const textInput = document.getElementById('text-input');
const wordCountDisplay = document.getElementById('word-count');
textInput.addEventListener('input', () => {
  const text = textInput.value;
let words = text.trim().split(/\s+/);
   let wordCount = text.trim() === '' ? 0 : words.length;
wordCountDisplay.textContent = wordCount;
});