export { };

export interface Ability{
    ability: {
        name: string;
    }
}

export interface Type{
    type: {
        name: string;
    }
}

export interface PokedexEntry{
    pokedexEntry: {
        id: number;
    }
}

export interface Pokemon {
    id: number;
    name: string;
    types: string[];
    abilities: string[];
    image: string;
    pokedexEntry: number;
    user?: string;
}

export interface PokemonProps {
    pokemons: Pokemon[]
}

export interface PokeItemProps {
    pokemon: Pokemon
}