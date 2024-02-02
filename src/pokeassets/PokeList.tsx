import { PokemonProps } from "../types/types"
import './poke_container.css'
import PokeItem from "./poke_items"

const pokeList: React.FC<PokemonProps> = ({
    pokemons
}) => {
    return(
        <div className="outer-container">
            <h1>Pokemon List</h1>
            {
                pokemons.map((pokemon) => {
                    return (
                       <PokeItem pokemon={pokemon} key={index} />
                    )
                }
                )
            }
        </div>
    )
}

export default pokeList