function renderPkmCard(pokemonIndex) {
    return `<div id="pokemon-card-${pokemonIndex}" onclick="openDetailInfo(event), displayChoosenPokemon(${pokemonIndex})" class="card shadow mb-5 rounded pokemon-card">
                <div class="card-body d-flex column align-items-center justify-content-center pointer gap-3">
                  <span class="position-absolute name" id="id_name${pokemonIndex}"></span>
                  <img class="pokemonImg" id="pokemon-img${pokemonIndex}" src="" alt="Bild" />
                  <div class="d-flex justify-content-center position-absolute pokemon-types-container">
                  <img id="pokemon-first-type-img${pokemonIndex}" class="icon" src="" alt="Bild" />
                   <img id="pokemon-second-type-img${pokemonIndex}" class="icon" src="" alt="Bild" />
                   </div>
                </div>
            </div>`;
}