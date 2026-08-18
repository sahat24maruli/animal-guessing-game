/* =========================================================
   ANIMAL ADVENTURE - GUESS THE ANIMAL
   Mobile-friendly Phaser 3 web game
========================================================= */

const ANIMALS = [
  { name: "Cat", emoji: "🐱", color: "#FFD166", article: "a" },
  { name: "Dog", emoji: "🐶", color: "#F4A261", article: "a" },
 { name: "Elephant", image: "assets/animals/elephant.png", emoji: "🐘", color: "#BDE0FE", article: "an" },
  { name: "Lion", emoji: "🦁", color: "#F6BD60", article: "a" },
  { name: "Monkey", emoji: "🐵", color: "#C9ADA7", article: "a" },
  { name: "Rabbit", emoji: "🐰", color: "#EADCF8", article: "a" },
  { name: "Duck", emoji: "🦆", color: "#FFE066", article: "a" },
  { name: "Cow", emoji: "🐮", color: "#F8F9FA", article: "a" },
  { name: "Horse", emoji: "🐴", color: "#D4A373", article: "a" },
  { name: "Zebra", emoji: "🦓", color: "#E9ECEF", article: "a" }
];

let game;
let scene;
let currentRound = 0;
let score = 0;
let currentAnimal = null;
let answerButtons = [];
let uiObjects = [];
let audioContext = null;
let musicTimer = null;
let gameStarted = false;

const config = {
  type: Phaser.AUTO,
  parent: "game-container",
  backgroundColor: "#75d66b",
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 720
  },
  render: {
    antialias: true,
    roundPixels: true
  },
  scene: {
    preload,
    create,
    update
  }
};

window.addEventListener("error", (event) => {
  console.error("Game error:", event.error || event.message);
});

window.addEventListener("resize", () => {
  if (game && game.scale) game.scale.refresh();
});

game = new Phaser.Game(config);

function preload() {
  ANIMALS.forEach(animal => {
    if (animal.image) {
      this.load.image(animal.name, animal.image);
    }
  });
}

function create() {
  scene = this;
  createBackground();
  showStartScreen();
}

function update() {}

function addUI(obj) {
  uiObjects.push(obj);
  return obj;
}

function clearUI() {
  uiObjects.forEach(obj => {
    if (obj && obj.active) obj.destroy();
  });
  uiObjects = [];
  answerButtons = [];
}

function width() {
  return scene.scale.width;
}

function height() {
  return scene.scale.height;
}

/* ---------------- BACKGROUND ---------------- */

function createBackground() {
  const w = width();
  const h = height();

  scene.add.rectangle(w / 2, h / 2, w, h, 0x8BDDF5);

  scene.add.circle(w - Math.min(90, w * 0.12), Math.min(85, h * 0.12), 45, 0xFFE066);

  createCloud(w * 0.12, h * 0.13);
  createCloud(w * 0.42, h * 0.09);
  createCloud(w * 0.73, h * 0.15);

  scene.add.rectangle(w / 2, h - 75, w, 150, 0x65B741);

  createTree(55, h - 185, 0.9);
  createTree(145, h - 175, 0.7);
  createTree(w - 55, h - 185, 0.9);
  createTree(w - 145, h - 175, 0.7);

  for (let i = 0; i < 30; i++) {
    scene.add.text(
      Phaser.Math.Between(0, w),
      Phaser.Math.Between(Math.max(0, h - 130), h - 15),
      "🌿",
      { fontSize: Phaser.Math.Between(16, 26) + "px" }
    );
  }
}

function createCloud(x, y) {
  scene.add.circle(x, y, 24, 0xFFFFFF, 0.85);
  scene.add.circle(x + 28, y + 3, 31, 0xFFFFFF, 0.85);
  scene.add.circle(x + 58, y + 8, 22, 0xFFFFFF, 0.85);
  scene.add.rectangle(x + 30, y + 14, 72, 26, 0xFFFFFF, 0.85);
}

function createTree(x, y, scale) {
  scene.add.rectangle(x, y + 70 * scale, 35 * scale, 130 * scale, 0x8B5A2B);
  scene.add.circle(x - 30 * scale, y, 55 * scale, 0x2E8B57);
  scene.add.circle(x + 20 * scale, y - 10 * scale, 65 * scale, 0x3CB371);
  scene.add.circle(x + 55 * scale, y + 5 * scale, 48 * scale, 0x228B22);
}

/* ---------------- AUDIO ---------------- */

function initAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioContext.state === "suspended") audioContext.resume();
}

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.82;
  utterance.pitch = 1.12;
  utterance.volume = 1;
  window.speechSynthesis.speak(utterance);
}

function startMusic() {
  initAudio();
  if (musicTimer) return;

  const notes = [261.63, 329.63, 392.00, 329.63, 293.66, 349.23, 440.00, 349.23];
  let index = 0;

  function playNote() {
    if (!audioContext || audioContext.state !== "running") return;

    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.type = "sine";
    osc.frequency.value = notes[index];

    gain.gain.setValueAtTime(0.022, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.32);

    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start();
    osc.stop(audioContext.currentTime + 0.32);

    index = (index + 1) % notes.length;
  }

  playNote();
  musicTimer = setInterval(playNote, 450);
}

function playCorrectSound() {
  initAudio();
  const frequencies = [523.25, 659.25, 783.99];

  frequencies.forEach((frequency, index) => {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.type = "triangle";
    osc.frequency.value = frequency;

    const start = audioContext.currentTime + index * 0.08;
    gain.gain.setValueAtTime(0.08, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start(start);
    osc.stop(start + 0.35);
  });
}

function playWrongSound() {
  initAudio();

  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();

  osc.type = "sine";
  osc.frequency.value = 180;

  gain.gain.setValueAtTime(0.06, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.25);

  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.start();
  osc.stop(audioContext.currentTime + 0.25);
}

/* ---------------- START SCREEN ---------------- */

function showStartScreen() {
  clearUI();

  const w = width();
  const h = height();

  addUI(scene.add.text(w / 2, h * 0.20, "🐾 ANIMAL ADVENTURE 🐾", {
    fontFamily: '"Arial Rounded MT Bold", "Trebuchet MS", Arial',
    fontSize: Math.min(w * 0.075, 64) + "px",
    fontStyle: "bold",
    color: "#FFFFFF",
    stroke: "#27632A",
    strokeThickness: 7,
    align: "center"
  }).setOrigin(0.5));

  addUI(scene.add.text(w / 2, h * 0.33, "Guess the Animal!", {
    fontSize: Math.min(w * 0.055, 46) + "px",
    fontStyle: "bold",
    color: "#FFF9C4",
    stroke: "#27632A",
    strokeThickness: 5
  }).setOrigin(0.5));

  addUI(scene.add.text(w / 2, h * 0.42, "Learn English • Have Fun • Get Stars!", {
    fontSize: Math.min(w * 0.032, 28) + "px",
    color: "#FFFFFF",
    fontStyle: "bold",
    align: "center"
  }).setOrigin(0.5));

  const button = addUI(scene.add.rectangle(
    w / 2, h * 0.60,
    Math.min(w * 0.55, 380),
    86,
    0xFFB703
  ).setStrokeStyle(5, 0xFFFFFF).setInteractive({ useHandCursor: true }));

  addUI(scene.add.text(w / 2, h * 0.60, "▶ START GAME", {
    fontSize: Math.min(w * 0.045, 38) + "px",
    fontStyle: "bold",
    color: "#FFFFFF",
    stroke: "#8B5E00",
    strokeThickness: 4
  }).setOrigin(0.5));

  button.on("pointerover", () => button.setFillStyle(0xFFD166));
  button.on("pointerout", () => button.setFillStyle(0xFFB703));

  button.on("pointerdown", () => {
    initAudio();
    startMusic();
    gameStarted = true;
    startGame();
  });
}

/* ---------------- GAME FLOW ---------------- */

function startGame() {
  currentRound = 0;
  score = 0;
  showNextQuestion();
}

function showNextQuestion() {
  clearUI();

  if (currentRound >= 10) {
    showGameOver();
    return;
  }

  currentAnimal = ANIMALS[currentRound];
  currentRound++;
  createQuestion();

  scene.time.delayedCall(350, () => speak("What animal is this?"));
}

function createQuestion() {
  const w = width();
  const h = height();
  const compact = h < 600 || w < 600;

  const top = compact ? 18 : 25;
  const cardY = compact ? h * 0.35 : h * 0.39;
  const cardH = compact ? Math.min(h * 0.30, 210) : Math.min(h * 0.35, 270);
  const buttonY = compact ? h * 0.68 : h * 0.69;
  const buttonH = compact ? 54 : 68;
  const gap = compact ? 10 : 16;
  const buttonW = Math.min(w * 0.40, compact ? 180 : 225);

  addUI(scene.add.text(25, top, "⭐ Score: " + score, {
    fontSize: Math.min(w * 0.038, 30) + "px",
    fontStyle: "bold",
    color: "#FFFFFF",
    stroke: "#27632A",
    strokeThickness: 4
  }));

  addUI(scene.add.text(w - 25, top, `Round ${currentRound} / 10`, {
    fontSize: Math.min(w * 0.034, 27) + "px",
    fontStyle: "bold",
    color: "#FFFFFF",
    stroke: "#27632A",
    strokeThickness: 4
  }).setOrigin(1, 0));

  addUI(scene.add.text(w / 2, compact ? h * 0.11 : h * 0.105, "What animal is this?", {
    fontSize: Math.min(w * 0.045, 38) + "px",
    fontStyle: "bold",
    color: "#FFFFFF",
    stroke: "#27632A",
    strokeThickness: 5
  }).setOrigin(0.5));

  const card = addUI(scene.add.rectangle(w / 2, cardY, Math.min(w * 0.50, 440), cardH, 0xFFFFFF)
    .setStrokeStyle(7, Phaser.Display.Color.HexStringToColor(currentAnimal.color).color));

 let animal;

if (currentAnimal.image) {
  animal = addUI(
    scene.add.image(w / 2, cardY, currentAnimal.name)
      .setOrigin(0.5)
  );

  animal.setDisplaySize(
    compact ? 150 : 190,
    compact ? 150 : 190
  );
} else {
  animal = addUI(
    scene.add.text(w / 2, cardY, currentAnimal.emoji, {
      fontSize: Math.min(w * 0.20, compact ? 125 : 165) + "px"
    }).setOrigin(0.5)
  );
}

  scene.tweens.add({
    targets: animal,
    y: cardY - 7,
    duration: 800,
    yoyo: true,
    repeat: -1,
    ease: "Sine.easeInOut"
  });

  const options = createOptions(currentAnimal.name);
  const totalW = buttonW * 2 + gap;
  const startX = w / 2 - totalW / 2;

  options.forEach((option, index) => {
    const row = Math.floor(index / 2);
    const col = index % 2;
    const x = startX + col * (buttonW + gap) + buttonW / 2;
    const y = buttonY + row * (buttonH + gap);
    createAnswerButton(option, x, y, buttonW, buttonH);
  });

  addUI(scene.add.text(w / 2, h - (compact ? 18 : 28), "", {
    fontSize: Math.min(w * 0.033, 27) + "px",
    fontStyle: "bold",
    color: "#FFFFFF",
    stroke: "#27632A",
    strokeThickness: 4,
    align: "center"
  }).setOrigin(0.5));

  scene.questionFeedback = uiObjects[uiObjects.length - 1];
}

function createOptions(correctAnswer) {
  const wrong = Phaser.Utils.Array.Shuffle(
    ANIMALS.filter(a => a.name !== correctAnswer).map(a => a.name)
  ).slice(0, 3);

  return Phaser.Utils.Array.Shuffle([correctAnswer, ...wrong]);
}

function createAnswerButton(answer, x, y, w, h) {
  const button = scene.add.rectangle(x, y, w, h, 0xFFFFFF)
    .setStrokeStyle(4, 0x58B957)
    .setInteractive({ useHandCursor: true });

  const text = scene.add.text(x, y, answer, {
    fontSize: Math.min(w * 0.14, 28) + "px",
    fontStyle: "bold",
    color: "#27632A",
    align: "center"
  }).setOrigin(0.5);

  addUI(button);
  addUI(text);
  button.answerText = text;
  answerButtons.push(button);

  button.on("pointerover", () => {
    if (!button.input.enabled) return;
    button.setFillStyle(0xE8F5E9);
  });

  button.on("pointerout", () => {
    button.setFillStyle(0xFFFFFF);
  });

  button.on("pointerdown", () => {
    initAudio();
    checkAnswer(answer, button, text);
  });
}

function checkAnswer(answer, button, text) {
  if (!button.input || !button.input.enabled) return;

  if (answer === currentAnimal.name) {
    correctAnswer(button, text);
  } else {
    wrongAnswer(button, text);
  }
}

function correctAnswer(button, text) {
  answerButtons.forEach(btn => btn.disableInteractive());

  score += 10;

  button.setFillStyle(0x72E06A);
  button.setStrokeStyle(6, 0x249B22);
  text.setColor("#FFFFFF");

  scene.questionFeedback.setText(
    `Great job! It's ${currentAnimal.article} ${currentAnimal.name}! 🎉`
  );

  playCorrectSound();
  speak(`Great job! It's ${currentAnimal.article} ${currentAnimal.name}!`);
  createStarBurst();

  scene.tweens.add({
    targets: [button, text],
    scaleX: 1.07,
    scaleY: 1.07,
    duration: 140,
    yoyo: true,
    repeat: 2
  });

  scene.time.delayedCall(1500, showNextQuestion);
}

function wrongAnswer(button, text) {
  button.setFillStyle(0xFF6B6B);
  button.setStrokeStyle(5, 0xD62828);
  text.setColor("#FFFFFF");

  scene.questionFeedback.setText("Try Again! 😊");

  playWrongSound();
  speak("Try again!");

  const originalX = button.x;

  scene.tweens.add({
    targets: [button, text],
    x: originalX - 10,
    duration: 55,
    yoyo: true,
    repeat: 3,
    onComplete: () => {
      button.x = originalX;
      text.x = originalX;
      button.setFillStyle(0xFFFFFF);
      button.setStrokeStyle(4, 0x58B957);
      text.setColor("#27632A");
    }
  });
}

function createStarBurst() {
  const w = width();
  const h = height();

  for (let i = 0; i < 14; i++) {
    const star = scene.add.text(w / 2, h * 0.39, "⭐", {
      fontSize: Phaser.Math.Between(20, 40) + "px"
    }).setOrigin(0.5);

    const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
    const distance = Phaser.Math.Between(80, 230);

    scene.tweens.add({
      targets: star,
      x: w / 2 + Math.cos(angle) * distance,
      y: h * 0.39 + Math.sin(angle) * distance,
      alpha: 0,
      scale: 1.5,
      duration: 650,
      ease: "Cubic.easeOut",
      onComplete: () => star.destroy()
    });
  }
}

/* ---------------- GAME OVER ---------------- */

function showGameOver() {
  clearUI();

  const w = width();
  const h = height();

  addUI(scene.add.rectangle(w / 2, h / 2, w, h, 0x1B4332, 0.86));

  addUI(scene.add.text(w / 2, h * 0.16, "🎉 LEVEL COMPLETE! 🎉", {
    fontSize: Math.min(w * 0.07, 58) + "px",
    fontStyle: "bold",
    color: "#FFFFFF",
    stroke: "#FFB703",
    strokeThickness: 6,
    align: "center"
  }).setOrigin(0.5));

  addUI(scene.add.text(w / 2, h * 0.27, "You did an amazing job!", {
    fontSize: Math.min(w * 0.042, 34) + "px",
    fontStyle: "bold",
    color: "#FFFFFF"
  }).setOrigin(0.5));

  const stars = score >= 90 ? "⭐⭐⭐" : score >= 60 ? "⭐⭐☆" : "⭐☆☆";

  addUI(scene.add.text(w / 2, h * 0.42, stars, {
    fontSize: Math.min(w * 0.12, 90) + "px"
  }).setOrigin(0.5));

  addUI(scene.add.text(w / 2, h * 0.55, `Final Score: ${score} / 100`, {
    fontSize: Math.min(w * 0.047, 40) + "px",
    fontStyle: "bold",
    color: "#FFFFFF"
  }).setOrigin(0.5));

  const message =
    score === 100 ? "Perfect! You're an Animal Expert! 🏆" :
    score >= 80 ? "Amazing! Great Animal Knowledge! 🌟" :
    score >= 60 ? "Good Job! Keep Learning! 😊" :
    "Nice Try! Let's practice again! 💪";

  addUI(scene.add.text(w / 2, h * 0.64, message, {
    fontSize: Math.min(w * 0.033, 27) + "px",
    fontStyle: "bold",
    color: "#FFF9C4",
    align: "center"
  }).setOrigin(0.5));

  const btn = addUI(scene.add.rectangle(
    w / 2, h * 0.78,
    Math.min(w * 0.48, 330),
    70,
    0xFFB703
  ).setStrokeStyle(5, 0xFFFFFF).setInteractive({ useHandCursor: true }));

  addUI(scene.add.text(w / 2, h * 0.78, "🔄 PLAY AGAIN", {
    fontSize: Math.min(w * 0.038, 32) + "px",
    fontStyle: "bold",
    color: "#FFFFFF",
    stroke: "#8B5E00",
    strokeThickness: 3
  }).setOrigin(0.5));

  btn.on("pointerover", () => btn.setFillStyle(0xFFD166));
  btn.on("pointerout", () => btn.setFillStyle(0xFFB703));
  btn.on("pointerdown", () => {
    initAudio();
    startGame();
  });

  speak(`Game complete! Your score is ${score} out of 100.`);
}
