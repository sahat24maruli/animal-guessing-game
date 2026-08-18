# Animal Adventure - Guess the Animal

A mobile-friendly HTML5 educational game for children ages 4-8.

## Included

- 10 rounds
- 4 answer choices
- +10 points for each correct answer
- Wrong answer shake animation
- Correct answer star animation
- English Text-to-Speech
- Simple cheerful background music using Web Audio API
- Jungle theme
- Final score and 1-3 stars
- Play Again button
- Responsive layout for desktop and mobile

## Files

- `index.html` - website entry point
- `css/style.css` - responsive styling
- `js/game.js` - Phaser game logic
- `assets/` - reserved for future images/audio

## Run locally

You can open `index.html` in a browser.

For best results, use a small local web server, for example:

```bash
python3 -m http.server 8000
```

Then open:

http://localhost:8000

## Upload to hosting

Upload the entire project contents so that the structure remains:

index.html
css/style.css
js/game.js
assets/

Then open the URL of your hosted `index.html`.

## Important

The current game loads Phaser from jsDelivr:

https://cdn.jsdelivr.net/npm/phaser@3.80.1/dist/phaser.min.js

Therefore the visitor needs an internet connection when opening the game.

Text-to-Speech and browser audio also depend on the browser/device.

## Recommended next upgrade

For a production version, replace the emoji animals with custom cartoon SVG/PNG assets and use recorded child-friendly narration for consistent pronunciation across devices.
