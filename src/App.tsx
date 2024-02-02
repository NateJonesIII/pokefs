import React from 'react';
import PokeList from './pokeassets/PokeList';
import './main.css';
/* Test case pokemon */
const pokemons = [
  {
    name: 'Weedle',
    id: 12,
    types: ['bug', 'poison'],
    abilities:['overgrow'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/shiny/13.png',
    user: 'user@email.com'
  }
]

function App() {
  return (
    <div className="App">
      <PokeList pokemons={pokemons} />
    </div>
  );
}

export default App;
