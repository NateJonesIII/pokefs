import { PokemonProps } from "../types/types"
import './poke_container.css'
import PokeItem from "./PokeItem"

const pokeList: React.FC<PokemonProps> = ({
    pokemons, removePokemonFromState, addPokemonToState
}) => {
    return(
        <div className="outer-container">
            <h1>Pokemon Catalogue</h1>
            <div className="pokemon-container">
                {
                    pokemons.map((pokemon, index) => {
                        return (
                                <PokeItem flow='list' pokemon={pokemon} key={index} 
                                onRemove={removePokemonFromState} 
                                onAdd={addPokemonToState}/>
                        )
                    })
                }
            </div>
            <div className="footer"> @2024 PokeDex FS</div>
        </div>
    )
}

export default pokeList;