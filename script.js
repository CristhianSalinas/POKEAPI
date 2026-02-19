const lista = document.getElementById("lista");
const detalle = document.getElementById("detalle");

async function cargarLista() {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=15");
    const data = await res.json();

    for (let pokemon of data.results) {
        const resDetalle = await fetch(pokemon.url);
        const dataDetalle = await resDetalle.json();

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${dataDetalle.sprites.front_default}">
            <p>${dataDetalle.name}</p>
        `;

        card.onclick = () => mostrarDetalle(dataDetalle);

        lista.appendChild(card);
    }
}

function mostrarDetalle(pokemon) {
    detalle.innerHTML = `
        <h2>${pokemon.name.toUpperCase()}</h2>
        <img src="${pokemon.sprites.front_default}">
        <p>Altura: ${pokemon.height}</p>
        <p>Peso: ${pokemon.weight}</p>
        <p>HP: ${pokemon.stats[0].base_stat}</p>
    `;
}

cargarLista();
