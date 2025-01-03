// Main function to display all moves of a Pokémon based on its ID
function showMoves(id) {
    clearContainer(); // Clear the current content in the container
    createMoveContainer(); // Create the container structure for displaying moves
    getMove(id); // Fetch and display moves for the Pokémon with the given ID
}

// Creates the container for moves display
function createMoveContainer() {
    const containerRef = document.getElementById("container"); // Get a reference to the main container element
    containerRef.innerHTML = moveContainerTemplate(); // Set the inner HTML of the container with the move template structure
}

// Fetches and displays all moves for the Pokémon by its ID
async function getMove(id) {
    let moves = fullPokedex[id].moves; // Get the list of moves from the Pokémon's data in the fullPokedex

    // Loop through each move in the list of moves
    for (const move of moves) {
        let moveName = move.move.name.toUpperCase(); // Extract the move name and convert it to uppercase for display
        let container = document.getElementById("moves-container"); // Get a reference to the moves display container
        container.innerHTML += moveTemplate(moveName); // Append the move's HTML structure to the container
    }
}