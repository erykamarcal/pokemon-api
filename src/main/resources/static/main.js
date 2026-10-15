const API_BASE = 'http://localhost:8080/api/pokemons';

async function carregarLista() {
    try {
        const response = await fetch(API_BASE);
        const data = await response.json();

        const listContainer = document.getElementById('pokemonList');
        listContainer.innerHTML = '';
        data.results.forEach((pokemon, index) => {
            const item = document.createElement('div');
            item.className = 'pokemon-item';

            item.innerText = `#${index + 1} - ${pokemon.name}`;

            item.onclick = () => carregarDetalhes(pokemon.name);

            listContainer.appendChild(item);
        });
    } catch (error) {
        console.error("Erro ao buscar lista:", error);
        document.getElementById('pokemonList').innerHTML = '<p style="color:red; text-align:center;">Erro ao carregar a lista do backend.</p>';
    }


}

// Carregar os detalhes do Pokémon escolhido
async function carregarDetalhes(nome) {
    const detailContainer = document.getElementById('pokemonDetail');
    detailContainer.innerHTML = 'Carregando ficha...';

    try {
        const response = await fetch(`${API_BASE}/${nome}`);
        const pokemon = await response.json();
        const tiposHtml = pokemon.types.map(t => `<span class="type-badge">${t.type.name}</span>`).join('');
        const habilidadesHtml = pokemon.abilities.map(a => {
            return `<li>${a.ability.name} ${a.isHidden ? '(Oculta)' : ''}</li>`;
        }).join('');

        const statsHtml = pokemon.stats.map(s => {
            return `<div><strong>${s.stat.name.toUpperCase()}:</strong> ${s.base_stat}</div>`;
        }).join('');

        detailContainer.innerHTML = `
       <div class="pokemon-card" style="overflow-y: auto; max-height: 520px; text-align: left;">
                <div style="text-align: center;">
                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" style="width: 120px; height: 120px;">
                    <h2>${pokemon.name}</h2>
                </div>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;">
                <p><strong>Altura:</strong> ${pokemon.height / 10} m | <strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
                
                <div style="margin-bottom: 10px;">
                    <strong>Tipos:</strong>
                    <div class="types" style="display: inline-flex; margin-left: 5px;">${tiposHtml}</div>
                </div>

                <div style="margin-bottom: 10px;">
                    <strong>Habilidades:</strong>
                    <ul style="margin: 5px 0; padding-left: 20px; font-size: 14px;">${habilidadesHtml}</ul>
                </div>

                <div>
                    <strong>Estatísticas (Stats):</strong>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px; font-size: 13px; margin-top: 5px; background: #f9f9f9; padding: 10px; border-radius: 6px;">
                        ${statsHtml}
                </div>
            </div>
        </div>
    `;
    } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
        detailContainer.innerHTML = '<p style="color:red;">Erro ao carregar os detalhes do Pokémon.</p>';
    }
}
carregarLista();

