/* =========================================================
   ANIMAL ADVENTURE
   10 LEVELS
   10 QUESTIONS PER LEVEL
========================================================= */


/* =========================================================
   GAME SETTINGS
========================================================= */

const TOTAL_LEVELS = 10;
const QUESTIONS_PER_LEVEL = 10;
const PASSING_SCORE = 80;


/* =========================================================
   AUDIO SETTINGS
========================================================= */

let audioMuted = false;

let backgroundMusic = null;


/* =========================================================
   GAME STATE
========================================================= */

let currentLevel = 1;
let currentQuestionIndex = 0;
let currentScore = 0;

let currentQuestions = [];

let answerLocked = false;


/* =========================================================
   DOM ELEMENTS
========================================================= */

let soundButton;

let levelIndicator;
let questionIndicator;
let scoreIndicator;

let animalImage;
let questionText;
let answerContainer;
let feedback;

let resultModal;
let resultStars;
let resultTitle;
let resultMessage;
let resultScore;
let resultButtons;


/* =========================================================
   ANIMAL DATABASE
========================================================= */

/*
 * IMPORTANT:
 *
 * Level 1, 2 and 3 use DIFFERENT animals.
 * Level 4, 5 and 6 use DIFFERENT animals.
 * Level 7, 8 and 9 use DIFFERENT animals.
 *
 * All images use:
 *
 * assets/animals/
 *
 * Missing images are intentionally allowed to show
 * as broken images until the actual files are added.
 */


/* =========================================================
   LAND ANIMALS
========================================================= */

const landLevel1 = [

  {
    name: "Cat",
    image: "assets/animals/cat.png"
  },

  {
    name: "Dog",
    image: "assets/animals/dog.png"
  },

  {
    name: "Elephant",
    image: "assets/animals/elephant.png"
  },

  {
    name: "Lion",
    image: "assets/animals/lion.png"
  },

  {
    name: "Monkey",
    image: "assets/animals/monkey.png"
  },

  {
    name: "Rabbit",
    image: "assets/animals/rabbit.png"
  },

  {
    name: "Tiger",
    image: "assets/animals/tiger.png"
  },

  {
    name: "Bear",
    image: "assets/animals/bear.png"
  },

  {
    name: "Giraffe",
    image: "assets/animals/giraffe.png"
  },

  {
    name: "Zebra",
    image: "assets/animals/zebra.png"
  }

];


const landLevel2 = [

  {
    name: "Kangaroo",
    image: "assets/animals/kangaroo.png"
  },

  {
    name: "Panda",
    image: "assets/animals/panda.png"
  },

  {
    name: "Horse",
    image: "assets/animals/horse.png"
  },

  {
    name: "Cow",
    image: "assets/animals/cow.png"
  },

  {
    name: "Sheep",
    image: "assets/animals/sheep.png"
  },

  {
    name: "Pig",
    image: "assets/animals/pig.png"
  },

  {
    name: "Fox",
    image: "assets/animals/fox.png"
  },

  {
    name: "Deer",
    image: "assets/animals/deer.png"
  },

  {
    name: "Camel",
    image: "assets/animals/camel.png"
  },

  {
    name: "Rhinoceros",
    image: "assets/animals/rhinoceros.png"
  }

];


const landLevel3 = [

  {
    name: "Hippopotamus",
    image: "assets/animals/hippopotamus.png"
  },

  {
    name: "Goat",
    image: "assets/animals/goat.png"
  },

  {
    name: "Koala",
    image: "assets/animals/koala.png"
  },

  {
    name: "Cheetah",
    image: "assets/animals/cheetah.png"
  },

  {
    name: "Wolf",
    image: "assets/animals/wolf.png"
  },

  {
    name: "Leopard",
    image: "assets/animals/leopard.png"
  },

  {
    name: "Gorilla",
    image: "assets/animals/gorilla.png"
  },

  {
    name: "Buffalo",
    image: "assets/animals/buffalo.png"
  },

  {
    name: "Donkey",
    image: "assets/animals/donkey.png"
  },

  {
    name: "Squirrel",
    image: "assets/animals/squirrel.png"
  }

];


