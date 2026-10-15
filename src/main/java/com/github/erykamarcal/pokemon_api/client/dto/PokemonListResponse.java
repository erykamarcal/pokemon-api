package com.github.erykamarcal.pokemon_api.client.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record PokemonListResponse(
    int count,
    List<PokemonSummary> results
) {

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record PokemonSummary(
        String name,
        String url
    ) {}
}