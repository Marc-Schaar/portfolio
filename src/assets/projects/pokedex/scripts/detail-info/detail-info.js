let audioURL = ""; // Initialize a variable to store the audio URL.

// Function to open the detail info overlay
function openDetailInfo(event) {
    let headertRef = document.getElementById("header"); // Reference to the header element
    let contentRef = document.getElementById("content"); // Reference to the main content element
    let overlayerRef = document.getElementById("overlayer"); // Reference to the overlay element
    let buttonRef = document.getElementById("load-more-btn"); // Reference to the "Load More" button
    let bodyRef = document.getElementById("body"); // Reference to the body element

    // Show the overlay and hide other content
    overlayerRef.classList.remove("d-none"); // Remove the "d-none" class to show the overlay
    headertRef.classList.add("d-none"); // Hide the header
    contentRef.classList.add("mt-2"); // Add margin to the top of content
    buttonRef.classList.add("d-none"); // Hide the "Load More" button
    bodyRef.classList.add("overflow-hidden"); // Prevent scrolling by hiding overflow

    event.stopPropagation(); // Stop the event from bubbling up to other elements
}

// Function to close the detail info overlay
function closeDetailInfo(event) {
    let headertRef = document.getElementById("header"); // Reference to the header element
    let contentRef = document.getElementById("content"); // Reference to the main content element
    let overlayerRef = document.getElementById("overlayer"); // Reference to the overlay element
    let buttonRef = document.getElementById("load-more-btn"); // Reference to the "Load More" button
    let bodyRef = document.getElementById("body"); // Reference to the body element

    // Close the overlay if the click is outside the detail info or on the close button
    if (!event.target.closest("#detail-info") || event.target.closest("#close-button")) {
        headertRef.classList.remove("d-none"); // Show the header again
        contentRef.classList.remove("mt-2"); // Remove margin from the content
        buttonRef.classList.remove("d-none"); // Show the "Load More" button
        bodyRef.classList.remove("overflow-hidden"); // Allow scrolling again
        overlayerRef.classList.add("d-none"); // Hide the overlay

        // Manage visibility of the "Load More" button depending on filter status
        if (filterActive) {
            hideLoadMore(); // If filter is active, hide the "Load More" button
        } else {
            showLoadMore(); // Otherwise, show the "Load More" button
        }
    }
}

// Function to display the selected Pokémon's details based on whether a filter is active
function displayChoosenPokemon(pokemonIndex) {
    if (!filterActive) {
        getSelectetPokemonWithoutFilter(pokemonIndex); // Get Pokémon data without filter
    } else if (filterActive) {
        getSelectetPokemonWithFilter(pokemonIndex); // Get Pokémon data with filter
    }
}

// Function to get the selected Pokémon's details without applying a filter
function getSelectetPokemonWithoutFilter(pokemonIndex) {
    let overlayerRef = document.getElementById("overlayer"); // Reference to the overlay element
    let pokemon = chunkedPokedex[pokemonIndex]; // Get Pokémon data from chunkedPokedex array
    let id = pokemon.id; // Extract Pokémon ID

    overlayerRef.innerHTML = detailInfoTemplate(pokemonIndex, id); // Render detail info template
    getPkmInfos(pokemon); // Fetch and display additional Pokémon information
}

// Function to get the selected Pokémon's details with a filter applied
function getSelectetPokemonWithFilter(pokemonIndex) {
    let overlayerRef = document.getElementById("overlayer"); // Reference to the overlay element
    let pokemon = fullPokedex[pokemonIndex]; // Get Pokémon data from fullPokedex array
    let id = pokemon.id; // Extract Pokémon ID

    overlayerRef.innerHTML = detailInfoTemplate(pokemonIndex, id); // Render detail info template
    getPkmInfos(pokemon); // Fetch and display additional Pokémon information
}

// Function to fetch and display Pokémon information
function getPkmInfos(pokemon) {
    let id = pokemon.id; // Get Pokémon ID
    let img =
        pokemon.sprites.other.dream_world.front_default || // Try getting the Dream World sprite
        pokemon.sprites.other.home.front_default || // If not available, use the Home sprite
        pokemon.sprites.other.showdown.front_default; // Fall back to Showdown sprite

    showStats(id); // Display the Pokémon's stats
    renderInfosInOvererlay(pokemon, img); // Render the basic info in the overlay
    showFlavourText(pokemon); // Fetch and display the flavor text
}

// Function to render Pokémon information in the overlay
function renderInfosInOvererlay(pokemon, img) {
    // Set the Pokémon name and ID in the overlay
    document.getElementById("pokemon-name-id").innerHTML = "#" + pokemon.id + " " + pokemon.name.toUpperCase();
    // Set the Pokémon image in the overlay
    document.getElementById("pokemon-img").src = img;
    // Display Pokémon weight and height
    document.getElementById("weight").innerHTML = "Weight: " + pokemon.weight;
    document.getElementById("height").innerHTML = "Height: " + pokemon.height;
}

// Function to display the next Pokémon's details
function nextPkm(pokemonIndex) {
    if ((pokemonIndex + 1) === chunkedPokedex.length) { // If at the last Pokémon in the array
        pokemonIndex = chunkedPokedex.length - 1; // Stay on the last Pokémon
    } else {
        pokemonIndex++; // Move to the next Pokémon
    }
    displayChoosenPokemon(pokemonIndex); // Show the details of the next Pokémon
}

// Function to display the previous Pokémon's details
function prevPkm(pokemonIndex) {
    if (pokemonIndex <= 1) { // If at the first Pokémon in the array
        pokemonIndex = 1; // Stay on the first Pokémon
    } else {
        pokemonIndex--; // Move to the previous Pokémon
    }
    displayChoosenPokemon(pokemonIndex); // Show the details of the previous Pokémon
}

// Function to fetch and display the flavor text of a Pokémon
async function showFlavourText(pokemon) {
    let container = document.getElementById("flavour-container"); // Reference to the flavor text container
    let text = await getFlavourText(pokemon); // Fetch the flavor text
    container.innerHTML = `${text}`; // Display the flavor text in the container
}

// Function to fetch flavor text from the Pokémon species URL
async function getFlavourText(pokemon) {
    let url = pokemon.species.url; // Get the species URL for the Pokémon
    let species = await fetchData(url); // Fetch the species data
    let text = species.flavor_text_entries[1].flavor_text; // Get the second flavor text entry
    return text; // Return the flavor text
}

function playCries(pokemonIndex) {
    let selectedPokemon = chunkedPokedex[pokemonIndex] || fullPokedex[pokemonIndex];
    audioURL = selectedPokemon.cries.legacy;
    let audio = new Audio(audioURL);
    audio.play();

}