/* =========================================================
   AIR ANIMALS
========================================================= */

/* =========================================================
   AIR ANIMALS
========================================================= */

const airLevel4 = [

  {
    name: "Owl",
    image: "assets/animals/owl.png"
  },

  {
    name: "Eagle",
    image: "assets/animals/eagle.png"
  },

  {
    name: "Parrot",
    image: "assets/animals/parrot.png"
  },

  {
    name: "Flamingo",
    image: "assets/animals/flamingo.png"
  },

  {
    name: "Peacock",
    image: "assets/animals/peacock.png"
  },

  {
    name: "Penguin",
    image: "assets/animals/penguin.png"
  },

  {
    name: "Bat",
    image: "assets/animals/bat.png"
  },

  {
    name: "Toucan",
    image: "assets/animals/toucan.png"
  },

  {
    name: "Hummingbird",
    image: "assets/animals/hummingbird.png"
  },

  {
    name: "Woodpecker",
    image: "assets/animals/woodpecker.png"
  }

];


const airLevel5 = [

  {
    name: "Canary",
    image: "assets/animals/canary.png"
  },

  {
    name: "Swan",
    image: "assets/animals/swan.png"
  },

  {
    name: "Duck",
    image: "assets/animals/duck.png"
  },

  {
    name: "Goose",
    image: "assets/animals/goose.png"
  },

  {
    name: "Pigeon",
    image: "assets/animals/pigeon.png"
  },

  {
    name: "Seagull",
    image: "assets/animals/seagull.png"
  },

  {
    name: "Pelican",
    image: "assets/animals/pelican.png"
  },

  {
    name: "Kingfisher",
    image: "assets/animals/kingfisher.png"
  },

  {
    name: "Macaw",
    image: "assets/animals/macaw.png"
  },

  {
    name: "Hornbill",
    image: "assets/animals/hornbill.png"
  }

];


const airLevel6 = [

  {
    name: "Butterfly",
    image: "assets/animals/butterfly.png"
  },

  {
    name: "Bee",
    image: "assets/animals/bee.png"
  },

  {
    name: "Dragonfly",
    image: "assets/animals/dragonfly.png"
  },

  {
    name: "Ladybug",
    image: "assets/animals/ladybug.png"
  },

  {
    name: "Hawk",
    image: "assets/animals/hawk.png"
  },

  {
    name: "Falcon",
    image: "assets/animals/falcon.png"
  },

  {
    name: "Crow",
    image: "assets/animals/crow.png"
  },

  {
    name: "Stork",
    image: "assets/animals/stork.png"
  },

  {
    name: "Crane",
    image: "assets/animals/crane.png"
  },

  {
    name: "Robin",
    image: "assets/animals/robin.png"
  }

];


/* =========================================================
   SEA ANIMALS
========================================================= */

const seaLevel7 = [

  {
    name: "Dolphin",
    image: "assets/animals/dolphin.png"
  },

  {
    name: "Shark",
    image: "assets/animals/shark.png"
  },

  {
    name: "Whale",
    image: "assets/animals/whale.png"
  },

  {
    name: "Octopus",
    image: "assets/animals/octopus.png"
  },

  {
    name: "Crab",
    image: "assets/animals/crab.png"
  },

  {
    name: "Sea Turtle",
    image: "assets/animals/sea-turtle.png"
  },

  {
    name: "Jellyfish",
    image: "assets/animals/jellyfish.png"
  },

  {
    name: "Lobster",
    image: "assets/animals/lobster.png"
  },

  {
    name: "Seahorse",
    image: "assets/animals/seahorse.png"
  },

  {
    name: "Starfish",
    image: "assets/animals/starfish.png"
  }

];


const seaLevel8 = [

  {
    name: "Seal",
    image: "assets/animals/seal.png"
  },

  {
    name: "Walrus",
    image: "assets/animals/walrus.png"
  },

  {
    name: "Stingray",
    image: "assets/animals/stingray.png"
  },

  {
    name: "Clownfish",
    image: "assets/animals/clownfish.png"
  },

  {
    name: "Squid",
    image: "assets/animals/squid.png"
  },

  {
    name: "Eel",
    image: "assets/animals/eel.png"
  },

  {
    name: "Otter",
    image: "assets/animals/otter.png"
  },

  {
    name: "Swordfish",
    image: "assets/animals/swordfish.png"
  },

  {
    name: "Angelfish",
    image: "assets/animals/angelfish.png"
  },

  {
    name: "Pufferfish",
    image: "assets/animals/pufferfish.png"
  }

];


