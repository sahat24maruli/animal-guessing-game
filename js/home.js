/* =========================================================
   KIDS LEARNING WORLD
   HOME SCREEN
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const animalAdventureButton =
    document.getElementById("animalAdventureButton");

  const soundButton =
    document.getElementById("soundButton");

  const exitButton =
    document.getElementById("exitButton");


  /* =====================================
     BACKGROUND MUSIC
  ===================================== */

  const backgroundMusic =
    new Audio("assets/audio/background-music.wav");

  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.5;

  let soundEnabled = true;
  let musicStarted = false;


  /* =====================================
     START MUSIC ON FIRST USER CLICK
  ===================================== */

  document.addEventListener("click", () => {

    if (!musicStarted && soundEnabled) {

      backgroundMusic
        .play()
        .then(() => {

          musicStarted = true;

          console.log("Background music started");

        })
        .catch((error) => {

          console.log(
            "Background music could not start:",
            error
          );

        });

    }

  }, { once: true });


  /* =====================================
     ANIMAL ADVENTURE
  ===================================== */

  animalAdventureButton.addEventListener("click", () => {

    console.log("Opening Animal Adventure...");

    window.location.href = "game.html";

  });


  /* =====================================
     SOUND
  ===================================== */

  soundButton.addEventListener("click", (event) => {

    event.stopPropagation();

    soundEnabled = !soundEnabled;


    if (soundEnabled) {

      backgroundMusic
        .play()
        .then(() => {

          musicStarted = true;

          console.log("Sound ON");

        })
        .catch((error) => {

          console.log(
            "Could not play music:",
            error
          );

        });

    } else {

      backgroundMusic.pause();

      console.log("Sound OFF");

    }

  });


  /* =====================================
     EXIT
  ===================================== */

  exitButton.addEventListener("click", () => {

    console.log("Exit button clicked");

    const confirmed = window.confirm(
      "Do you want to exit Kids Learning World?"
    );

    if (!confirmed) {
      return;
    }

    /*
      Browsers normally don't allow a normal webpage
      to close its own tab.

      For now we return to a blank page.
    */

    window.location.href = "about:blank";

  });

});
