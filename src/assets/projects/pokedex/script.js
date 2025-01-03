// Global variables
let promError = false; // Flag to indicate if there was a promise error
let startPokemon = 0; // Offset for API requests
let cyle = 0; // Cycle counter for fetching Pokémon data
let filterActive = false; // Flag to indicate if a filter is active
let loadMoreActive = false; // Flag to indicate if more Pokémon should be loaded
let chunkedPokedex = []; // Array to hold Pokémon data in chunks
let fullPokedex = []; // Array to hold the full Pokémon data for filtering

const BASE_URL = `https://pokeapi.co/api/v2/pokemon-species?offset=${startPokemon}&limit=20`;
const FULL_POKEDEX_URL = `https://pokeapi.co/api/v2/pokemon-species?offset=0&limit=1025`;

// Initializes the Pokémon list and disables the load button
function init() {
    clearContent(); // Clear existing content
    disableLoadBtn(); // Disable load more button

    filterActive = false; // Reset filter status
    loadMoreActive = false; // Reset load more status

    if (chunkedPokedex.length === 0) {
        usePromise(BASE_URL); // Fetch initial Pokémon data if chunkedPokedex is empty
    } else {
        displayAllPokemons(chunkedPokedex); // Display Pokémon if already loaded
    }
}

// Uses a promise to fetch data from the given URL
async function usePromise(URL) {
    try {
        await getPromise(URL); // Fetch data using the promise
    } catch (error) {
        console.log("error", error); // Log any errors
    } finally {
        disableDisplayLoadScreen(); // Hide loading screen
    }
}

// Returns a promise that resolves with Pokémon data or rejects on error
function getPromise(URL) {
    return new Promise((resolve, reject) => {
        displayLoadScreen(); // Show loading screen
        setTimeout(() => {
            if (promError) {
                reject(); // Reject if there's an error
            } else {
                resolve(getPokemon(URL)); // Resolve with fetched data
            }
        }, 2000);
    });
}

// Fetches Pokémon data from the given URL
async function getPokemon(url) {
    if (cyle === 0) {
        let object = await fetchData(url); // Fetch initial data
        let speciesArray = object.results;
        cyle++;
        getPokemonOverwiew(speciesArray); // Process the fetched data
    } else if (cyle === 1) {
        let species = await fetchData(url); // Fetch additional data
        let fullSpeciesArray = species.results;
        cyle++;
        getPokemonOverwiew(fullSpeciesArray); // Process the fetched data
    }
}

// Handles Pokémon data based on the current cycle
function getPokemonOverwiew(array) {
    if (cyle === 1) {
        fillChunckedPokedex(array); // Fill chunked Pokedex
    } else if (cyle === 2) {
        fillFullPokedex(array); // Fill full Pokedex
    }
}

// Fills the chunked Pokedex with Pokémon data
async function fillChunckedPokedex(array) {
    for (const species of array) {
        let speciesURL = species.url;
        let speciesOverwiew = await fetchData(speciesURL);
        let pokemonURl = speciesOverwiew.varieties[0].pokemon.url;
        let pokemon = await fetchData(pokemonURl);
        let id = pokemon.id;
        chunkedPokedex[id] = pokemon; // Store Pokémon data

        // Display Pokémon cards and details
        createPokemonCard(id);
        displayPokemonDetails(id, pokemon);
        showLoadMore();
        usePromise(FULL_POKEDEX_URL);
        enableLoadBtn();
    }
}

// Fills the full Pokedex with Pokémon data
async function fillFullPokedex(array) {
    for (const species of array) {
        let speciesURL = species.url;
        let speciesOverwiew = await fetchData(speciesURL);
        let pokemonURl = speciesOverwiew.varieties[0].pokemon.url;
        let pokemon = await fetchData(pokemonURl);
        let id = pokemon.id;
        fullPokedex[id] = pokemon; // Store full Pokémon data
    }
}

// Fetches data from the given URL
async function fetchData(url) {
    let response = await fetch(url);
    return await response.json(); // Return the response as JSON
}

// Displays all Pokémon from the given array
function displayAllPokemons(pokemons) {
    clearContent(); // Clear existing content

    // Create and display Pokémon cards and details
    for (let i = 1; i < pokemons.length; i++) {
        let pokemon = pokemons[i];
        let pokemonIndex = chunkedPokedex.indexOf(pokemon);

        createPokemonCard(pokemonIndex);
        displayPokemonDetails(pokemonIndex, chunkedPokedex[pokemonIndex]);
    }
}