const seaLevel9 = [

  {
    name: "Manta Ray",
    image: "assets/animals/manta-ray.png"
  },

  {
    name: "Barracuda",
    image: "assets/animals/barracuda.png"
  },

  {
    name: "Moray Eel",
    image: "assets/animals/moray-eel.png"
  },

  {
    name: "Marlin",
    image: "assets/animals/marlin.png"
  },

  {
    name: "Tuna",
    image: "assets/animals/tuna.png"
  },

  {
    name: "Salmon",
    image: "assets/animals/salmon.png"
  },

  {
    name: "Anchovy",
    image: "assets/animals/anchovy.png"
  },

  {
    name: "Grouper",
    image: "assets/animals/grouper.png"
  },

  {
    name: "Coral",
    image: "assets/animals/coral.png"
  },

  {
    name: "Sea Urchin",
    image: "assets/animals/sea-urchin.png"
  }

];


/* =========================================================
   LEVEL DATABASE
========================================================= */

const levelData = {

  1: {
    category: "Land Animals",
    animals: landLevel1
  },

  2: {
    category: "Land Animals",
    animals: landLevel2
  },

  3: {
    category: "Land Animals",
    animals: landLevel3
  },

  4: {
    category: "Air Animals",
    animals: airLevel4
  },

  5: {
    category: "Air Animals",
    animals: airLevel5
  },

  6: {
    category: "Air Animals",
    animals: airLevel6
  },

  7: {
    category: "Sea Animals",
    animals: seaLevel7
  },

  8: {
    category: "Sea Animals",
    animals: seaLevel8
  },

  9: {
    category: "Sea Animals",
    animals: seaLevel9
  },

  10: {
    category: "Mixed Animals",
    animals: null
  }

};


/* =========================================================
   BUILD MIXED ANIMAL DATABASE
========================================================= */

const allAnimals = [

  ...landLevel1,
  ...landLevel2,
  ...landLevel3,

  ...airLevel4,
  ...airLevel5,
  ...airLevel6,

  ...seaLevel7,
  ...seaLevel8,
  ...seaLevel9

];


/* =========================================================
   INITIALIZE DOM
========================================================= */

function initializeDOM() {

  soundButton =
    document.getElementById("soundButton");

  levelIndicator =
    document.getElementById("levelIndicator");

  questionIndicator =
    document.getElementById("questionIndicator");

  scoreIndicator =
    document.getElementById("scoreIndicator");

  animalImage =
    document.getElementById("animalImage");

  questionText =
    document.getElementById("questionText");

  answerContainer =
    document.getElementById("answerContainer");

  feedback =
    document.getElementById("feedback");

  resultModal =
    document.getElementById("resultModal");

  resultStars =
    document.getElementById("resultStars");

  resultTitle =
    document.getElementById("resultTitle");

  resultMessage =
    document.getElementById("resultMessage");

  resultScore =
    document.getElementById("resultScore");

  resultButtons =
    document.getElementById("resultButtons");


  /*
   * Background music is optional.
   * If it exists in HTML, we use it.
   */

  backgroundMusic =
    document.getElementById("backgroundMusic");

}


/* =========================================================
   SHUFFLE
========================================================= */

function shuffleArray(array) {

  const shuffled =
    [...array];

  for (
    let i = shuffled.length - 1;
    i > 0;
    i--
  ) {

    const j =
      Math.floor(
        Math.random() * (i + 1)
      );

    [
      shuffled[i],
      shuffled[j]
    ] = [
      shuffled[j],
      shuffled[i]
    ];

  }

  return shuffled;

}


/* =========================================================
   GET RANDOM QUESTIONS
========================================================= */

