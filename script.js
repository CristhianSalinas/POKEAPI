const pokedex = document.getElementById('pokedex');

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

    li.onclick = () => alert(`Nombre: ${details.name}\nAltura: ${details.height}\nPeso: ${details.weight}`);

    pokedex.appendChild(li);
  }
}

// Ejecuta al cargar la página
displayPokemonList();
