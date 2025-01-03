// Function to display Pokémon appearance images
function showAppearance(pokemonIndex) {
    clearContainer(); // Clear the existing content in the container
    createAppearanceContainer(); // Create a container for the appearance images
    getImages(pokemonIndex); // Fetch and display images based on the Pokémon index
}

// Function to create the appearance container and insert it into the DOM
function createAppearanceContainer() {
    const containerRef = document.getElementById("container"); // Reference to the main container element
    containerRef.innerHTML = appearanceContainerTemplate(); // Set the inner HTML using the appearance container template
}

// Function to get the appropriate images for the selected Pokémon
function getImages(pokemonIndex) {
    if (!filterActive) {
        let pokemon = chunkedPokedex[pokemonIndex].sprites; // Get the sprites of the Pokémon from the unfiltered array

        displayDefaultImg(pokemon); // Display the default sprites (normal)
        displayShinyImg(pokemon); // Display the shiny sprites
    } else if (filterActive) {
        let pokemon = fullPokedex[pokemonIndex].sprites; // Get the sprites of the Pokémon from the filtered array

        displayDefaultImg(pokemon); // Display the default sprites (normal)
        displayShinyImg(pokemon); // Display the shiny sprites
    }
}

// Function to display the default (normal) Pokémon sprites
function displayDefaultImg(pokemon) {
    let front_default = pokemon.front_default; // Front view of the default sprite
    let back_default = pokemon.back_default; // Back view of the default sprite
    let homeDefault = pokemon.other.home.front_default; // Front view from the 'home' sprite set
    let showdownFrontDefault = pokemon.other.showdown.front_default; // Front view from the 'showdown' sprite set
    let showdownBackDefault = pokemon.other.showdown.back_default; // Back view from the 'showdown' sprite set

    // Set the image sources in the DOM to display the default sprites
    document.getElementById("front_default").src = front_default;
    document.getElementById("back_default").src = back_default;
    document.getElementById("homeDefault").src = homeDefault;
    document.getElementById("showdownFrontDefault").src = showdownFrontDefault;
    document.getElementById("showdownBackDefault").src = showdownBackDefault;
}

// Function to display the shiny version of the Pokémon sprites
function displayShinyImg(pokemon) {
    let fron_shiny = pokemon.front_shiny; // Front view of the shiny sprite
    let back_shiny = pokemon.back_shiny; // Back view of the shiny sprite
    let homeShiny = pokemon.other.home.front_shiny; // Shiny front view from the 'home' sprite set
    let showdownFrontShiny = pokemon.other.showdown.front_shiny; // Shiny front view from the 'showdown' sprite set
    let showdownBackShiny = pokemon.other.showdown.back_shiny; // Shiny back view from the 'showdown' sprite set

    // Set the image sources in the DOM to display the shiny sprites
    document.getElementById("fron_shiny").src = fron_shiny;
    document.getElementById("back_shiny").src = back_shiny;
    document.getElementById("homeShiny").src = homeShiny;
    document.getElementById("showdownFrontShiny").src = showdownFrontShiny;
    document.getElementById("showdownBackShiny").src = showdownBackShiny;
}