// Creates a Pokémon card element
function createPokemonCard(pokemonIndex) {
    let contentRef = document.getElementById("content");
    contentRef.innerHTML += renderPkmCard(pokemonIndex); // Add Pokémon card to the content
}

// Loads more Pokémon data
function loadPokemons() {
    cyle = 0;
    startPokemon = chunkedPokedex.length - 1;
    const LOAD_URL = `https://pokeapi.co/api/v2/pokemon-species?offset=${startPokemon}&limit=50`;
    loadMoreActive = true;
    disableLoadBtn();
    usePromise(LOAD_URL);
}

// Displays Pokémon details
function displayPokemonDetails(pokemonIndex, choosenArray) {
    displayNameAndId(pokemonIndex, choosenArray);
    displayImg(pokemonIndex, choosenArray);
    displayType(pokemonIndex, choosenArray);
    updateBgColor(pokemonIndex, choosenArray);
}

// Displays Pokémon name and ID
function displayNameAndId(pokemonIndex, choosenArray) {
    let id_nameRef = document.getElementById(`id_name${pokemonIndex}`);
    id_nameRef.innerHTML = `#${choosenArray.id} ${choosenArray.name.toUpperCase()}`;
}

// Displays Pokémon image
function displayImg(pokemonIndex, choosenArray) {
    let pokemonImgRef = document.getElementById(`pokemon-img${pokemonIndex}`);
    let img = choosenArray.sprites.other.dream_world.front_default ||
        choosenArray.sprites.other.home.front_default ||
        choosenArray.sprites.other.showdown.front_default;

    pokemonImgRef.src = img;
}

// Displays Pokémon types
function displayType(pokemonIndex, choosenArray) {
    choosenArray.types.forEach((type, index) => {
        if (index === 0) {
            renderFirstTypeImg(pokemonIndex, type.type.name);
        } else if (index === 1) {
            renderSecondTypeImg(pokemonIndex, type.type.name);
        }
    });

    if (checkSecondTypeAvailable(choosenArray)) {
        hideEmptyType(pokemonIndex);
    }
}

// Checks if the second type is available
function checkSecondTypeAvailable(choosenArray) {
    return choosenArray.types.length <= 1;
}

// Renders the first type image
function renderFirstTypeImg(pokemonIndex, pokemonTypes) {
    let pokemonFirstImgTypeRef = document.getElementById(`pokemon-first-type-img${pokemonIndex}`);
    pokemonFirstImgTypeRef.src = `./img/icon/icon-types/${pokemonTypes}.svg`;
}

// Renders the second type image
function renderSecondTypeImg(pokemonIndex, pokemonTypes) {
    let pokemonSecondImgTypeRef = document.getElementById(`pokemon-second-type-img${pokemonIndex}`);
    pokemonSecondImgTypeRef.src = `./img/icon/icon-types/${pokemonTypes}.svg`;
}

// Hides the second type image if it's not available
function hideEmptyType(pokemonIndex) {
    let pokemonSecondImgTypeRef = document.getElementById(`pokemon-second-type-img${pokemonIndex}`);
    pokemonSecondImgTypeRef.classList.add("d-none");
}

// Updates the background color of the Pokémon card based on its type
function updateBgColor(pokemonIndex, choosenArray) {
    let cardRef = document.getElementById(`pokemon-card-${pokemonIndex}`);
    let typeForBg = choosenArray.types[0].type.name;
    cardRef.classList.add(`${typeForBg}`);
}

// Clears the content area and displays the load more button
function clearContent() {
    let contentRef = document.getElementById("content");
    let buttonRef = document.getElementById("load-more-btn");

    contentRef.innerHTML = "";
    buttonRef.classList.remove("d-none");
}

// Disables the load more button
function disableLoadBtn() {
    let buttonRef = document.getElementById("load-more-btn");
    buttonRef.disabled = true;
}

// Enables the load more button after a delay
function enableLoadBtn() {
    let buttonRef = document.getElementById("load-more-btn");
    setTimeout(() => {
        buttonRef.disabled = false;
    }, 3000);
}