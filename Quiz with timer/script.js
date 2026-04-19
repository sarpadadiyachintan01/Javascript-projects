const quizData = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Preprocessor", "Hyper Text Markup Language", "Hyper Tool Multi Language", "Hyperlink Text Markup Language"],
        correctAnswer: "Hyper Text Markup Language"
    },
    {
        question: "Which of the following is a CSS framework?",
        options: ["React", "Angular", "Tailwind", "Vue"],
        correctAnswer: "Tailwind"
    },
    {
        question: "How do you declare a JavaScript variable?",
        options: ["v carName;", "variable carName;", "let carName;", "def carName;"],
        correctAnswer: "let carName;"
    }
];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const questionTracker = document.getElementById("question-tracker");
const timeDisplay = document.getElementById("time");
const finalScoreDisplay = document.getElementById("final-score");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    loadQuestion();
});
restartBtn.addEventListener("click", resetQuiz);
function startQuiz() {
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    startTimer();
    loadQuestion();
}
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timeDisplay.innerText = timeLeft;
if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz(); 
        }
    }, 1000);
}
function loadQuestion() {
    // Reset next button state
    nextBtn.classList.add("hide");
    optionsContainer.innerHTML = "";
    if (currentQuestionIndex >= quizData.length) {
        endQuiz();
        return;
    }
    const currentQuestion = quizData[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    questionTracker.innerText = `Question ${currentQuestionIndex + 1} / ${quizData.length}`;

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectAnswer(button, option, currentQuestion.correctAnswer));
        optionsContainer.appendChild(button);
    });
}
function selectAnswer(selectedButton, selectedOption, correctOption) {
    // Prevent clicking multiple times
    const allOptions = optionsContainer.querySelectorAll(".option-btn");
    allOptions.forEach(btn => btn.disabled = true);
    if (selectedOption === correctOption) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
        
        allOptions.forEach(btn => {
            if (btn.innerText === correctOption) {
                btn.classList.add("correct");
            }
        });
    }
nextBtn.classList.remove("hide");
}
function endQuiz() {
    clearInterval(timerInterval); 
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
    finalScoreDisplay.innerText = `${score} / ${quizData.length}`;
}
function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30;
    timeDisplay.innerText = timeLeft;
    resultScreen.classList.remove("active");
    startScreen.classList.add("active");
}