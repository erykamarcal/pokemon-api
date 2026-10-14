package com.github.erykamarcal.pokemon_api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.github.erykamarcal.pokemon_api.client.dto.PokemonDetailResponse;
import com.github.erykamarcal.pokemon_api.client.dto.PokemonListResponse;
import com.github.erykamarcal.pokemon_api.service.PokemonService;

@RestController
@RequestMapping("/api/pokemons")
public class PokemonController {

    private final PokemonService pokemonService;

    public PokemonController(PokemonService pokemonService) {
        this.pokemonService = pokemonService;
    }

    @GetMapping
    public PokemonListResponse listarPokemons() {
        return pokemonService.listarPrimeiraGeracao();
    }

    @GetMapping("/{nome}")
    public PokemonDetailResponse obterFichaPokemon(@PathVariable String nome) {
        return pokemonService.findPokemonByName(nome);
    }
}
