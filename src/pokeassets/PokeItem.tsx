import { PokeItemProps, Pokemon } from "../types/types";
import './pokeItem.css'
import { addDoc, getFirestore, collection, CollectionReference } from 'firebase/firestore'

const PokeItem: React.FC<PokeItemProps> = ({
    pokemon, flow, onAdd, onRemove
}) => {
    // destructure
    const {pokedexEntry,image, name, types, abilities, user: userEmail} = pokemon;

    // log value to see what its sending, clear warning of non use as well
    //console.log('userEmail', userEmail);

    // database call function
    const db = getFirestore();

    const handleAddPokemon = (pokemon: Pokemon): void => { 

        const pokemonCollection = collection(db, "pokemon")
        if (!(pokemonCollection instanceof CollectionReference)){
            console.log("Invalid CollectionReference: ", pokemonCollection)
            return
        }

        addDoc(collection(db, "pokemon"), pokemon).then(() => {
            // call the onAdd function here to add doc to database
            onAdd!(pokemon); // "!" ignore undefined function error

            console.log(pokemon.name + ' was sent to pc');

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
                    Type:  <br></br>
                </span> 
                  {types.join(", ")}
            </p>
            <p>
                <span>
                Ability: <br></br>
                </span>
                  {abilities.join(", ")}
            </p>

            <button className="add-pokemon-button" onClick={()=>handleAddPokemon(pokemon)}>Add</button>
        </div>
    </div>)
    
}

export default PokeItem;