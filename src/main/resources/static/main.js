const API_BASE = 'https://pokeapi.co/api/v2/pokemon';

async function buscarJson(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
}

async function carregarLista() {
    const listContainer = document.getElementById('pokemonList');

    try {
        const data = await buscarJson(API_BASE);
        listContainer.innerHTML = '';

        const pokemons = data.results || data;

        pokemons.forEach((pokemon, index) => {
            const item = document.createElement('div');
            item.className = 'pokemon-item';
            item.tabIndex = 0;
            item.setAttribute('role', 'button');

            const numeroFormatado = String(index + 1).padStart(3, '0');
            item.innerText = `${numeroFormatado} - ${pokemon.name.toUpperCase()}`;

            const selecionar = () => {
                document.querySelectorAll('.pokemon-item').forEach(el => el.classList.remove('active'));
                item.classList.add('active');
                carregarDetalhes(pokemon.name);
            };

            item.onclick = selecionar;
            item.onkeydown = (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selecionar();
                }
            };

            listContainer.appendChild(item);
        });

        const primeiro = listContainer.querySelector('.pokemon-item');
        if (primeiro) primeiro.click();
    } catch (error) {
        console.error("Erro ao buscar lista:", error);
        listContainer.innerHTML = '<p class="aviso erro">Erro ao carregar a lista do backend. Verifique se a API está rodando em ' + API_BASE + '</p>';
    }
}

async function carregarDetalhes(nome) {
    const detailContainer = document.getElementById('pokemonDetail');
    detailContainer.innerHTML = '<p class="placeholder-text">Carregando ficha...</p>';

    try {
        const pokemon = await buscarJson(`${API_BASE}/${nome}`);

        const imagemUrl = pokemon.sprites.front_default || pokemon.sprites.frontDefault;

        const tiposHtml = pokemon.types
            .map(t => t.type.name.toUpperCase())
            .join(' / ');

        const habilidadesHtml = pokemon.abilities
            .map(a => a.ability.name.toUpperCase())
            .join(', ');

        const statsHtml = pokemon.stats.map(s => {
            const valor = s.base_stat !== undefined ? s.base_stat : s.baseStat;
            return `<div>${s.stat.name.toUpperCase()}: ${valor}</div>`;
        }).join('');

        detailContainer.innerHTML = `
            <div class="pokemon-card">
                <div class="pokemon-card-image-box">
                    <img src="${imagemUrl}" alt="${pokemon.name}">
                </div>

                <h2>${pokemon.name}</h2>
                <hr>

                <div class="info">
                    <div><span class="detail-label">ALTURA:</span> ${pokemon.height / 10} M</div>
                    <div><span class="detail-label">PESO:</span> ${pokemon.weight / 10} KG</div>
                    <div><span class="detail-label">TIPOS:</span> ${tiposHtml}</div>
                    <div><span class="detail-label">HABILIDADES:</span> ${habilidadesHtml}</div>
                    <div class="stats">
                        <span class="detail-label">ESTATISTICAS:</span>
                        <div class="stats-grid">${statsHtml}</div>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
        detailContainer.innerHTML = '<p class="aviso erro">Erro ao carregar os detalhes do Pokémon.</p>';
    }
}

carregarLista().catch(console.error);