function getQuestionsForLevel(level) {

  let sourceAnimals;


  /*
   * Level 10 uses all animals.
   */

  if (level === 10) {

    sourceAnimals =
      allAnimals;

  } else {

    sourceAnimals =
      levelData[level].animals;

  }


  /*
   * Every level already contains exactly
   * 10 animals.
   *
   * Shuffle them so the order changes
   * every time the level starts.
   */

  return shuffleArray(
    sourceAnimals
  ).slice(
    0,
    QUESTIONS_PER_LEVEL
  );

}


/* =========================================================
   START LEVEL
========================================================= */

function startLevel(level) {

  if (
    level < 1 ||
    level > TOTAL_LEVELS
  ) {
    return;
  }


  currentLevel =
    level;

  currentQuestionIndex =
    0;

  currentScore =
    0;

  answerLocked =
    false;


  currentQuestions =
    getQuestionsForLevel(
      currentLevel
    );


  hideResultModal();

  updateLevelUI();

  showQuestion();

}


/* =========================================================
   UPDATE LEVEL UI
========================================================= */

function updateLevelUI() {

  const level =
    levelData[currentLevel];


  if (levelIndicator) {

    levelIndicator.textContent =
      `Level ${currentLevel}: ${level.category}`;

  }


  if (questionIndicator) {

    questionIndicator.textContent =
      `Question ${currentQuestionIndex + 1}/${QUESTIONS_PER_LEVEL}`;

  }


  if (scoreIndicator) {

    scoreIndicator.textContent =
      `Score: ${currentScore}`;

  }

}


/* =========================================================
   SHOW QUESTION
========================================================= */

function showQuestion() {

  if (
    currentQuestionIndex >=
    currentQuestions.length
  ) {

    finishLevel();

    return;

  }


  answerLocked =
    false;


  const question =
    currentQuestions[
      currentQuestionIndex
    ];


  /*
   * IMPORTANT:
   *
   * We intentionally set the image
   * even if the file does not exist.
   *
   * This allows the browser to show
   * a broken image until the real
   * PNG is added.
   */

  animalImage.src =
    question.image;

  animalImage.alt =
    question.name;


  questionText.textContent =
    "What animal is this?";


  /*
   * Speak ONLY the question.
   *
   * Do NOT speak the animal name here,
   * otherwise the answer would be revealed.
   */

  speak(
    "What animal is this?"
  );


  feedback.textContent =
    "";


  updateLevelUI();

  createAnswerButtons(
    question
  );

}


/* =========================================================
   CREATE ANSWER BUTTONS
========================================================= */

function createAnswerButtons(
  correctQuestion
) {

  answerContainer.innerHTML =
    "";


  /*
   * Create one correct answer
   * and three random wrong answers.
   */

  const wrongAnswers =
    shuffleArray(

      allAnimals.filter(
        function (animal) {

          return (
            animal.name !==
            correctQuestion.name
          );

        }
      )

    )
      .slice(0, 3)
      .map(
        function (animal) {

          return animal.name;

        }
      );


  const answers =
    shuffleArray([

      correctQuestion.name,
      ...wrongAnswers

    ]);


  answers.forEach(
    function (answer) {

      const button =
        document.createElement(
          "button"
        );


      button.type =
        "button";

      button.className =
        "answer-button";

      button.textContent =
        answer;


      button.addEventListener(
        "click",
        function () {

          handleAnswer(
            answer,
            correctQuestion.name,
            button
          );

        }
      );


      answerContainer.appendChild(
        button
      );

    }
  );

}


/* =========================================================
   HANDLE ANSWER
========================================================= */

function handleAnswer(
  selectedAnswer,
  correctAnswer,
  selectedButton
) {

  /*
   * Prevent double clicks.
   */

  if (answerLocked) {
    return;
  }


  answerLocked =
    true;


  const buttons =
    answerContainer.querySelectorAll(
      ".answer-button"
    );


  buttons.forEach(
    function (button) {

      button.disabled =
        true;

    }
  );


  /*
   * CORRECT
   */

  if (
    selectedAnswer ===
    correctAnswer
  ) {

    currentScore++;


    if (selectedButton) {

      selectedButton.classList.add(
        "correct"
      );

    }


    const praise =
      getPositiveFeedback();


    showFeedback(
      praise
    );


    speak(
      praise
    );


  }

  /*
   * WRONG
   */

  else {

    if (selectedButton) {

      selectedButton.classList.add(
        "wrong"
      );

    }


    const encouragement =
      getWrongFeedback();


    showFeedback(
      encouragement
    );


    speak(
      encouragement
    );

  }


  updateLevelUI();


  /*
   * Every question is only answered once.
   *
   * Correct or wrong,
   * move to the next question.
   */

  setTimeout(
    function () {

      currentQuestionIndex++;

      showQuestion();

    },
    1000
  );

}


