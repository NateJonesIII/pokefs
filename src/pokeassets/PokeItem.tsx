import { PokeItemProps } from "../types/types";
import './pokeItem.css'

const PokeItem: React.FC<PokeItemProps> = ({
    pokemon
}) => {
    //destructure
    const {pokedexEntry,image, name, types, abilities, user: userEmail} = pokemon;
    //log value to see what its sending, clear warning of non use as well
    console.log('userEmail', userEmail);
    return( 
    <div className="poke-card">
        <div className="poke-data">
            <p><span>PokeDex#: </span>{pokedexEntry}</p>
            
            <img src={image} alt={name} className="poke-image" />
            <h3>{name}</h3>
            <p>
                <span>
                    Type:  
                </span> 
                  {types.join(", ")}
            </p>
            <p>
                <span>
                Ability: 
                </span>
                  {abilities.join(", ")}
            </p>
        </div>
    </div>)
    
}

export default PokeItem;