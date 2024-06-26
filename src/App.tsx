// App.tsx
import React, {useEffect, useState} from 'react';
import PokeList from './pokeassets/PokeList';
import { Pokemon, Type, Ability, PokedexEntry} from './types/types'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './main.css';
import Register from './auth/Register';
import Login from './auth/Login';
import { getAuth, signOut } from 'firebase/auth';
//Main logo image
import pokeballImg from './assets/pokei_ico.png'
import UserTeam from './pokeassets/userTeam';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
// Import VideoComponent
import VideoComponent from './pokeassets/VideoComponent';
import { ToastContainer } from 'react-toastify';
import { logoutErrorNotification, logoutSuccessNotification } from './notifications/notifications'

function App() {
  // the list to update for pokemon api call
  const [pokeList, setPokeList] = useState<Pokemon[]>([]);
  // auth instance
  const auth = getAuth();
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<string>('');
  const [userTeam, setUserTeam] = useState<Pokemon[]>([]);
  const db = getFirestore();


  useEffect(()=>{
    // fetch pokemon from PokeAPI
    const getPokeListData = async () => {
      const apiUrl: string = "https://pokeapi.co/api/v2";
      const limit: number = 1025;
      const offset: number = 0;
      const url: string = `${apiUrl}/pokemon?limit=${limit}&offset=${offset}`;

      try {
        const response = await fetch(url);
        if(!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        
        const pokemonList: {
          name:string;
          url:string;
          id:number;
          types: string[];
        }[] = data.results;

        const updatedPokemonList = await Promise.all(
            pokemonList.map(async (pokemon)=>{
              const response = await fetch(pokemon.url);
              if (!response.ok) {
                throw new Error(`Error fetching data for ${pokemon.name}`);
              }
              const pokemonData = await response.json();
              const types = pokemonData.types.map(({ type }: Type) => type.name);
              const abilities = pokemonData.abilities.map(({ ability }: Ability) => ability.name);
              const pokedexEntry = pokemonData.id;
              //console.log('PokeID:', pokedexEntry);
              //console.log('pokemondata', pokemonData);
              //console.log('types', types);
              //console.log('abilities', abilities);
              const { sprites } = pokemonData;
              const image = sprites.front_default;

              return {...pokemon, types, abilities, image, pokedexEntry, user}
            })
        )
            setPokeList(updatedPokemonList);
        //console.log('data', data);
      } catch (error) {
        console.log("Error fetching data from pokeapi", error);
      }
    }
    getPokeListData();
    // single data call
  },[db, user])

  const addPokemonToState = (pokemon: Pokemon):void => {
    const updatedPokemon = {...userTeam, pokemon}
    setUserTeam(updatedPokemon);
  }

  const removePokemonFromState = (pokeName: string) => {
    const updatedPokemon = userTeam.filter(({name}) => name!== pokeName)
    setUserTeam(updatedPokemon);
  }

  useEffect(()=>{
    const getUserPokemonData = async () => {
      try {
        const userTeamQuery = query(
          collection(db, "pokemon"),
          where("user", "==", user)
        );

        const queryCapture = await getDocs(userTeamQuery)
        const updatedPokemonList: Pokemon[] = [];// empty by default
      queryCapture.forEach((doc) => {
        updatedPokemonList.push(doc.data() as Pokemon) 
      })

      setUserTeam(updatedPokemonList)

      } catch (error) {
        console.error(" Error getting user pokemon data!")
      }
    }
    getUserPokemonData();
  }, [db,user])

  const handleLogout = async () =>{
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setUser("");
      logoutSuccessNotification(user)
    } catch (error) {
      logoutErrorNotification(error);
    }
  }

  const LoginComponent = (
  <Login 
    auth ={auth}
    setIsLoggedIn={setIsLoggedIn}
    setIsRegistered={setIsRegistered}
    setUser={setUser}
    />
  ) 
  
  const RegisterComponent = (
    <Register 
    auth ={auth}
    setIsLoggedIn={setIsLoggedIn}
    setIsRegistered={setIsRegistered}
    setUser={setUser}
    />
  )
    // holding HomePage html content for cleaner routes
  const HomePage = () => (
    <div>
      <PokeList pokemons={pokeList} user={user} addPokemonToState={addPokemonToState}/>
    </div>
  ) //HomePage end

  const TeamComponent = (
    <UserTeam
    user={user}
    pokemons={userTeam}
    removePokemonFromState={removePokemonFromState}
    />
  )

  // Returning site initial page ui
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <div className="top-container">
          <img src={pokeballImg} alt="pokeball-black-2d"/>
          <h1 className='main-logo-text'>Pokedex FS</h1>
          <nav>
            <ul>
             
              {!isLoggedIn &&
                  <li>
                  <Link to="/login">Login</Link>
                </li>
              }
              <li>
                <Link to="/register">Register</Link>
              </li>

              {isLoggedIn && 
              <div>
                  <li>
                   <Link to="/">Home</Link>
                 </li>
                 <li>
                  <Link to="/team">Team</Link>
                </li>
              </div>
              }
              {isLoggedIn && 
                <li onClick={handleLogout} className='logout-color'>
                  <Link to="/login">Logout</Link>
                </li>
              }
            </ul>
          </nav>
        </div>
        <VideoComponent />
        <Routes>
          <Route path="/register" element={RegisterComponent}/>
          <Route path="/team" element={TeamComponent}/>
          <Route path="/login" element={LoginComponent}/>
          <Route path='/' element={
            //Checking if user is registered first
            isRegistered ? (
              isLoggedIn ?(
                <HomePage />
              ): (LoginComponent)
            ):(
              RegisterComponent
            )
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;