const lista = document.getElementById("lista");
const detalle = document.getElementById("detalle");

async function cargarLista() {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    const data = await res.json();

    for (let pokemon of data.results) {
      await crearCard(pokemon.url);
    }
  } catch (error) {
    detalle.innerHTML = "❌ Error cargando datos";
  }
}

async function crearCard(url) {
  const res = await fetch(url);
  const data = await res.json();

  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${data.sprites.front_default}" alt="${data.name}">
    <p>${data.name.toUpperCase()}</p>
  `;

  card.onclick = () => mostrarDetalle(data);

  lista.appendChild(card);
}

function mostrarDetalle(pokemon) {
  detalle.innerHTML = `
    <h2>${pokemon.name.toUpperCase()}</h2>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <p><strong>Altura:</strong> ${pokemon.height}</p>
    <p><strong>Peso:</strong> ${pokemon.weight}</p>
    <p><strong>HP:</strong> ${pokemon.stats[0].base_stat}</p>
    <p><strong>Ataque:</strong> ${pokemon.stats[1].base_stat}</p>
    <p><strong>Defensa:</strong> ${pokemon.stats[2].base_stat}</p>
  `;

  detalle.scrollIntoView({ behavior: "smooth" });
}

cargarLista();
