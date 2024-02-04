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

export interface Pokemon {
    id: number;
    name: string;
    types: string[];
    abilities: string[];
    image: string;
    user?: string;
}

export interface PokemonProps {
    pokemons: Pokemon[]
}

export interface PokeItemProps {
    pokemon: Pokemon
}