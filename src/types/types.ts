import { Auth } from "firebase/auth";
export { };

//Authentication Props
export interface AuthProps {
    auth: Auth;
    setIsRegistered: (isRegistered: boolean) => void;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    setUser: (user: string) => void;
}

//Pokemon Interfaces
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
    map: any;
    id: number;
    name: string;
    types: string[];
    abilities: string[];
    image: string;
    pokedexEntry: number;
    user: string;
}

export interface PokemonProps {
    pokemons: Pokemon;
    user: string;
    removePokemonFromState?: Function;
    addPokemonToState?: Function;
}

export interface PokeItemProps {
    pokemon: Pokemon;
    flow: string;
    onRemove?: Function;
    onAdd?: Function ;
}