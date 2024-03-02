import { PokeItemProps } from "../types/types";
import './pokeItem.css'
import { addDoc, getFirestore, collection } from 'firebase/firestore'

const PokeItem: React.FC<PokeItemProps> = ({
    pokemon, flow, onAdd, onRemove
}) => {
    // destructure 
    const {pokedexEntry,image, name, types, abilities, user: userEmail} = pokemon;

    // log value to see what its sending, clear warning of non use as well
    console.log('userEmail', userEmail);

    // database call function
    const db = getFirestore();

    const handleAddPokemon = (pokemon): void => { 

        addDoc(collection(db, "pokemon"), pokemon).then(() => {
            // call the onAdd function here to add doc to database
            onAdd(pokemon);
            console.log(pokemon + 'was successfully added to firestore');
        }).catch((error) => {
            console.log("Error adding the document", error);
        })
    };

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

            <button className="add-pokemon-button" onClick={()=>handleAddPokemon(pokemon)}>Add</button>
        </div>
    </div>)
    
}

export default PokeItem;