/* =========================================================
   FEEDBACK
========================================================= */

function showFeedback(
  message
) {

  feedback.textContent =
    message;

}


/* =========================================================
   POSITIVE FEEDBACK
========================================================= */

function getPositiveFeedback() {

  const messages = [

    "Good job!",

    "Great!",

    "Well done!",

    "Excellent!",

    "Amazing!"

  ];


  return messages[
    Math.floor(
      Math.random() *
      messages.length
    )
  ];

}


/* =========================================================
   WRONG FEEDBACK
========================================================= */

function getWrongFeedback() {

  const messages = [

    "Try again next time!",

    "Keep learning!",

    "Good try!",

    "You can do it!",

    "Keep going!"

  ];


  return messages[
    Math.floor(
      Math.random() *
      messages.length
    )
  ];

}


/* =========================================================
   TEXT TO SPEECH
========================================================= */

function speak(
  text
) {

  if (audioMuted) {
    return;
  }


  if (
    !(
      "speechSynthesis"
      in window
    )
  ) {

    return;

  }


  window.speechSynthesis.cancel();


  const utterance =
    new SpeechSynthesisUtterance(
      text
    );


  utterance.lang =
    "en-US";

  utterance.rate =
    0.75;

  utterance.pitch =
    1.1;

  utterance.volume =
    1;


  window.speechSynthesis.speak(
    utterance
  );

}


/* =========================================================
   FINISH LEVEL
========================================================= */

function finishLevel() {

  answerLocked =
    true;


  const percentage =
    Math.round(
      (
        currentScore /
        QUESTIONS_PER_LEVEL
      ) * 100
    );


  showResultModal(
    percentage
  );

}


/* =========================================================
   RESULT STARS
========================================================= */

function calculateStars(
  percentage
) {

  if (percentage >= 90) {

    return 3;

  }


  if (percentage >= 80) {

    return 2;

  }


  return 1;

}


/* =========================================================
   SHOW RESULT MODAL
========================================================= */

function showResultModal(
  percentage
) {

  const stars =
    calculateStars(
      percentage
    );


  resultStars.textContent =
    "⭐".repeat(stars);


  const passed =
    percentage >=
    PASSING_SCORE;


  if (passed) {

    resultTitle.textContent =
      "Awesome Job!";

    resultMessage.textContent =
      `You Passed Level ${currentLevel}!`;

  } else {

    resultTitle.textContent =
      "Good Try!";

    resultMessage.textContent =
      `You need ${PASSING_SCORE}% to unlock the next level.`;

  }


  resultScore.textContent =
    `Score: ${currentScore}/${QUESTIONS_PER_LEVEL} (${percentage}%)`;


  createResultButtons(
    passed
  );


  resultModal.classList.remove(
    "hidden"
  );

}


/* =========================================================
   CREATE RESULT BUTTONS
========================================================= */

