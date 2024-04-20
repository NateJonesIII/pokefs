import { PokeItemProps, Pokemon } from "../types/types";
import './pokeItem.css'
import { useState, useEffect } from "react";
import {AVAILABLE_FLOW, USER_FLOW, ADD_TEXT, OWNED_TEXT} from '../constants/constants'
import { addDoc, getFirestore, collection, CollectionReference, where, query, getDocs, deleteDoc } from 'firebase/firestore'


const PokeItem: React.FC<PokeItemProps> = ({
    pokemon, flow, onAdd, onRemove
}) => {
    // destructure
    const {pokedexEntry,image, name, types, abilities, user: userEmail} = pokemon;

    // log value to see what its sending, clear warning of non use as well
    //console.log('userEmail', userEmail);

    // database call function
    const db = getFirestore();

    const [owned,SetOwned] = useState<boolean>(false);

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

    useEffect(()=> {
        const checkIfMonInTeam = async (pokemonName: string): Promise<void> => {
            const userPokemonCollection = collection(db,"pokemon");

            const isOwnedQuery = query(userPokemonCollection,
                where("name","==", pokemonName),
                where("user","==", userEmail),
                );

            const queryCapture = await getDocs(isOwnedQuery);
            SetOwned(!queryCapture.empty)
        }
        checkIfMonInTeam(name);
    }, [db, name, userEmail]);
    console.log(owned)

    // if pokemon is value is owned and in user profile change button to remove bool val
    const addText: string = !owned ? ADD_TEXT : OWNED_TEXT

    const isUserFlow: boolean = flow === USER_FLOW;

    const isAvailableFlow: boolean = flow === AVAILABLE_FLOW;

    const handleRemovePokemon = async(pokemonName: string): Promise<void> => {
        try {
            const pokemonCollection = collection(db,"pokemon");
            const deleteQuery = query(pokemonCollection,
                where("name", "==", pokemonName)
                );

                const queryCapture = await getDocs(deleteQuery);
                // if not found
                if(queryCapture.docs.length === 0) {
                    console.error("No pokemon found by that name " + pokemonName)
                    return;
                }

                const pokemonDoc = queryCapture.docs[0];

                console.log('queryCapture', queryCapture);
                //console.log('pokemonDoc', pokemonDoc);

                await deleteDoc(pokemonDoc.ref)
                onRemove!(pokemonName) 
        } catch (error) {
            console.error("Error found: ", error)
        }
    }

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

            {isAvailableFlow &&
                <button className="add-pokemon-button" 
                onClick={()=>handleAddPokemon(pokemon)}
                disabled={owned}
                >{addText}</button>
            }
            {isUserFlow &&
                <button className="add-pokemon-button" 
                onClick={()=>handleRemovePokemon(name)}
                >Remove</button>
            }
        </div>
    </div>)
    
}

export default PokeItem;