function renderTable(statName, statValue) {
    return `  
    <div class="d-flex mb-2 w-100">
      <div id="statName">${statName}:</div>
      <div class="progress w-100">
        <div class="progress-bar progress-bar-striped progress-bar-animated text-start" role="progressbar" style="width: ${statValue * 0.7}%">
           <div class="ms-2"> ${statValue}</div>
        </div>
      </div>
    </div>`;
}

function renderSpiderCart() {
    return `
    <svg id="spider-chart" viewBox="-178 -110 300 230" xmlns="http://www.w3.org/2000/svg">
    <!-- Maximalwert Rahmen -->
    <polygon
      points="100,0 50,86.6 -50,86.6 -100,0 -50,-86.6 50,-86.6"
      fill="none"
      stroke="gray"
      stroke-width="1"
    />

    <!-- Radiale Linien -->
    <line x1="0" y1="0" x2="100" y2="0" stroke="gray" />
    <line x1="0" y1="0" x2="50" y2="86.6" stroke="gray" />
    <line x1="0" y1="0" x2="-50" y2="86.6" stroke="gray" />
    <line x1="0" y1="0" x2="-100" y2="0" stroke="gray" />
    <line x1="0" y1="0" x2="-50" y2="-86.6" stroke="gray" />
    <line x1="0" y1="0" x2="50" y2="-86.6" stroke="gray" />
    <polygon id="data-polygon" class="default" fill="" stroke="gray" stroke-width="1" />

    <!-- Beschriftungen -->
    <text x="105" y="0" font-size="10" fill="black" id="hp-label">HP</text>
    <text x="55" y="95" font-size="10" fill="black" id="attack-label">Attack</text>
    <text x="-65" y="95" font-size="10" fill="black" id="defense-label">Defense</text>
    <text x="-175" y="0" font-size="10" fill="black" id="special-attack-label">Special Attack</text>
    <text x="-65" y="-95" font-size="10" fill="black" id="special-defense-label">Special Defense</text>
    <text x="55" y="-95" font-size="10" fill="black" id="speed-label">Speed</text>
  </svg>`
}

function renderStatsContainer() {
    return `
    <div id="stats-table" class="d-none w-100 mt-2"></div>   
    <div id="spider-chart-container" class="d-flex justify-content-center align-items-center w-100"></div>`

}