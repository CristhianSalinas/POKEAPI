const pokedex = document.getElementById('pokedex');
const modal = document.getElementById('pokemon-modal');
const modalBody = document.getElementById('modal-body');
const closeModalBtn = document.getElementById('close-modal');

async function fetchPokemonList(limit = 50) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching Pokémon list:', error);
    return [];
  }
}

async function fetchPokemonDetails(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
    return null;
  }
}

async function displayPokemonList() {
  const pokemonList = await fetchPokemonList(50);

  for (const pokemon of pokemonList) {
    const details = await fetchPokemonDetails(pokemon.url);
    if (!details) continue;

    const li = document.createElement('li');
    li.className = 'pokemon-card';

    li.innerHTML = `
      <img src="${details.sprites.front_default}" alt="${details.name}" />
      <div class="pokemon-name">${details.name}</div>
    `;

    li.onclick = () => showPokemonDetails(details);

    pokedex.appendChild(li);
  }
}

function showPokemonDetails(details) {
  modalBody.innerHTML = `
    <h2 style="text-transform: capitalize;">${details.name}</h2>
    <img src="${details.sprites.front_default}" alt="${details.name}" />
    <p><strong>Altura:</strong> ${details.height}</p>
    <p><strong>Peso:</strong> ${details.weight}</p>
    <div class="stats">
      <h3>Estadísticas:</h3>
      ${details.stats.map(stat => `
        <div class="stat">
          ${stat.stat.name}: ${stat.base_stat}
        </div>
      `).join('')}
    </div>
  `;

  modal.classList.remove('hidden');
}

closeModalBtn.onclick = () => {
  modal.classList.add('hidden');
};

// Ejecuta al cargar la página
displayPokemonList();
