package com.github.erykamarcal.pokemon_api.service;

import com.github.erykamarcal.pokemon_api.client.dto.PokemonDetailResponse;
import com.github.erykamarcal.pokemon_api.client.dto.PokemonListResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class PokemonService {

    private final RestTemplate restTemplate;
    private static final String POKE_API_BASE = "https://pokeapi.co/api/v2/pokemon";

    public PokemonService() {
        this.restTemplate = new RestTemplate();
    }

    public PokemonListResponse listarPrimeiraGeracao() {
        String url = POKE_API_BASE + "?limit=151&offset=0";
        return restTemplate.getForObject(url, PokemonListResponse.class);
    }

    public PokemonDetailResponse findPokemonByName(String nome) {
        String url = POKE_API_BASE + "/" + nome.toLowerCase();
        return restTemplate.getForObject(url, PokemonDetailResponse.class);
    }
}