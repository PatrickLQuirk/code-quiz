var mainContentEl = document.querySelector("#main-content");

var startPageEl = document.querySelector("#start-page");
var quizQuestionEl = document.querySelector("#quiz-question");
var endQuizPageEl = document.querySelector("#end-quiz-page");
var highScorePageEl = document.querySelector("#high-score-page");
var correctWrongEl = document.querySelector("#correct-wrong-info");

var questionPromptEl = document.querySelector("#question-prompt");
var highScoreLinkEl = document.querySelector("#highscorelink");
var timerEl = document.querySelector("#timer");
var timeLeft = 0;
var questionIndex = 0;

// this handles most of the buttons on the page
// this does not handle the button for submitting the player's initials on the end-screen,
//      as that is handled with a "submit" event listener
var clickHandler = function(event) {
    var targetEl = event.target;
    // console.log(targetEl);

    // if the target is the start quiz button, start the quiz
    if (targetEl.matches(".start-quiz-button")) {
        startQuiz();
    }
    else if (targetEl.matches(".quiz-button")) {
        answerQuizQuestion(targetEl);
    }
    else if (targetEl.matches("#back-to-start")) {
        revertToStartingPage();
    }
    // clear the highscores from localStorage and reset the table when the "Clear scores" button is clicked.
    else if (targetEl.matches("#clear-high-scores")) {
        localStorage.removeItem("highscores");
        highScoreTable.innerHTML = "";
        var emptyRow = document.createElement("tr");
        var emptyRowCell = document.createElement("td");
        emptyRowCell.textContent = "No high scores saved";
        emptyRow.className = "table-row";
        emptyRow.appendChild(emptyRowCell);
        highScoreTable.appendChild(emptyRow);
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
    timeLeft = 0;
    timerEl.textContent = "Time: 0";
    // in case this is called from the high-score-page, start showing the timer and high-score link
    timerEl.style.display = "block";
    highScoreLinkEl.style.display = "block";
};

// I assign timeInterval to null here solely so that timeInterval is a global variable
// its actual functionality will be set in the startQuiz function.
var timeInterval = null;

var startQuiz = function() {
    startPageEl.style.display = "none";
    quizQuestionEl.style.display = "block";
    timeLeft = 75;
    timerEl.textContent = "Time: " + timeLeft;
    timeInterval = setInterval(function() {
        if (quizQuestionEl.style.display !== "none") {
            if (timeLeft <= 0) {
                clearInterval(timeInterval);
                timerEl.textContent = "Time: 0";
                endQuiz();
            } else {
                timeLeft = timeLeft - 1;
                timerEl.textContent = "Time: " + timeLeft;
            }
        }
    }, 1000);
    questionIndex = 0;
    constructQuizQuestion(questionIndex);
}

var answerQuizQuestion = function(targetEl) {
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
    questionIndex = questionIndex + 1;
    if (questionIndex >= quizQuestionSet.length) {
        clearInterval(timeInterval);
        endQuiz();
    }
    else {
        constructQuizQuestion(questionIndex);
    }
};

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

var endQuiz = function() {
    quizQuestionEl.style.display = "none";
    endQuizPageEl.style.display = "block";
    var finalScoreMessageEl = document.querySelector("#final-score-message");
    finalScoreMessageEl.textContent = "Your final score is " + timeLeft + ".";
    // the submission of the player's initials and transition to the page for high-scores will be handled separately
}

var getScores = function() {
    var scoresString = localStorage.getItem("highscores");
    if (!scoresString) {
        highScores = [];
    } else {
        highScores = JSON.parse(scoresString);
    }
    return highScores;
}

var saveHighScore = function(event) {
    event.preventDefault();

    var initials = document.querySelector("input[name='initials']").value;
    var score = timeLeft;
    var highScores = getScores();
    var scoreToSave = {
        initials: initials,
        score: score
    };
    highScores.push(scoreToSave);
    highScores.sort((a, b) => b.score - a.score);
    savableValue = JSON.stringify(highScores);
    localStorage.setItem("highscores", savableValue);

    timeLeft = 0;
    timerEl.textContent = "Time: 0";
    displayHighScores();
}

var displayHighScores = function() {
    startPageEl.style.display = "none";
    endQuizPageEl.style.display = "none";
    timerEl.style.display = "none";
    highScoreLinkEl.style.display = "none";
    highScorePageEl.style.display = "block";

    highScores = getScores();
    highScoreTable = document.querySelector("#high-score-table");
    highScoreTable.innerHTML = "";
    for (i = 0; i < highScores.length; i++) {
        highScoreObj = highScores[i];
        row = document.createElement("tr");
        cell = document.createElement("td");
        row.className = "table-row";
        cell.textContent = (i + 1) + ". " + highScoreObj.initials + " - " + highScoreObj.score;
        row.appendChild(cell);
        highScoreTable.appendChild(row);
    };
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
mainContentEl.addEventListener("click", clickHandler);
endQuizPageEl.addEventListener("submit", saveHighScore);