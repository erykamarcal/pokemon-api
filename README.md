# Pokédex – 1ª Geração

API REST em Java com Spring Boot que consome a [PokéAPI](https://pokeapi.co) e disponibiliza os 151 Pokémons da primeira geração, com uma interface web para visualizar a ficha de cada um.

## Funcionalidades
- Listagem dos Pokémons da 1ª geração (#001 a #151)
- Ficha com tipos, habilidades, altura, peso, estatísticas base e sprite
- Navegação por clique ou teclado (Enter e Espaço)

## Tecnologias
- Java 21, Spring Boot (Spring Web), Maven
- Jackson para desserialização do JSON, com `record` para os DTOs
- HTML, CSS e JavaScript (Fetch API)

## Endpoints

| Método | Rota                  | Descrição                        |
|--------|-----------------------|----------------------------------|
| GET    | /api/pokemons         | Lista os Pokémons da 1ª geração  |
| GET    | /api/pokemons/{nome}  | Retorna a ficha de um Pokémon    |

Exemplo: `GET /api/pokemons/pikachu`

## Como executar

Pré-requisito: JDK 21 instalado.

```bash
./mvnw spring-boot:run
```

Depois, acesse [http://localhost:8080](http://localhost:8080). A interface é servida pelo próprio Spring, a partir da pasta `src/main/resources/static`.

## Aprendizados

Este foi meu primeiro projeto consumindo dados de uma API externa e o primeiro em que usei Spring Boot de fato. Os principais pontos que pratiquei foram:

- **Consumo de API externa:** entender a estrutura do JSON da PokéAPI e mapear apenas os campos que eu precisava.
- **Mapeamento de JSON:** usar `record` com `@JsonIgnoreProperties(ignoreUnknown = true)` e `@JsonNaming` para lidar com a diferença entre `snake_case` da API e `camelCase` do Java.
- **Estrutura de uma API REST:** separar controller e service, usar `@GetMapping` e `@PathVariable` e injetar dependências pelo construtor.
- **Integração front-end e back-end:** servir a interface pelo Spring Boot, o que dispensou configuração de CORS, e consumir os endpoints com `fetch`.
- **Tratamento de erros e conversão de dados:** exibir mensagens quando a API falha e converter altura e peso (que vêm em decímetros e hectogramas) para metros e quilos.

Próximos passos: testes automatizados, cache das respostas da PokéAPI e tratamento de Pokémon não encontrado com status 404.
