const API_BASE = 'http://localhost:8080/api/pokemons';

async function carregarLista() {
    const listContainer = document.getElementById('pokemonList');

    try {
        const response = await fetch(API_BASE);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        listContainer.innerHTML = '';

        // Trata tanto array direto quanto retorno com objeto { results: [...] }
        const pokemons = data.results || data;

        pokemons.forEach((pokemon, index) => {
            const item = document.createElement('div');
            item.className = 'pokemon-item';
            item.tabIndex = 0;
            item.setAttribute('role', 'button');

            // Formata o ID com 3 dígitos (ex: 001 - BULBASAUR)
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

        // Já abre o primeiro Pokémon, como na referência
        const primeiro = listContainer.querySelector('.pokemon-item');
        if (primeiro) primeiro.click();
    } catch (error) {
        console.error("Erro ao buscar lista:", error);
        listContainer.innerHTML = '<p class="aviso erro">Erro ao carregar a lista do backend. Verifique se a API está rodando em ' + API_BASE + '</p>';
    }
}

// Carregar os detalhes do Pokémon escolhido
async function carregarDetalhes(nome) {
    const detailContainer = document.getElementById('pokemonDetail');
    detailContainer.innerHTML = '<p class="placeholder-text">Carregando ficha...</p>';

    try {
        const response = await fetch(`${API_BASE}/${nome}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const pokemon = await response.json();

        // 1. Imagem (compatível com snake_case e camelCase)
        const imagemUrl = pokemon.sprites.front_default || pokemon.sprites.frontDefault;

        // 2. Tipos separados por barra
        const tiposHtml = pokemon.types
            .map(t => t.type.name.toUpperCase())
            .join(' / ');

        // 3. Habilidades
        const habilidadesHtml = pokemon.abilities
            .map(a => a.ability.name.toUpperCase())
            .join(', ');

        // 4. Estatísticas empilhadas (compatível com snake_case e camelCase)
        const statsHtml = pokemon.stats.map(s => {
            const valor = s.base_stat !== undefined ? s.base_stat : s.baseStat;
            return `<div>${s.stat.name.toUpperCase()}: ${valor}</div>`;
        }).join('');

        // 5. Montagem da ficha
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
                        <span class="detail-label">ESTATÍSTICAS:</span>
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

carregarLista();