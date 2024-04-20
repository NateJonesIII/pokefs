// PokeList
import { PokemonProps } from "../types/types"
import './poke_container.css'
import './pokeList.css'
import PokeItem from "./PokeItem"
import {AVAILABLE_FLOW} from '../constants/constants'

const pokeList: React.FC<PokemonProps> = ({
    pokemons, removePokemonFromState, addPokemonToState
}) => {
    return(
        <div className="outer-container">
            <h1 className="mainHeader">Pokebrary</h1>
            <div className="pokemon-container">
                {
                    pokemons.map((pokemon, index) => {
                        return (
                                <PokeItem flow='available' pokemon={pokemon} key={index} 
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