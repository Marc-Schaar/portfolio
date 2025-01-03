let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let portrait = window.matchMedia("(orientation: portrait)").matches;
let game;
let gameActive = false;
let backgroundAudio = [
    new Audio("./assets/audio/eagle-squawking-type-1.mp3"),
    new Audio("./assets/audio/eagle-squawking-type-2.mp3"),
    new Audio("./assets/audio/eagle-squawking-type-3.mp3"),
];

/**
 * Initializes the game by setting up the canvas, game element, and checking orientation.
 */
function init() {
    canvas = document.getElementById("canvas");
    game = document.getElementById("game");
    checkOrientation(portrait);
    checkGameActive();

    window.addEventListener("resize", () => {
        portrait = window.innerHeight > window.innerWidth;
        checkOrientation(portrait);
    });
}

/**
 * Checks if the device is mobile.
 * @returns {boolean} True if the device is mobile, false otherwise.
 */
function isMobile() {
    const regex =
        /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
}

/**
 * Displays mobile-specific buttons and hides screen buttons if the device is mobile.
 */
function checkMobileMode() {
    if (isMobile()) {
        document
            .getElementById("mobile-action-btns")
            .classList.remove("d-none");
        document.getElementById("screen-btns").classList.add("d-none");
    }
}

/**
 * Initializes the game environment, hides the play button, and starts the game.
 */
function gameInit() {
    document.getElementById("play-btn").classList.add("d-none");
    document.getElementById("game-overlay").classList.add("d-none");
    document.getElementById("canvas").classList.remove("d-none");
    checkMobileMode();
    setLevel();
    playAudio();
    world = new World(canvas, keyboard);
    gameActive = true;
}

/**
 * Plays background audio with random selection and interval.
 */
function playAudio() {
    let randomNumber = Math.round(Math.random() * 2);
    backgroundAudio[randomNumber].volume = 0.1;
    backgroundAudio[randomNumber].play();

    let randomInterval = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
    setTimeout(playAudio, randomInterval);
}

/**
 * Periodically checks if the game is active and shows/hides the canvas.
 */

function checkGameActive() {
    setInterval(() => {
        if (!gameActive) {
            document.getElementById("canvas").classList.add("d-none");
        } else {
            document.getElementById("canvas").classList.remove("d-none");
        }
    }, 1000 / 20);
}

/**
 * Adjusts the view based on the device orientation.
 * @param {boolean} isPortrait - True if the orientation is portrait.
 */
function checkOrientation(isPortrait) {
    portrait = isPortrait;

    if (portrait) {
        document.getElementById("turn-msg-overlay").classList.remove("hide");
    } else {
        document.getElementById("turn-msg-overlay").classList.add("hide");
    }
}

/**
 * Enables fullscreen mode for the game.
 */
function fullscreen() {
    let game = document.getElementById("game");
    if (game.requestFullscreen) {
        game.requestFullscreen();
    } else if (game.webkitRequestFullscreen) {
        game.webkitRequestFullscreen();
    } else if (game.msRequestFullscreen) {
        game.msRequestFullscreen();
    }
}

/**
 * Exits fullscreen mode if it is active.
 */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

/**
 * Event listener for keydown events to set corresponding keyboard controls to true.
 * @param {KeyboardEvent} event - The keyboard event.
 */
window.addEventListener("keydown", (event) => {
    if (event.keyCode === 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode === 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode === 38 || event.keyCode === 32) {
        keyboard.UP = true;
    }
    if (event.keyCode === 68) {
        keyboard.THROW = true;
    }
});

/**
 * Event listener for keyup events to set corresponding keyboard controls to false.
 * @param {KeyboardEvent} event - The keyboard event.
 */
window.addEventListener("keyup", (event) => {
    if (event.keyCode === 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode === 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode === 38 || event.keyCode === 32) {
        keyboard.UP = false;
    }
    if (event.keyCode === 68) {
        keyboard.THROW = false;
    }
    if (event.keyCode === 27) {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }
});

/**
 * Starts user action based on the button pressed.
 * @param {string} userAction - The action being performed (e.g., "left", "right").
 * @param {Event} event - The event object triggered by the action.
 */
function startUserAction(userAction, event) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    console.log(event);

    document.getElementById(userAction + "-btn").style.scale = "1.1";
    if (userAction == "left") {
        keyboard.LEFT = true;
    }
    if (userAction == "right") {
        keyboard.RIGHT = true;
    }
    if (userAction == "jump") {
        keyboard.UP = true;
    }
    if (userAction == "throw") {
        keyboard.TROW = true;
    }
}

/**
 * Ends user action based on the button pressed.
 * @param {string} userAction - The action being performed (e.g., "left", "right").
 */

function endUserAction(userAction) {
    document.getElementById(userAction + "-btn").style.scale = "1";
    if (userAction == "left") {
        keyboard.LEFT = false;
    }
    if (userAction == "right") {
        keyboard.RIGHT = false;
    }
    if (userAction == "jump") {
        keyboard.UP = false;
    }
    if (userAction == "throw") {
        keyboard.TROW = false;
    }
}
