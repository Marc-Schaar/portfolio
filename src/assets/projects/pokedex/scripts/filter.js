// Main function to filter Pokémon by name based on user input
function filterPkmName() {
    const inputRef = getInputValue(); // Get user input
    const filteredPokemons = filterPokemonsByName(inputRef); // Filter Pokémon by name
    filterActive = true; // Activate the filter mode

    handleInputLength(inputRef, filteredPokemons); // Handle different input lengths
    handleEmptyInput(inputRef); // Handle empty input
}

// Retrieves and converts the input value to lowercase
function getInputValue() {
    return document.getElementById("input").value.toLowerCase();
}

// Filters Pokémon from fullPokedex based on input value
function filterPokemonsByName(input) {
    return fullPokedex.filter(pokemon => pokemon.name.toLowerCase().includes(input));
}

// Handles scenarios where input length is 3 or more characters
function handleInputLength(inputRef, filteredPokemons) {
    if (inputRef.length >= 3) {
        prepareFilteredPokemons(filteredPokemons); // Prepare and display filtered Pokémon
        $(".dropdown-menu").removeClass("show"); // Hide dropdown menu
        hideText(); // Hide input message
        disableLoadBtn(); // Disable load button
    } else {
        resetView(); // Reset view for short input
    }
}

// Resets the view for input less than or equal to 2 characters
function resetView() {
    showText(); // Show input message
    init(); // Reinitialize Pokémon list
    enableLoadBtn(); // Enable load button
}

// Handles scenarios where the input is empty
function handleEmptyInput(inputRef) {
    if (checkLengthEqualZero(inputRef)) {
        hideText(); // Hide input message
        enableLoadBtn(); // Enable load button
    }
}

// Checks if the length of the input is zero
function checkLengthEqualZero(param) {
    return param.length === 0;
}


// Filters Pokémon by a specific name passed as a parameter
function filterExamplePkmName(name) {
    let inputRef = name.toLowerCase(); // Convert the name to lowercase
    let filteredPokemons = fullPokedex.filter((pokemon) => pokemon.name.toLowerCase().includes(inputRef)); // Filter Pokémon by name
    filterActive = true; // Activate filter mode

    prepareFilteredPokemons(filteredPokemons); // Prepare and display filtered Pokémon
    $(".dropdown-menu").removeClass("show"); // Hide the dropdown menu
}

// Filters Pokémon by type based on a parameter (e.g., "fire", "water")
function filterPkmType(parameter) {
    let typeRef = parameter.toLowerCase(); // Convert the type to lowercase
    let filteredPokemons = fullPokedex.filter((pokemon) => {
        filterActive = true; // Activate filter mode

        // Loop through Pokémon's types and check if the type matches the parameter
        for (let i = 0; i < pokemon.types.length; i++) {
            if (pokemon.types[i].type.name.toLowerCase().includes(typeRef)) {
                return true; // Return true if a match is found
            }
        }
        return false; // Return false if no match is found
    });
    closeDropDown(); // Close the dropdown menu after filtering
    prepareFilteredPokemons(filteredPokemons); // Prepare and display filtered Pokémon
}

// Prepares the display of the filtered Pokémon list
function prepareFilteredPokemons(pokemons) {
    document.getElementById("content").innerHTML = ""; // Clear the content area

    // If no Pokémon found, display a message, otherwise show the filtered list
    if (checkLenghtEqualZero(pokemons)) {
        document.getElementById("content").innerHTML = "Pokemon not found";
    } else {
        showFiltredPokemon(pokemons); // Show filtered Pokémon
    }
}

// Loops through the filtered Pokémon and displays them
function showFiltredPokemon(pokemons) {
    for (let i = 0; i < pokemons.length; i++) {
        let pokemon = pokemons[i];
        let pokemonIndex = fullPokedex.indexOf(pokemon); // Get Pokémon index from fullPokedex
        createPokemonCard(pokemonIndex); // Create and display Pokémon card
        displayPokemonDetails(pokemonIndex, pokemon); // Show Pokémon details
        hideLoadMore(); // Hide "Load More" button after filtering
    }
}

// Closes the dropdown menus and resets the state
function closeDropDown() {
    $("#drop-down-1").dropdown("toggle"); // Toggle dropdown 1
    document.getElementById("drop-down-1").setAttribute("aria-expanded", false); // Update ARIA attribute
    $("#drop-down-2").dropdown("toggle"); // Toggle dropdown 2
    document.getElementById("drop-down-2").setAttribute("aria-expanded", false); // Update ARIA attribute
    enableLoadBtn(); // Enable the load button
}

// Hides the "Load More" button
function hideLoadMore() {
    let buttonRef = document.getElementById("load-more-btn");
    buttonRef.classList.add("d-none"); // Add class to hide the button
}

// Shows the "Load More" button
function showLoadMore() {
    let buttonRef = document.getElementById("load-more-btn");
    buttonRef.classList.remove("d-none"); // Remove class to show the button
}

// Shows input-related text (e.g., input message)
function showText() {
    let inputTextRef = document.getElementById("input-message");
    inputTextRef.classList.remove("transparent"); // Remove transparency to show the text
}

// Hides input-related text (e.g., input message)
function hideText() {
    let inputTextRef = document.getElementById("input-message");
    inputTextRef.classList.add("transparent"); // Add transparency to hide the text
}

// Checks if the length of the parameter is zero
function checkLenghtEqualZero(param) {
    return param.length === 0; // Returns true if the length is zero
}

// Resets the input field by clearing its content
function resetInput() {
    document.getElementById("input").value = ""; // Clear the input field
}