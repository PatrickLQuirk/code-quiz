var startPageEl = document.querySelector("#start-page");
var quizQuestionEl = document.querySelector("#quiz-question");
var endQuizPageEl = document.querySelector("#end-quiz-page");

var revertToStartingPage = function() {
    console.log("add function to revert to starting page");
};

var buttonHandler = function(event) {
    var targetEl = event.target;
    var targetId = targetEl.getAttribute("id");

    // if the target is the start quiz button, start the quiz
    if (targetId === "start-quiz") {
        startQuiz();
    }
}

var startQuiz = function() {
    console.log("Starting quiz...");
}

mainContentEl.addEventListener("click", buttonHandler);
