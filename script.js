const quizData = [
  {
    question: "Which HTML5 tag is used to specify the main content of a document?",
    options: ["<section>", "<main>", "<content>", "<article>"],
    answer: "<main>"
  },
  {
    question: "Which CSS property is used to create a flexbox container?",
    options: ["flex: true;", "display: flex;", "layout: flexbox;", "box-type: flex;"],
    answer: "display: flex;"
  },
  {
    question: "Which JavaScript method selects an element using CSS-style selectors?",
    options: ["document.select()", "document.find()", "document.querySelector()", "document.getElement()"],
    answer: "document.querySelector()"
  },
  {
    question: "What does CSS media query '@media (max-width: 600px)' target?",
    options: ["Screens 600px or wider", "Screens 600px or narrower", "Only print views", "Retina displays only"],
    answer: "Screens 600px or narrower"
  }
];

// DOM Element References
const questionTracker = document.getElementById("question-tracker");
const scoreTracker = document.getElementById("score-tracker");
const questionText = document.getElementById("question-text");
const optionsGrid = document.getElementById("options-grid");
const feedbackMsg = document.getElementById("feedback-msg");
const nextBtn = document.getElementById("next-btn");

const quizCard = document.getElementById("quiz-card");
const resultsCard = document.getElementById("results-card");
const finalScoreText = document.getElementById("final-score-text");
const restartBtn = document.getElementById("restart-btn");

// State Variables
let currentQuestionIndex = 0;
let score = 0;

// Initialize Quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultsCard.classList.add("hide");
  quizCard.classList.remove("hide");
  loadQuestion();
}

// Load and Render Current Question
function loadQuestion() {
  resetState();
  const currentQuiz = quizData[currentQuestionIndex];

  questionTracker.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
  scoreTracker.textContent = `Score: ${score}`;
  questionText.textContent = currentQuiz.question;

  currentQuiz.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("btn");
    button.addEventListener("click", () => selectOption(button, option, currentQuiz.answer));
    optionsGrid.appendChild(button);
  });
}

// Reset Options and Feedback State
function resetState() {
  nextBtn.classList.add("hide");
  feedbackMsg.textContent = "";
  feedbackMsg.className = "feedback-msg";
  while (optionsGrid.firstChild) {
    optionsGrid.removeChild(optionsGrid.firstChild);
  }
}

// Handle Answer Selection
function selectOption(selectedButton, selectedAnswer, correctAnswer) {
  const buttons = optionsGrid.querySelectorAll(".btn");
  buttons.forEach(btn => (btn.disabled = true));

  if (selectedAnswer === correctAnswer) {
    selectedButton.classList.add("correct");
    feedbackMsg.textContent = "Correct! Well done.";
    feedbackMsg.classList.add("correct-text");
    score++;
    scoreTracker.textContent = `Score: ${score}`;
  } else {
    selectedButton.classList.add("wrong");
    feedbackMsg.textContent = `Incorrect. Correct answer: ${correctAnswer}`;
    feedbackMsg.classList.add("wrong-text");

    // Highlight the correct answer for clarity
    buttons.forEach(btn => {
      if (btn.textContent === correctAnswer) {
        btn.classList.add("correct");
      }
    });
  }

  nextBtn.classList.remove("hide");
}

// Step to Next Question or Show Results
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

// Render Results View
function showResults() {
  quizCard.classList.add("hide");
  resultsCard.classList.remove("hide");
  finalScoreText.textContent = `You scored ${score} out of ${quizData.length}!`;
}

// Event Listeners
restartBtn.addEventListener("click", startQuiz);

// Initial call
startQuiz();