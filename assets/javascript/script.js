//constant
var timeLeft =document.querySelector(".time");
var replayEL = document.querySelector("#replay");
var startEl =document.getElementById("start");
var rulesHeader = document.getElementById("rulesHeader");
var rules = document.getElementById("rules");
var initials = document.getElementById("initials");
var submit = document.getElementById("submit");
var replay = document.getElementById("replay");
var correct = document.getElementById("correct");
var incorrect = document.getElementById("incorrect");
var form =document.getElementById("form");
var returnHighScores = document.getElementById ("returnHighScores");
var userScores =document.getElementById ("userScores");
var highScores = document.querySelector(".highScores");
var clear =document.getElementById("clear");

// state variable
var secondsLeft=120
var currentQuestion = 0;
var correctAnswers = 0;
var incorrectAnswers = 0;

//styling for buttons so they do not display initially
replay.style.display = "none";
initials.style.display = "none";
submit.style.display = "none";
highScores.style.display ="none";

//functionality of the clear button
clear.addEventListener("click", function () 
    {localStorage.clear();
    userScores.innerHTML = ""}
    )

    //functionality of the start button
startEl.addEventListener("click", ()=> {
    startEl.style.display = "none";
    rulesHeader.style.display = "none";
    rules.style.display = "none";
    
    
    startQuiz ()
});

//questions, choices and answers for the quiz
var questions = [
    {
        question: "What does boolean include?",
        choices: ["true", "false" ,"more than one of the above", "none of the above"],
        answer: "more than one of the above"
    },
    {  
        question: "Which is not a most common variable type?",
        choices:  [ "string", "number", "boolean", "textNode"],
        answer: "textNode"
    },
    {
        question: "What allows a coder to get an element in an array?",
        choices: ["array", "blocks of code", "index", "for loop"],
        answer: "index"
    },
    //Question help from https://www.sanfoundry.com/1000-javascript-questions-answers/
    {
        question: "Arrays in JavaScript are defined by which of the following?",
        choices: ["an ordered list of values", " an ordered list of objects", "an ordered list of strings", "an ordered list of functions"],
        answer: "an ordered list of values"
    },
    {
        question: "Which of the following can be used to call a JavaScript Code Snippet?",
        choices: ["function", "conjugation", "triggering event", "start"],
        answer: "function"
    },
    {
        question: "Which of the following is not an error in JavaScript?",
        choices: ["missing a bracket", "missing a semicolon", "dividing by zero", "mismatched capitalization"],
        answer: "dividing by zero"
    },
    //help with question from https://www.javatpoint.com/javascript-mcq
    {
        question: "The words function and var are known as?",
        choices:["keywords", "data types", "declaration statements", "prototypes"],
        answer: "declaration statements"
    },
    {
        question: "What does object.values return?",
        choices: ["everything in the object", "the first item in the object","the number of items in an object", "none of the above"],
        answer: "everything in the object"
    },
];

  var timerInterval;

//timer function
  function setTime () {
   timerInterval= setInterval(function(){
        secondsLeft--;
        timeLeft.textContent =secondsLeft + " seconds left";
//signals end of quiz if the time runs out
    if (secondsLeft <=0) {
        clearInterval(timerInterval);
        
        endQuiz()    }
}, 1000)}

//function to display the questions and cycle through the questions
function displayQuestion(question, choices) {
       
    const questionText = document.createTextNode(question)
    
    document.getElementById('question').appendChild(questionText)
    for(let i = 0; i < choices.length; i++) {
       
        const li = document.createElement('button');
        const textNode = document.createTextNode(choices[i])
        li.appendChild(textNode);
        li.addEventListener("click", answerQuestion);
        document.getElementById("answerChoices").appendChild(li)
    }
}

//start quiz function that displays the question and starts the timer
function startQuiz() {
    displayQuestion(questions[currentQuestion].question, questions[currentQuestion].choices);
    setTime()
}

//function to handle answering the question
function answerQuestion(event) {
    //if answer ===true
    var userChoice = event.target.innerText
    console.log(event)
//what to do if the answer is correct
    if(userChoice === questions[currentQuestion].answer) {
        console.log('correct!')
        secondsLeft+=5 
        correctAnswers++
        document.getElementById('question').innerHTML = "";
        document.getElementById('answerChoices').innerHTML = "";
//what to do if the answer if false
    } else {
        console.log('incorrect!')
        // decrease time
        secondsLeft-=15
        incorrectAnswers ++
        document.getElementById('question').innerHTML = "";
         document.getElementById('answerChoices').innerHTML = "";
    }
  
    // increment currentQuestion
    currentQuestion++
    
    // call displayQuestion again provided the questions are not done and the time has not run out
    if (currentQuestion>=questions.length || secondsLeft <= 0) {
        clearInterval(timerInterval);
        timeLeft.textContent =secondsLeft + " seconds left";
        endQuiz();
        window.alert("Quiz Over! Please put your Initials in the box");
    }else{
       displayQuestion(questions[currentQuestion].question, questions[currentQuestion].choices);
    }
}

//end quiz function
function endQuiz() {
    var initials = document.getElementById("initials");
    document.getElementById('question').innerHTML = "";
    document.getElementById('answerChoices').innerHTML = "";

//what happens when you hit the replay button
    replayEL.addEventListener("click", function(){
        currentQuestion=0;
        secondsLeft= 120;
        initials.style.display = "none";
        submit.style.display = "none";
        replay.style.display = "none";
        correct.style.display = "none";
        incorrect.style.display ="none";
        highScores.style.display ="none";
        startQuiz()
    });

    getHighScores()

//styling adding in the initials, submit, replay and high scores
    initials.style.display = "block";
    submit.style.display = "block";
    replay.style.display = "block";
    highScores.style.display ="block";
    correct.style.display = "block";
    incorrect.style.display ="block";
    submit.addEventListener("click", highScore);
    correct.textContent="Correct Answers: " + correctAnswers;
    incorrect.textContent="Incorrect Answers: " + incorrectAnswers;
}

//saving your high scores and displaying the high scores
function highScore() {
    // if localstorage exists, scores will equal existing data, otherwise it's an empty array
    var scores = JSON.parse(localStorage.getItem("userScore")) || [];

    var initials = document.getElementById("initials");
    var userScore = {
        user: initials.value,
        score: secondsLeft,
        correct: correctAnswers, 
        incorrect: incorrectAnswers
    }
    scores.push(userScore)
    localStorage.setItem("userScore", JSON.stringify(scores));
}

//pulling in the high scores
function getHighScores(){
    var scores = JSON.parse(localStorage.getItem("userScore")) || [];
    scores.sort(function(a,b){
        return b.score-a.score;
    })
    console.log(scores);
    for(var i = 0; i < scores.length; i++) {
        console.log(scores[i].user)
        // create li elements
        // add text to li elements
        // append li elements to ol
        const li = document.createElement("li");
        document.getElementById("userScores").appendChild(li)
        li.textContent = "userID: "+ scores[i].user + " Score: " + scores[i].score;
    }
}
