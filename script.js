
// ================================
// QUIZ QUESTIONS
// ================================

const questions = [
    {
        question: "Which language is primarily used for structuring web pages?",
        options: ["Python", "HTML", "CSS", "JavaScript"],
        correctAnswer: 1
    },

    {
        question: "Which language is used for styling web pages?",
        options: ["HTML", "Java", "CSS", "Python"],
        correctAnswer: 2
    },

    {
        question: "Which language makes a website interactive?",
        options: ["JavaScript", "HTML", "CSS", "SQL"],
        correctAnswer: 0
    },

    {
        question: "Which company developed JavaScript?",
        options: ["Microsoft", "Google", "Netscape", "Apple"],
        correctAnswer: 2
    },

    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<p>"],
        correctAnswer: 1
    },

    {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["//", "#", "<!-- -->", "**"],
        correctAnswer: 0
    },

    {
        question: "Which keyword declares a variable in JavaScript?",
        options: ["define", "variable", "let", "int"],
        correctAnswer: 2
    },

    {
        question: "Which method selects an element by ID?",
        options: [
            "getElementById()",
            "getElement()",
            "selectById()",
            "queryById()"
        ],
        correctAnswer: 0
    },

    {
        question: "Which CSS property changes text color?",
        options: ["background", "font-size", "color", "text-style"],
        correctAnswer: 2
    },

    {
        question: "Which method is used to print output in the browser console?",
        options: ["console.log()", "print()", "display()", "output()"],
        correctAnswer: 0
    }
];


// ================================
// SELECT HTML ELEMENTS
// ================================

const startScreen = document.getElementById("start-screen");

const questionScreen = document.getElementById("questionScreen");

const startBtn = document.getElementById("start-btn");

const questionText = document.getElementById("question-text");

const currentQuestion = document.getElementById("currentQuestion");

const scoreDisplay = document.getElementById("score");

const progress = document.getElementById("progress");

const optionButtons = document.querySelectorAll(".option-btn");
const nextBtn = document.getElementById("nextBtn");
const resultScreen = document.getElementById("resultScreen");
const finalScore = document.getElementById("finalScore");
const scorePercentage = document.getElementById("scorePercentage");
const totalQuestions = document.getElementById("totalQuestions");
const correctAnswers = document.getElementById("correctAnswers");
const wrongAnswers = document.getElementById("wrongAnswers");
const restartBtn = document.getElementById("restartBtn");
const timerDisplay = document.getElementById("timer");




let currentIndex = 0;

let score = 0;
let timeLeft = 60;
let timerInterval;


// START QUIZ FUNCTION

function startQuiz() {

    startScreen.style.display = "none";
    resultScreen.style.display = "none";
    questionScreen.style.display = "block";
    score = 0;
    currentIndex = 0;
    showQuestion();

}


// SHOW QUESTION FUNCTION


function showQuestion() {

    const currentQuiz = questions[currentIndex];

    currentQuestion.textContent = currentIndex + 1;

    questionText.textContent = currentQuiz.question;

    scoreDisplay.textContent = score;

    const progressWidth =
        ((currentIndex + 1) / questions.length) * 100;

    progress.style.width = progressWidth + "%";

    optionButtons.forEach((button, index) => {

        const letter = button.querySelector(".option-letter");

        button.textContent = "";

        button.appendChild(letter);

        button.append(" " + currentQuiz.options[index]);

        button.classList.remove("correct", "wrong");

        button.disabled = false;

    });

    nextBtn.disabled = true;
    startTimer();
}




// TIMER FUNCTION
function startTimer() {

    // Clear previous timer
    clearInterval(timerInterval);

    // Reset timer
    timeLeft = 60;
    timerDisplay.textContent = timeLeft;

    timerDisplay.classList.remove("timer-warning");

    timerInterval = setInterval(() => {

        timeLeft--;

        timerDisplay.textContent = timeLeft;

        // Warning when 10 seconds remain
        if (timeLeft <= 10) {
            timerDisplay.classList.add("timer-warning");
        }

        // Time is over
        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            // Disable all options
            optionButtons.forEach(button => {
                button.disabled = true;
            });

            // Show correct answer
            const correctIndex = questions[currentIndex].correctAnswer;

            optionButtons[correctIndex].classList.add("correct");

            // Enable Next button
            nextBtn.disabled = false;
        }

    }, 1000);
}




// START BUTTON EVENT

startBtn.addEventListener("click", startQuiz);


optionButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        selectAnswer(index);

    });

});



function selectAnswer(selectedIndex) {

    const currentQuiz = questions[currentIndex];

    // সব option button disable করা
    optionButtons.forEach((button) => {
        button.disabled = true;
    });

    // সঠিক উত্তর নির্বাচন করা হয়েছে কিনা চেক
    if (selectedIndex === currentQuiz.correctAnswer) {

        // Score বাড়ানো
        score++;

        // সঠিক option green করা
        optionButtons[selectedIndex].classList.add("correct");

    } else {

        // ভুল option red করা
        optionButtons[selectedIndex].classList.add("wrong");

        // সঠিক option green করা
        optionButtons[currentQuiz.correctAnswer].classList.add("correct");
    }

    // Score update করা
    scoreDisplay.textContent = score;
    nextBtn.disabled = false;
}

function nextQuestion() {

    currentIndex++;

    if (currentIndex < questions.length) {

        showQuestion();

    } else {

        showResult();

    }
}


nextBtn.addEventListener("click", nextQuestion);

function showResult() {

    questionScreen.style.display = "none";
    resultScreen.style.display = "block";

    const total = questions.length;
    const correct = score;
    const wrong = total - correct;

    const percentage = (correct / total) * 100;

    finalScore.textContent = correct + "/" + total;

    scorePercentage.textContent =
        percentage + "% Accuracy";

    totalQuestions.textContent = total;
    correctAnswers.textContent = correct;
    wrongAnswers.textContent = wrong;
}

restartBtn.addEventListener("click", startQuiz);


