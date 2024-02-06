import { PokemonProps } from "../types/types"
import './poke_container.css'
import PokeItem from "./PokeItem"

const pokeList: React.FC<PokemonProps> = ({
    pokemons
}) => {
    return(
        <div className="outer-container">
            <h1>Pokemon Catalogue</h1>
            <div className="pokemon-container">
                {
                    pokemons.map((pokemon, index) => {
                        return (
                                <PokeItem pokemon={pokemon} key={index} />
                        )
                    })
                }
            </div>
            <div className="footer"> @2024 PokeCatalogue</div>
        </div>
    )
}

export default pokeList;