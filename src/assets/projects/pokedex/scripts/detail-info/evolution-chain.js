let possibleFirstEvoltions = []; // Array to store first evolution stage data
let possibleSecondEvoltions = []; // Array to store second evolution stage data

// Main function to display the evolution chain for a Pokémon
async function showEvolutionChain(pokemonId) {
    const speciesData = await fetchPokemonSpecies(pokemonId); // Fetch species data for the Pokémon
    const evolutionChainData = await fetchEvolutionChain(speciesData.evolution_chain.url); // Fetch the evolution chain data
    clearArrays(); // Clear the arrays storing evolution data
    clearContainer(); // Clear the display container
    await createEvolutionContainer(pokemonId); // Create the container to display evolution chain
    await getData(evolutionChainData); // Process and display evolution chain data
}

// Clears the arrays storing possible evolutions
function clearArrays() {
    possibleFirstEvoltions = []; // Clear first evolution stage array
    possibleSecondEvoltions = []; // Clear second evolution stage array
}

// Function to process evolution chain data
async function getData(evolutionChainData) {
    const baseEvolutionOverview = getBaseEvolutionData(evolutionChainData); // Get base evolution data (first stage)
    const URL_FOR_IMG = baseEvolutionOverview.species.url; // URL to fetch image for base evolution
    const img = await getEvolutionImg(URL_FOR_IMG); // Get the image for the base evolution
    const name = baseEvolutionOverview.species.name.toUpperCase(); // Get and format base evolution name
    let evolvesTo = baseEvolutionOverview.evolves_to; // Get the possible evolutions from the base stage

    displayBaseEvo(img, name); // Display the base evolution

    // Store first stage evolutions in the array
    for (let index = 0; index < evolvesTo.length; index++) {
        possibleEvoltion = evolvesTo[index];
        possibleFirstEvoltions.push(possibleEvoltion);
    }

    // If there are first stage evolutions, process them
    if (possibleFirstEvoltions.length > 0) {
        await getFirstEvolutionData(); // Get and display first stage evolutions

        // If there are second stage evolutions, process them
        if (possibleSecondEvoltions.length > 0) {
            await getSecondEvolutionData(); // Get and display second stage evolutions
        }
    }
}

// Extracts and returns the base evolution data from the evolution chain
function getBaseEvolutionData(evolutionChainData) {
    let baseOverwiev = evolutionChainData.chain; // Get the chain data for the base Pokémon
    return baseOverwiev; // Return the base evolution data
}

// Processes the first stage evolutions
async function getFirstEvolutionData() {
    for (let index = 0; index < possibleFirstEvoltions.length; index++) {
        const overview = possibleFirstEvoltions[index]; // Get first evolution overview
        const name = overview.species.name.toUpperCase(); // Get and format name
        const evolutionTrigger = overview.evolution_details[0].trigger; // Get the evolution trigger details
        const evolutionTriggerName = evolutionTrigger.name; // Get trigger name
        const evolutionTriggerUrl = evolutionTrigger.url; // Get trigger URL (not used here)
        const evolves_to = overview.evolves_to; // Get further evolutions from first stage
        const URL_FOR_IMG = overview.species.url; // URL for the first evolution's image
        const img = await getEvolutionImg(URL_FOR_IMG); // Fetch image for the first evolution
        let levelUpRequerment = displayLevelUpRequirement(overview); // Get the level/item requirement for evolution

        // Store second stage evolutions in the array
        for (let index = 0; index < evolves_to.length; index++) {
            let possibleEvoltion = evolves_to[index];
            possibleSecondEvoltions.push(possibleEvoltion);
        }

        displayFirstEvo(img, name); // Display the first stage evolution
        displayArrow("first-arrow", evolutionTriggerName, levelUpRequerment); // Display the arrow with evolution trigger and requirement
    }
}

