
/* =========================================================
   KIDS LEARNING WORLD
   HOME SCREEN
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const soundButton = document.getElementById("soundButton");
const soundIcon = document.getElementById("soundIcon");

const exitButton = document.getElementById("exitButton");

const animalAdventureButton =
  document.getElementById("animalAdventureButton");

const abcAdventureButton =
  document.getElementById("abcAdventureButton");

const numberAdventureButton =
  document.getElementById("numberAdventureButton");

const colorAdventureButton =
  document.getElementById("colorAdventureButton");

const backgroundMusic =
  document.getElementById("backgroundMusic");


/* =========================================================
   SOUND STATE
========================================================= */

let soundEnabled = true;


/* =========================================================
   SOUND BUTTON
========================================================= */

soundButton.addEventListener("click", () => {

  soundEnabled = !soundEnabled;

  if (backgroundMusic) {

    backgroundMusic.muted = !soundEnabled;

  }


  if (soundEnabled) {

    soundIcon.textContent = "🔊";

    soundButton.setAttribute(
      "aria-pressed",
      "false"
    );

  } else {

    soundIcon.textContent = "🔇";

    soundButton.setAttribute(
      "aria-pressed",
      "true"
    );

  }

});


/* =========================================================
   START BACKGROUND MUSIC
========================================================= */

function startBackgroundMusic() {

  if (!backgroundMusic || !soundEnabled) {
    return;
  }


  backgroundMusic.volume = 0.35;


  const playPromise =
    backgroundMusic.play();


  if (playPromise !== undefined) {

    playPromise.catch(() => {

      /*
        Modern browsers may block
        autoplay until the user interacts
        with the page.
      */

    });

  }

}


/*
  Try to start music after the first
  user interaction.
*/

document.addEventListener(
  "click",
  startBackgroundMusic,
  { once: true }
);


/* =========================================================
   ANIMAL ADVENTURE
========================================================= */

animalAdventureButton.addEventListener(
  "click",
  () => {

    window.location.href = "game.html";

  }
);


/* =========================================================
   FUTURE GAMES
========================================================= */

abcAdventureButton.addEventListener(
  "click",
  () => {

    showComingSoon("ABC Adventure");

  }
);


numberAdventureButton.addEventListener(
  "click",
  () => {

    showComingSoon("Number Adventure");

  }
);


colorAdventureButton.addEventListener(
  "click",
  () => {

    showComingSoon("Color Adventure");

  }
);


/* =========================================================
   COMING SOON
========================================================= */

function showComingSoon(gameName) {

  alert(
    `${gameName} is coming soon!`
  );

}


/* =========================================================
   EXIT
========================================================= */

exitButton.addEventListener(
  "click",
  () => {

    /*
      Browsers usually block scripts
      from closing tabs that were not
      opened by JavaScript.

      We therefore try to close the
      window and provide a fallback.
    */

    window.close();

  }
);


/* =========================================================
   INITIALIZATION
========================================================= */

console.log(
  "Kids Learning World Home Screen loaded."
);
