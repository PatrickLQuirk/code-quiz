var mainContentEl = document.querySelector("#main-content");
var startPageEl = document.querySelector("#start-page");
var quizQuestionEl = document.querySelector("#quiz-question");
var endQuizPageEl = document.querySelector("#end-quiz-page");

var buttonHandler = function(event) {
    var targetEl = event.target;
    console.log(targetEl);

    // if the target is the start quiz button, start the quiz
    if (targetEl.matches(".start-quiz-button")) {
        startQuiz();
    }
    else if (targetEl.matches(".temp-quiz-button")) {
        // this condition is here only for testing
        // a different condition will trigger the reversion to start page later
        revertToStartingPage();
    }
}


var revertToStartingPage = function() {
    console.log("reverting to the start page");
    // remove any content from quizQuestionEl
    quizQuestionEl.innerHTML = "";
    quizQuestionEl.dataset.state = "hidden";
    // remove any content from endQuizPageEl
    endQuizPageEl.innerHTML = "";
    endQuizPageEl.dataset.state = "hidden";

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
    startPageEl.dataset.state = "visible";
};

var startQuiz = function() {
    console.log("Starting quiz...");

    startPageEl.innerHTML = "";
    startPageEl.dataset.state = "hidden";

    // this quiz button is temporary and is only here for testing the reversion to the starting page
    var tempQuizButton = document.createElement("button");
    tempQuizButton.className = "main-button temp-quiz-button";
    tempQuizButton.textContent = "End Quiz";
    quizQuestionEl.appendChild(tempQuizButton);
    quizQuestionEl.dataset.state = "visible";
}

mainContentEl.addEventListener("click", buttonHandler);

