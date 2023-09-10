const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {   // Q1
    question: "JWST stands for ",
    choice1: "James Webb Space Telescope",
    choice2: "John Webb Space Telescope",
    choice3: "Jim Webb Space Telescope",
    choice4: "None",
    answer: 1
  },
  {   // Q2
    question:
      "JWST is launched on ",
    choice1: "20th December 2021",
    choice2: "20th November 2021",
    choice3: "25th December 2021",
    choice4: "25th November 2021",
    answer: 3
  },
  {   // Q3
    question: "It launched from ",
    choice1: "New York",
    choice2: "Texas",
    choice3: "French Guinea ",
    choice4: "Florida",
    answer: 3
  },
  {   // Q4
    question: "Where JWST is placed in space ",
    choice1: "Lagrange 1",
    choice2: "Lagrange 2",
    choice3: "Lagrange 3",
    choice4: "Lagrange 4",
    answer: 2
  },
  {   // Q5
    question: "How many Lagrange points are present in space around the earth.",
    choice1: "5",
    choice2: "4",
    choice3: "3",
    choice4: "2",
    answer: 1
  },
  {   // Q6
    question: "What is the distance of Lagrange point 2 from earth ",
    choice1: "1 million kms",
    choice2: "1.2 million kms",
    choice3: "1.4 million kms",
    choice4: "1.5 million kms",
    answer: 4
  },
  {   // Q7
    question: "How many mirrors are used in JWST ",
    choice1: "18",
    choice2: "16",
    choice3: "14",
    choice4: "12",
    answer: 1
  },
  {   // Q8
    question: "What is the shape of mirrors ",
    choice1: "Square",
    choice2: "Circle",
    choice3: "Pentagon",
    choice4: "Hexagon",
    answer: 4
  },
  {   // Q9
    question: "Time period of mission ",
    choice1: "5 -10 years",
    choice2: "10-15 years",
    choice3: "15-20 years",
    choice4: "25years ",
    answer: 1
  },
  {   // Q10
    question: "How many mirrors are used in JWST ",
    choice1: "18",
    choice2: "16",
    choice3: "14",
    choice4: "12",
    answer: 1
  }
];

//CONSTANTS
const INCORRECT_TAX = 10;
const MAX_QUESTIONS = 10;

// Start Game & Timer
startGame = () => {
  questionCounter = 0;
  score = 100;
  availableQuesions = [...questions];
  getNewQuestion();

  // Timer
  setInterval(function () {
    score--;
    scoreText.innerText = score;

    if (score === 0) {
      localStorage.setItem("mostRecentScore", score);

      //go to the end page
      return window.location.assign("../../assets/html/end.html");
    }
  }, 1000);
};

// Display Next Random Question and Answers
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    //go to the end page
    return window.location.assign("../html/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  // Get Answers
  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

//Get User's Choice
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "incorrect") {
      decrementScore(INCORRECT_TAX);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

//Penalty for wrong choice
decrementScore = num => {
  score -= num;
  scoreText.innerText = score;
};


startGame();
