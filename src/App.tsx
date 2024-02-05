import React, {useEffect, useState} from 'react';
import PokeList from './pokeassets/PokeList';
import { Pokemon, Type, Ability, PokedexEntry} from './types/types'
import './main.css';
import Register from './auth/Register';

function App() {

  const [pokeList, setPokeList] = useState<Pokemon[]>([])

  useEffect(()=>{
    // fetch pokemon from PokeAPI
    const getPokeListData = async () => {
      const apiUrl: string = "https://pokeapi.co/api/v2";
      const limit: number = 386;
      const offset: number = 0;
      const url: string = `${apiUrl}/pokemon?limit=${limit}&offset=${offset}`;

      try {
        const response = await fetch(url);
        if(!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const pokemonList: {
          name:string;
          url:string;
          id:number;
          types: string[]
        }[] = data.results;

        const updatedPokemonList = await Promise.all(
            pokemonList.map(async (pokemon)=>{
              const response = await fetch(pokemon.url);
              if (!response.ok) {
                throw new Error(`Error fetching data for ${pokemon.name}`)
              }
              const pokemonData = await response.json();
              const types = pokemonData.types.map(({ type }: Type) => type.name)
              const abilities = pokemonData.abilities.map(({ ability }: Ability) => ability.name)
              const pokedexEntry = pokemonData.id;
              console.log('PokeID:', pokedexEntry)
              //console.log('pokemondata', pokemonData)
              //console.log('types', types)
              //console.log('abilities', abilities)

              const { sprites } = pokemonData;
              const image = sprites.front_shiny;

              return {...pokemon, types, abilities, image, pokedexEntry}
            })
        )
console.log('pokelist updated:',updatedPokemonList);
            setPokeList(updatedPokemonList);
        //console.log('data', data);
      } catch (error) {
        console.log("Error fetching data from pokeapi", error);
      }
    }
    getPokeListData();
    // single data call
  },[])

  return (
    <div className="App">
      <Register />
      <PokeList pokemons={pokeList} />
    </div>
  );
}

export default App;
