
var questions = [
    {
      question: "Q: Which of the following is not a CSS box model property?",
      answers: [
        { text: "margin", correct: false },
        { text: "padding", correct: false },
        { text: "border-radius", correct: false },
        { text: "border-collapse", correct: true }
      ]
    },
    {
      question: "Q: Which of the following is not a valid way to declare a function in JavaScript?",
      answers: [
        { text: "function myFunction(){}", correct: false },
        { text: "let myFunction = function(){}", correct: false },
        { text: "myFunction: function(){}", correct: true },
        { text: "var myFunction = () => {}", correct: false }
      ]
    },
    {
      question: "Q: Which of the following is not a JavaScript data type?",
      answers: [
        { text: "string", correct: false },
        { text: "boolean", correct: false },
        { text: "object", correct: false },
        { text: "float", correct: true }
      ]
    },
    {
      question: "Q: What is the purpose of the this keyword in JavaScript?",
      answers: [
        { text: "It refers to the current function.", correct: false },
        { text: "It refers to the current object.", correct: true },
        { text: "It refers to the current array.", correct: false },
        { text: "It refers to the current variable.", correct: false }
      ]
    }
  ];
  
  var currentQuestionIndex = 0;
  var userScore = 0;
  
  var startButtonEl = document.querySelector(".start-btn");
  var welcomeScreenEl = document.querySelector(".welcome-screen");
  var quizScreenEl = document.querySelector(".quiz-screen");
  var questionEl = document.querySelector(".question");
  var answersButtons = document.querySelector(".answers-container");
  var nextButtonEl = document.querySelector(".next-btn");
  
  startButtonEl.addEventListener("click", startQuiz);
  
  function startQuiz() {
    welcomeScreenEl.style.display = "none";
    quizScreenEl.style.display = "flex";
    currentQuestionIndex = 0;
    userScore = 0;
    nextButtonEl.innerHTML = "Next";
    nextButtonEl.style.display = "none";
    displayQuestion();
  }
  
  function displayQuestion() {
    resetContainer();
    questionEl.textContent = questions[currentQuestionIndex].question;
    for (var i = 0; i < questions[currentQuestionIndex].answers.length; i++) {
      var answer = questions[currentQuestionIndex].answers[i];
      var buttonEl = document.createElement("button");
      buttonEl.innerHTML = answer.text;
      buttonEl.classList.add("ans-btn");
      answersButtons.appendChild(buttonEl);
  
      if (answer.correct) {
        buttonEl.dataset.correctAns = "true";
      }
  
      buttonEl.addEventListener("click", checkAnswer);
    }
  }
  
  function checkAnswer(e) {
    var selectedButton = e.target;
    if (selectedButton.dataset.correctAns === "true") {
      userScore++;
      selectedButton.classList.add("correct-ans");
    } else {
      selectedButton.classList.add("wrong-ans");
    }
  
    var buttons = answersButtons.children;
    for (var i = 0; i < buttons.length; i++) {
      var button = buttons[i];
      if (button.dataset.correctAns === "true") {
        button.classList.add("correct-ans");
      }
      button.disabled = true;
    }
    nextButtonEl.style.display = "block";
  }
  
  function displayResult() {
    resetContainer();
    questionEl.innerHTML =
      "Quiz Completed! <br> Your Score: <span class='score'>" +
      userScore +
      "/" +
      questions.length +
      "</span>";
    nextButtonEl.innerHTML = "Restart Quiz";
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
      nextButtonEl.style.display = "none";
    } else {
      displayResult();
    }
  }
  
  nextButtonEl.addEventListener("click", function () {
    if (currentQuestionIndex < questions.length) {
      nextQuestion();
    } else {
      startQuiz();
    }
  });
  
  function resetContainer() {
    questionEl.textContent = "";
    answersButtons.innerHTML = "";
  }
  