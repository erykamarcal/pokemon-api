package com.github.erykamarcal.pokemon_api.client.dto;

import java.util.List;

public record PokemonListResponse(
    int count,
    List<PokemonSummary> results
) {
    public record PokemonSummary(
        String name,
        String url
    ) {}
}