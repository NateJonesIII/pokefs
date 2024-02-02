import { Interface } from "readline";

export { };

export interface Pokemon {
    id: number;
    name: string;
    types: string[];
    abilities: string[];
    image: string;
    user: string;
}

export interface PokemonProps {
    pokemons: Pokemon[]
}

export interface PokeItemProps {
    pokemon: Pokemon
}