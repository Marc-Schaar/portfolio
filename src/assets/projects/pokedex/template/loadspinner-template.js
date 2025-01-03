function loadSpinner() {
    return `
  <div class="container">
  <img class="position-absolute" id="load-spinner" src="./img/icon/loadspinner.png" alt="Lädt...">
  <svg class="position-absolute" id="spinner-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- Zeichne den ersten Hintergrundkreis -->
  <circle cx="100" cy="100" r="91" fill="none" stroke="lightgrey" stroke-width="4"/>
  
  <!-- Zeichne den ersten sich füllenden Kreis -->
  <circle cx="100" cy="100" r="91" fill="none" stroke="black" stroke-width="4"
          stroke-dasharray="571.77" stroke-dashoffset="571.77"
          transform="rotate(-90 100 100)">
    <animate attributeName="stroke-dashoffset" from="571.77" to="0" dur="2s" repeatCount="indefinite"/>
  </circle>

  <!-- Zeichne den zweiten Hintergrundkreis -->
  <circle cx="100" cy="100" r="97" fill="none" stroke="lightgrey" stroke-width="4"/>
  
  <!-- Zeichne den zweiten sich füllenden Kreis -->
  <circle cx="100" cy="100" r="97" fill="none" stroke="black" stroke-width="4"
          stroke-dasharray="609.60" stroke-dashoffset="609.60"
          transform="rotate(90 100 100)">
    <animate attributeName="stroke-dashoffset" from="609.60" to="0" dur="2s" repeatCount="indefinite"/>
  </circle>
</svg>

</div>

<span id="text" class="text-center"></span>`;
}