function createResultButtons(
  levelPassed
) {

  resultButtons.innerHTML =
    "";


  /*
   * PREVIOUS LEVEL
   */

  if (
    currentLevel > 1
  ) {

    const previousButton =
      createResultButton(
        "Previous Level",
        "previous-level-button"
      );


    previousButton.addEventListener(
      "click",
      function () {

        startLevel(
          currentLevel - 1
        );

      }
    );


    resultButtons.appendChild(
      previousButton
    );

  }


  /*
   * PLAY AGAIN
   */

  const playAgainButton =
    createResultButton(
      "Play Again",
      "play-again-button"
    );


  playAgainButton.addEventListener(
    "click",
    function () {

      startLevel(
        currentLevel
      );

    }
  );


  resultButtons.appendChild(
    playAgainButton
  );


  /*
   * NEXT LEVEL
   */

  const nextButton =
    createResultButton(
      currentLevel === TOTAL_LEVELS
        ? "Play From Level 1"
        : "Next Level",
      "next-level-button"
    );


  /*
   * Player must score at least 80%.
   */

  if (!levelPassed) {

    nextButton.disabled =
      true;

    nextButton.classList.add(
      "disabled"
    );

  }


  nextButton.addEventListener(
    "click",
    function () {

      /*
       * Safety check.
       */

      if (!levelPassed) {
        return;
      }


      /*
       * Level 10:
       * return to Level 1.
       */

      if (
        currentLevel ===
        TOTAL_LEVELS
      ) {

        startLevel(1);

      } else {

        startLevel(
          currentLevel + 1
        );

      }

    }
  );


  resultButtons.appendChild(
    nextButton
  );

}


/* =========================================================
   CREATE RESULT BUTTON
========================================================= */

function createResultButton(
  text,
  className
) {

  const button =
    document.createElement(
      "button"
    );


  button.type =
    "button";

  button.className =
    `result-button ${className}`;

  button.textContent =
    text;


  return button;

}


/* =========================================================
   HIDE RESULT MODAL
========================================================= */

function hideResultModal() {

  if (!resultModal) {
    return;
  }


  resultModal.classList.add(
    "hidden"
  );

}


/* =========================================================
   SOUND BUTTON
========================================================= */

function updateSoundButton() {

  if (!soundButton) {
    return;
  }


  if (audioMuted) {

    soundButton.textContent =
      "🔇";

    soundButton.setAttribute(
      "aria-label",
      "Unmute audio"
    );

    soundButton.setAttribute(
      "aria-pressed",
      "true"
    );

  } else {

    soundButton.textContent =
      "🔊";

    soundButton.setAttribute(
      "aria-label",
      "Mute audio"
    );

    soundButton.setAttribute(
      "aria-pressed",
      "false"
    );

  }

}


/* =========================================================
   TOGGLE AUDIO
========================================================= */

function toggleAudio() {

  audioMuted =
    !audioMuted;


  updateSoundButton();


  if (audioMuted) {

    /*
     * Stop speech.
     */

    if (
      "speechSynthesis"
      in window
    ) {

      window.speechSynthesis.cancel();

    }


    /*
     * Stop background music.
     */

    if (backgroundMusic) {

      backgroundMusic.pause();

    }

  } else {

    /*
     * Resume background music.
     */

    startBackgroundMusic();


    /*
     * Repeat current question.
     */

    speak(
      "What animal is this?"
    );

  }

}


/* =========================================================
   BACKGROUND MUSIC
========================================================= */

function startBackgroundMusic() {

  if (audioMuted) {
    return;
  }


  if (!backgroundMusic) {
    return;
  }


  /*
   * Keep background music quiet
   * so it does not cover speech.
   */

  backgroundMusic.volume =
    0.25;


  const playPromise =
    backgroundMusic.play();


  if (
    playPromise !== undefined
  ) {

    playPromise.catch(
      function () {

        /*
         * Browser may block autoplay.
         * Music will start after user interaction.
         */

      }
    );

  }

}


/* =========================================================
   EVENT LISTENERS
========================================================= */

function attachEventListeners() {

  if (soundButton) {

    soundButton.addEventListener(
      "click",
      function (event) {

        event.stopPropagation();

        toggleAudio();

      }
    );

  }


  /*
   * Browser autoplay protection.
   *
   * Start music after first interaction.
   */

  document.addEventListener(
    "click",
    function startMusicOnce() {

      if (!audioMuted) {

        startBackgroundMusic();

      }


      document.removeEventListener(
        "click",
        startMusicOnce
      );

    }
  );

}


/* =========================================================
   INITIALIZE GAME
========================================================= */

function initializeGame() {

  initializeDOM();

  updateSoundButton();

  attachEventListeners();

  startLevel(1);

}


/* =========================================================
   START GAME
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  initializeGame
);