var mainContentEl = document.querySelector("#main-content");
var startPageEl = document.querySelector("#start-page");
var quizQuestionEl = document.querySelector("#quiz-question");
var endQuizPageEl = document.querySelector("#end-quiz-page");
var timerEl = document.querySelector("#timer");
var score = 0;

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
    // remove any content from quizQuestionEl
    quizQuestionEl.innerHTML = "";
    // remove any content from endQuizPageEl
    endQuizPageEl.innerHTML = "";
    
    // reset the startPageEl innerHTML to what it was originally
    var startQuizHeadingEl = document.createElement("h1");
    startQuizHeadingEl.textContent = "Coding Quiz Challenge";
    startPageEl.appendChild(startQuizHeadingEl);

    var startQuizInstructions1El = document.createElement("p");
    startQuizInstructions1El.textContent = "Try to answer the following code-related questions within the time limit.";
    startPageEl.appendChild(startQuizInstructions1El);
    var startQuizInstructions2El = document.createElement("p");
    startQuizInstructions2El.textContent = "Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    startPageEl.appendChild(startQuizInstructions2El);
    
    var startQuizButtonEl = document.createElement("button");
    startQuizButtonEl.textContent = "Start Quiz";
    startQuizButtonEl.className = "main-button start-quiz-button";
    startPageEl.appendChild(startQuizButtonEl);

    // add code to revert the timer back to saying zero
};

var startQuiz = function() {
    console.log("Starting quiz...");
    startPageEl.innerHTML = "";

    // create the HTML elements for the quiz questions
    var questionPromptEl = document.createElement("h1");
    questionPromptEl.className = "question-prompt";
    quizQuestionEl.appendChild(questionPromptEl);
    var questionButtonDivEl = document.createElement("div");
    questionButtonDivEl.className = "quiz-choices-div";
    for (i = 0; i < 4; i++) {
        var questionButtonEl = document.createElement("button");
        questionButtonEl.className = "main-button";
        questionButtonEl.setAttribute("data-button-id", i);
        questionButtonDivEl.appendChild(questionButtonEl);
    };
    quizQuestionEl.appendChild(questionButtonDivEl);
    var correctWrongEl = document.createElement("h2");
    correctWrongEl.className = "correct-wrong-info";
    quizQuestionEl.appendChild(correctWrongEl);

    runQuiz();
}

var runQuiz = function() {
    console.log("running quiz");
    var timeLeft = 75;
    var timeInterval = setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            timerEl.textContent = "Time: 0";
            console.log("Ending quiz because time ran out");
            // change next line to go to a function for handling the end of the quiz
            revertToStartingPage();
        } else {
            timerEl.textContent = "Time: " + timeLeft;
            timeLeft = timeLeft - 1;
        }
    }, 1000);
    questionIndex = 0;
    var questionPromptEl = document.querySelector(".question-prompt");
    constructQuizQuestion(questionIndex, questionPromptEl);
    // add an event listener to handle the answer choice clicks
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
                correctIncorrectMessage(false);
            }
            questionIndex = questionIndex + 1
            if (questionIndex >= quizQuestionSet.length) {
                console.log("Ran out of questions.");
                clearInterval(timeInterval);
                // change to a function for the end screen
                revertToStartingPage();
            }
            else {
                constructQuizQuestion(questionIndex, questionPromptEl);
            }
        }
    });
}

var constructQuizQuestion = function(questionIndex, questionPromptEl) {
    var question = quizQuestionSet[questionIndex];
    questionPromptEl.textContent = question.prompt;
    for (i = 0; i < question.choices.length; i++) {
        var choiceButtonEl = document.querySelector(".main-button[data-button-id='" + i + "']");
        choiceButtonEl.textContent = (i + 1) + ". " + question.choices[i];
    };
}

var correctIncorrectMessage = function(isCorrect) {
    var correctWrongEl = document.querySelector(".correct-wrong-info");
    if (isCorrect) {
        correctWrongEl.textContent = "Correct!";
    } else {
        correctWrongEl.textContent = "Wrong!";
    };
    correctWrongEl.style.display = "block";
    setTimeout(function() {
        correctWrongEl.style.display = "none";
    }, 1000);
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

