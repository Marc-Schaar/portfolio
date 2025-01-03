// Global variable to track the checkbox status (table or chart view)
let checkboxStatus = false;

// Main function to display the stats of a Pokémon based on its ID
async function showStats(id) {
    // Fetch the Pokémon from either fullPokedex or chunkedPokedex
    let pokemon = await fullPokedex[id] || await chunkedPokedex[id];
    let stats = pokemon.stats;
    resetContainer(); // Reset and prepare the container for displaying stats
    displayStatsValuesInChart(stats); // Display stats values in a spider chart
    displayStatsValuesInTable(stats); // Display stats values in a table format
    updateColorSpiderChart(pokemon); // Update the spider chart colors based on the Pokémon's type
}

// Resets the container and prepares it for the stats display
function resetContainer() {
    clearContainer(); // Clear the current content of the container
    showToggleButton(); // Show the toggle button to switch between table and chart view
    createStatsContainer(); // Create the container to display stats
    createSpiderChart(); // Create the spider chart layout
    restoreCheckboxStatus(); // Restore the view (table or chart) based on previous checkbox status
}

// Shows the toggle button that allows switching between chart and table view
function showToggleButton() {
    document.getElementById("switch").classList.remove("d-none");
}

// Creates the main stats container to display both table and chart
function createStatsContainer() {
    const containerRef = document.getElementById("container");
    containerRef.innerHTML = renderStatsContainer(); // Set up the stats container using a template
}

// Creates the layout for the spider chart
function createSpiderChart() {
    const containerRef = document.getElementById("spider-chart-container");
    containerRef.innerHTML = renderSpiderCart(); // Set up the spider chart using a template
}

// Displays the stats values in a table format
function displayStatsValuesInTable(stats) {
    const statsTableRef = document.getElementById("stats-table");
    // Loop through each stat and display its name and value in the table
    for (const stat of stats) {
        let statName = stat.stat.name.toUpperCase(); // Convert stat name to uppercase
        let statValue = stat.base_stat; // Get the stat value
        statsTableRef.innerHTML += renderTable(statName, statValue); // Add the stat to the table using a template
    }
}

// Displays the stats values in a spider chart
function displayStatsValuesInChart(stats) {
    const maxValue = 250; // Maximum stat value for scaling
    const points = calculatePoints(stats, maxValue); // Calculate chart points based on stats
    document.getElementById("data-polygon").setAttribute("points", points); // Set the calculated points for the polygon
    updateChartLabels(stats); // Update chart labels with stat values
}

// Updates the chart labels with the corresponding stat values
function updateChartLabels(stats) {
    const labels = ["hp", "attack", "defense", "special-attack", "special-defense", "speed"]; // Stat labels
    labels.forEach((label) => {
        const stat = stats.find((s) => s.stat.name === label); // Find the stat for the current label
        const value = stat ? stat.base_stat : 0; // Default to 0 if stat is not found
        const textElement = document.getElementById(`${label}-label`); // Get the SVG text element for the label
        appendValueToLabel(textElement, value); // Append the stat value below the label
    });
}

// Appends the stat value below the given label in the spider chart
function appendValueToLabel(textElement, value) {
    const valueElement = document.createElementNS("http://www.w3.org/2000/svg", "text"); // Create a new SVG text element
    valueElement.setAttribute("x", textElement.getAttribute("x")); // Set the x position to match the label
    valueElement.setAttribute("y", parseInt(textElement.getAttribute("y")) + 12); // Adjust y position to display below the label
    valueElement.setAttribute("font-size", "10"); // Set font size for stat value
    valueElement.setAttribute("fill", "black"); // Set text color to black
    valueElement.textContent = value; // Set the stat value as text content
    textElement.parentNode.appendChild(valueElement); // Append the stat value to the chart
}


// Calculates the points for the spider chart based on stats
function calculatePoints(stats, maxValue) {
    const angle = (2 * Math.PI) / 6; // 360° divided by 6 (for each stat dimension)
    const points = [];
    const dimensions = ["hp", "attack", "defense", "special-attack", "special-defense", "speed"];
    for (let i = 0; i < dimensions.length; i++) {
        const stat = stats.find((s) => s.stat.name === dimensions[i]); // Get the stat value for each dimension
        const value = stat ? stat.base_stat : 0; // Default to 0 if not found
        const x = (value / maxValue) * 100 * Math.cos(angle * i); // Calculate the x-coordinate
        const y = (value / maxValue) * 100 * Math.sin(angle * i); // Calculate the y-coordinate
        points.push(`${x},${y}`); // Add the point to the list
    }
    return points.join(" "); // Return the points as a string to form the polygon
}

// Updates the color of the spider chart based on the Pokémon's type
function updateColorSpiderChart(pokemon) {
    let typeForChart = pokemon.types[0].type.name; // Get the primary type of the Pokémon
    let dataPolygonRef = document.getElementById("data-polygon"); // Get the spider chart polygon element
    dataPolygonRef.classList.add(typeForChart); // Add a class based on the Pokémon's type to style the chart
}

// Toggles between table view and spider chart view based on checkbox status
function toggleStatsView() {
    const statsTable = document.getElementById("stats-table");
    const spiderChart = document.getElementById("spider-chart-container");
    const checkbox = document.getElementById("flexSwitchCheckDefault");

    checkboxStatus = checkbox.checked; // Update the global checkbox status

    if (checkbox.checked) {
        // If checkbox is checked, show the table and hide the spider chart
        statsTable.classList.remove("d-none");
        spiderChart.classList.add("d-none");
    } else {
        // If checkbox is unchecked, show the spider chart and hide the table
        statsTable.classList.add("d-none");
        spiderChart.classList.remove("d-none");
    }
}

// Restores the table or chart view based on the previous checkbox status
function restoreCheckboxStatus() {
    const statsTable = document.getElementById("stats-table");
    const spiderChart = document.getElementById("spider-chart-container");
    const checkbox = document.getElementById("flexSwitchCheckDefault");

    checkbox.checked = checkboxStatus; // Restore the previous checkbox state

    if (checkboxStatus) {
        // Show the table if checkbox was previously checked
        statsTable.classList.remove("d-none");
        spiderChart.classList.add("d-none");
    } else {
        // Show the spider chart if checkbox was previously unchecked
        statsTable.classList.add("d-none");
        spiderChart.classList.remove("d-none");
    }
}