// Processes the second stage evolutions
async function getSecondEvolutionData() {
    for (let index = 0; index < possibleSecondEvoltions.length; index++) {
        const overview = possibleSecondEvoltions[index]; // Get second evolution overview
        const name = overview.species.name.toUpperCase(); // Get and format name
        const evolutionTrigger = overview.evolution_details[0].trigger; // Get the evolution trigger details
        const evolutionTriggerName = evolutionTrigger.name; // Get trigger name
        const evolutionTriggerUrl = evolutionTrigger.url; // Get trigger URL (not used here)
        const URL_FOR_IMG = overview.species.url; // URL for the second evolution's image
        const img = await getEvolutionImg(URL_FOR_IMG); // Fetch image for the second evolution
        let levelUpRequerment = displayLevelUpRequirement(overview); // Get the level/item requirement for evolution

        displaySecondEvo(img, name); // Display the second stage evolution
        displayArrow("second-arrow", evolutionTriggerName, levelUpRequerment); // Display the arrow with evolution trigger and requirement
    }
}

// Gets the level or item requirement for evolution
function displayLevelUpRequirement(overview) {
    let levelUpInfoOverview = overview.evolution_details[0]; // Get evolution details for the overview

    // Check if evolution is level-based or item-based, return the requirement
    if (levelUpInfoOverview.min_level !== null && levelUpInfoOverview.min_level !== undefined) {
        let levelUpLevel = levelUpInfoOverview.min_level;
        return levelUpLevel; // Return level requirement
    } else if (levelUpInfoOverview.item && levelUpInfoOverview.item.name) {
        let levelUpItem = levelUpInfoOverview.item.name;
        return levelUpItem; // Return item requirement
    } else {
        return "n/A"; // No requirement found
    }
}

// Clears the container and hides the switch element
function clearContainer() {
    document.getElementById("container").innerHTML = ""; // Clear the container
    document.getElementById("switch").classList.add("d-none"); // Hide the switch element
}

// Fetches Pokémon species data by Pokémon ID
async function fetchPokemonSpecies(pokemonId) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`); // Fetch Pokémon species data
    return await response.json(); // Return JSON data
}

// Fetches the evolution chain from a given URL
async function fetchEvolutionChain(evoChainURL) {
    const response = await fetch(evoChainURL); // Fetch the evolution chain
    return await response.json(); // Return JSON data
}

// Fetches the evolution image for a given species URL
async function getEvolutionImg(speciesUrl) {
    const speciesResponse = await fetch(speciesUrl); // Fetch species data
    const speciesData = await speciesResponse.json(); // Parse species data

    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${speciesData.id}/`); // Fetch Pokémon data by species ID
    const pokemonData = await pokemonResponse.json(); // Parse Pokémon data
    const imageUrl = pokemonData.sprites.other.dream_world.front_default || pokemonData.sprites.other.home.front_default; // Get image URL
    return imageUrl; // Return image URL
}

// Creates the container for the evolution chain display
async function createEvolutionContainer() {
    const containerRef = document.getElementById("container"); // Get container element reference
    containerRef.innerHTML = evolutionChainContainerTemplate(); // Set inner HTML with the evolution chain template
}

// Functions to display evolution stages and arrows in the container
function displayBaseEvo(img, name) {
    const container = document.getElementById("evo-container-base"); // Get the base evolution container
    container.innerHTML = baseEvoTemplate(img, name); // Display base evolution image and name
}

function displayFirstEvo(img, name) {
    const container = document.getElementById("evo-container-first-evo"); // Get first evolution container
    container.innerHTML += firstEvoTemplate(img, name); // Append first evolution image and name
}

function displaySecondEvo(img, name) {
    const container = document.getElementById("evo-container-second-evo"); // Get second evolution container
    container.innerHTML += secondEvoTemplate(img, name); // Append second evolution image and name
}

// Function to display the arrow with evolution trigger and level/item requirement
function displayArrow(id, evolutionTriggerName, levelUpRequerment) {
    document.getElementById(`${id}`).innerHTML = ""; // Clear existing arrow content
    document.getElementById(`${id}`).innerHTML = arrowTemplate(evolutionTriggerName, levelUpRequerment); // Set new arrow content
}