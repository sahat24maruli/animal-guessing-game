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
     ANIMAL ADVENTURE
  ===================================== */

  animalAdventureButton.addEventListener("click", () => {

    console.log("Opening Animal Adventure...");

    window.location.href = "game.html";

  });


  /* =====================================
     SOUND
  ===================================== */

  let soundEnabled = true;

  soundButton.addEventListener("click", () => {

    soundEnabled = !soundEnabled;

    console.log(
      soundEnabled
        ? "Sound ON"
        : "Sound OFF"
    );

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