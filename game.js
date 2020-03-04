// DOM query for question and choices
var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("choice-text"));

// counter and score variables
var questionCounterText = document.getElementById("questionCounter");
var scoreText = document.getElementById("score");
// console.log(choices);

// Variables
let currentQuestions = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// Questions Array (questions as objects)
let questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1
    },
    {
        question: "What is the correct syntax for referring to an extenal script called 'xxx.'js?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        choice1: "<msgBox('Hello World');",
        choice2: "<alertBox('Hello World');",
        choice3: "<msg('Hello World');",
        choice4: "<alert('Hello World');",
        answer: 4
    }
];

// Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    // spread operator
    availableQuestions = [...questions];
    // console.log(availableQuestions);
    getNewQuestion();
};

// New Question Function
getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    //go to the end page
    return window.location.assign("/end.html");
    }  
    questionCounter++;
    // dynamic question counter text
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;

    var questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    // For each data-number property
    choices.forEach( choice => {
        var number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    // Splice for quesiton index
    availableQuestions.splice(questionIndex, 1);
    // Allow users to answer after loaded
    acceptingAnswers = true;
};

// onclick event for choices
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        // console.log(e.target);

        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        var selectedChoice = e.target;
        var selectedAnswer = selectedChoice.dataset["number"];

        // Apply class to answer
        var classToApply = "incorrect";
            if (selectedAnswer == currentQuestion.answer) {
                classToApply = "correct";
            }
            // console.log(classToApply);

            // call score bonus function
            if(classToApply === "correct") {
                incrementScore(CORRECT_BONUS);
            }        // console.log(selectedAnswer == currentQuestions.answer);

        // add and remove colors for correct and incorrect answers
        selectedChoice.parentElement.classList.add(classToApply);
        
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);

    });
});

// score function
incrementScore = num => {
    score+= num;
    scoreText.innerText = score;
}

 

// Start Game Function
startGame();