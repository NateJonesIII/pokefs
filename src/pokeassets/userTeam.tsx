import { useState } from "react"
import { PokemonProps } from "../types/types"
import {USER_FLOW} from '../constants/constants'
import './poke_container.css'
import PokeItem from "./PokeItem"
import React from "react"

const userTeam: React.FC<PokemonProps> = ({
    user, pokemons, removePokemonFromState, 
}) => {
    
    return(
        <div className="outer-container">
            <h1><span style={{color:"yellow"}}>{user}'s </span>Team</h1>
            <div className="pokemon-container">
                {
                    pokemons.map((pokemon, index) => {
                        return (
                                <PokeItem 
                                flow={USER_FLOW}
                                pokemon={pokemon} 
                                key={index} 
                                onRemove={removePokemonFromState}
                                />
                        )
                    })
                }
            </div>
            <div className="footer"> @2024 PokeDex FS</div>
        </div>
    )
}

export default userTeam;