package com.github.erykamarcal.pokemon_api.client.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import tools.jackson.databind.PropertyNamingStrategies;
import tools.jackson.databind.annotation.JsonNaming;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record PokemonDetailResponse(
        String name,
        int height,
        int weight,
        Sprites sprites,
        List<TypeSlot> types,
        List<StatSlot> stats,
        List<AbilitySlot> abilities

) {
    @JsonIgnoreProperties(ignoreUnknown = true)
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public record Sprites(String frontDefault, String frontShiny) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record TypeSlot(Type type) {

        @JsonIgnoreProperties(ignoreUnknown = true)
        public record Type(String name) {
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record StatSlot(
            @JsonProperty("base_stat") int baseStat, Stat stat) {
        @JsonIgnoreProperties(ignoreUnknown = true)
        public record Stat(
                String name
        ) {}
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record AbilitySlot(
            Ability ability,
            @JsonProperty("is_hidden") boolean isHidden
    ) {
        @JsonIgnoreProperties(ignoreUnknown = true)
        public record Ability(String name) {
        }
    }
}
/* @JsonIgnoreProperties(ignoreUnknown = true) é ser um escudo antierros,
ignora no JSON retornado os campos que aqui não foram declarados.

@JsonProperty = Aviso sobre a convenção de escrita diferente
 */


