const lista = document.getElementById('lista');
const detalle = document.getElementById('detalle');

async function cargarLista() {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
    const data = await res.json();

    data.results.forEach(pokemon => {
      const div = document.createElement('div');
      div.textContent = pokemon.name.toUpperCase();
      div.classList.add('pokemon-item');
      div.onclick = () => mostrarDetalle(pokemon.url);
      lista.appendChild(div);
    });
  } catch {
    detalle.textContent = 'Error cargando Pokémon';
  }
}

async function mostrarDetalle(url) {
  try {
    const res = await fetch(url);
    const p = await res.json();

    detalle.innerHTML = `
      <h2>${p.name.toUpperCase()}</h2>
      <img src="${p.sprites.front_default}" alt="${p.name}" />
      <p><strong>Altura:</strong> ${p.height}</p>
      <p><strong>Peso:</strong> ${p.weight}</p>
      <p><strong>HP:</strong> ${p.stats[0].base_stat}</p>
    `;
  } catch {
    detalle.textContent = 'Error cargando detalles';
  }
}

cargarLista();
