var mainContentEl = document.querySelector("#main-content");
var startPageEl = document.querySelector("#start-page");
var quizQuestionEl = document.querySelector("#quiz-question");
var endQuizPageEl = document.querySelector("#end-quiz-page");
var timerEl = document.querySelector("#timer");
var score = 0;

var buttonHandler = function(event) {
    var targetEl = event.target;
    console.log(targetEl);

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
};

var startQuiz = function() {
    console.log("Starting quiz...");
    startPageEl.innerHTML = "";
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
}

var quizQuestionSet = [];

mainContentEl.addEventListener("click", buttonHandler);

