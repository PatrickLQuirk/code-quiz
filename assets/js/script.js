var mainContentEl = document.querySelector("#main-content");

var startPageEl = document.querySelector("#start-page");
var quizQuestionEl = document.querySelector("#quiz-question");
var endQuizPageEl = document.querySelector("#end-quiz-page");
var highScorePageEl = document.querySelector("#high-score-page");
var correctWrongEl = document.querySelector("#correct-wrong-info");

var questionPromptEl = document.querySelector("#question-prompt");
var highScoreLinkEl = document.querySelector("#highscorelink");
var timerEl = document.querySelector("#timer");

var buttonHandler = function(event) {
    var targetEl = event.target;
    // console.log(targetEl);

    // if the target is the start quiz button, start the quiz
    if (targetEl.matches(".start-quiz-button")) {
        startQuiz();
    }
    
}


var revertToStartingPage = function() {
    console.log("reverting to the start page");
    // display the start page
    startPageEl.style.display = "block";

    // stop displaying the other pages
    quizQuestionEl.style.display = "none";
    endQuizPageEl.style.display = "none";
    highScorePageEl.style.display = "none";
    correctWrongEl.style.display = "none";

    // add code to revert the timer back to saying zero
    timerEl.textContent = "Time: 0";
    // in case this is called from the high-score-page, start showing the timer and high-score link
    timerEl.style.display = "block";
    highScoreLinkEl.style.display = "block";
};

var startQuiz = function() {
    console.log("Starting quiz...");
    startPageEl.style.display = "none";
    quizQuestionEl.style.display = "block";
    runQuiz();
}

var runQuiz = function() {
    console.log("running quiz");
    var timeLeft = 75;
    timerEl.textContent = "Time: " + timeLeft;
    var timeInterval = setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            timerEl.textContent = "Time: 0";
            console.log("Ending quiz because time ran out");
            endQuiz(timeLeft);
        } else {
            timeLeft = timeLeft - 1;
            timerEl.textContent = "Time: " + timeLeft;
        }
    }, 1000);
    questionIndex = 0;
    constructQuizQuestion(questionIndex);
    // event listener to handle the answer choice clicks
    quizQuestionEl.addEventListener("click", function(event) {
        var targetEl = event.target;
        if (targetEl.matches(".main-button")) {
            var targetTextContent = targetEl.textContent;
            var question = quizQuestionSet[questionIndex];
            var answer = question.answer;
            if (targetTextContent.slice(3, targetTextContent.length) === answer) {
                console.log("correct answer");
                correctIncorrectMessage(true);
            }
            else {
                console.log("incorrect answer");
                timeLeft = timeLeft - 10;
                timerEl.textContent = "Time: " + timeLeft;
                correctIncorrectMessage(false);
            }
            questionIndex = questionIndex + 1
            if (questionIndex >= quizQuestionSet.length) {
                console.log("Ran out of questions.");
                clearInterval(timeInterval);
                endQuiz(timeLeft);
            }
            else {
                constructQuizQuestion(questionIndex);
            }
        }
    });
}

var constructQuizQuestion = function(questionIndex) {
    var question = quizQuestionSet[questionIndex];
    questionPromptEl.textContent = question.prompt;
    for (i = 0; i < question.choices.length; i++) {
        var choiceButtonEl = document.querySelector(".main-button[data-button-id='" + (i + 1) + "']");
        choiceButtonEl.textContent = (i + 1) + ". " + question.choices[i];
    };
}

var correctIncorrectMessage = function(isCorrect) {
    if (isCorrect) {
        correctWrongEl.textContent = "Correct!";
    } else {
        correctWrongEl.textContent = "Wrong!";
    };
    correctWrongEl.style.display = "block";
    setTimeout(function() {
        correctWrongEl.style.display = "none";
    }, 1000);
};

var endQuiz = function(timeLeft) {
    quizQuestionEl.style.display = "none";
    endQuizPageEl.style.display = "block";
    var score = timeLeft;
    var finalScoreMessageEl = document.querySelector("#final-score-message");
    finalScoreMessageEl.textContent = "Your final score is " + score + ".";
}

var quizQuestionSet = [
    {
        prompt: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        prompt: "The condition in an if / else statement is enclosed with ______.",
        choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        answer: "parenthesis"
    },
    {
        prompt: "Arrays in JavaScript can be used to store ______.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        prompt: "String values must be enclosed within ______ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        prompt: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        answer: "console.log"
    }
];

// change this event listener to be for just the button to start the quiz
// the quiz answer choice buttons need to be handled inside the runQuiz function
mainContentEl.addEventListener("click", buttonHandler);

