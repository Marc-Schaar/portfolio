// Array of motivational texts in English
let text = [
    "Like a Pokéball – Sometimes it takes several attempts to achieve the goal.",
    "Even a Magikarp can become a powerful Gyarados – Never give up.",
    "The path to Pokémon mastery begins with the first step.",
    "Sometimes you need to be like an Eevee – ready to evolve in any direction.",
    "Even intense training has an end – hang in there.",
    "Friendship is the true secret of a strong team.",
    "Patience is like the Exp. Share – it pays off, even if you don't see it immediately.",
    "Every battle is an opportunity to grow, just like a Pokémon after each level up.",
    "Believe in yourself, just like Ash believes in Pikachu.",
    "Like a Pokémon journey – the journey is just as important as the destination.",
];

// Function to display the loading screen with spinner and text
function displayLoadScreen() {
    displayLoadSpinner(); // Show the loading spinner
    displayLoadText(); // Display a motivational text
}

// Function to display the loading spinner
function displayLoadSpinner() {
    let loadScreenRef = document.getElementById("load-screen");
    loadScreenRef.classList.remove("d-none"); // Make the loading screen visible
    loadScreenRef.innerHTML = loadSpinner(); // Add the spinner HTML to the loading screen
}

// Function to display a random motivational text
function displayLoadText() {
    let loadTextRef = document.getElementById("text");
    loadTextRef.innerHTML = `${text[randomNumber()]}`; // Set the text to a random message from the array
}

// Function to generate a random number between 0 and 9
function randomNumber() {
    return Math.floor(Math.random() * 10); // Returns a random integer between 0 and 9
}

// Function to hide the loading screen
function disableDisplayLoadScreen() {
    let loadScreenRef = document.getElementById("load-screen");
    loadScreenRef.classList.add("d-none"); // Hide the loading screen
}