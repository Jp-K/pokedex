// import logo from '../logo.svg';
import '../App.css';
import PokedexImg from '../Images/pokedex.png'
import { useState, useEffect } from 'react';
import axios from 'axios';

const pokeUrl = 'https://pokeapi.co/api/v2/pokemon/';


function Pokedex() {

    // const [pokemonSearch, setPokemonSearch] = useState("");
    let pokemonSearch = "";
    const [pokemonNumber, setPokemonNumber] = useState(1);
    const [pokemonGif, setPokemonGif] = useState("");

    async function getPokemon() {
        const pokemon = await axios.get(pokeUrl+pokemonNumber)
        if (pokemon) {
          if (pokemon.data.sprites.versions['generation-v']['black-white'].animated.front_default) {
            setPokemonGif(pokemon.data.sprites.versions['generation-v']['black-white'].animated.front_default)
          } else {
            setPokemonGif(pokemon.data.sprites.versions['generation-v']['black-white'].front_default)
          }
        }
    }
    async function getPokemonByString() {
      if(pokemonSearch.length) {
        const pokemon = await axios.get(pokeUrl+pokemonSearch.toLowerCase())
        if (pokemon) {
          if (pokemon.data.sprites.versions['generation-v']['black-white'].animated.front_default) {
            setPokemonGif(pokemon.data.sprites.versions['generation-v']['black-white'].animated.front_default)
          } else {
            setPokemonGif(pokemon.data.sprites.versions['generation-v']['black-white'].front_default)
          }
          setPokemonNumber(pokemon.data.id)
        }
      }   
    }
    function nextPokemon() {
        setPokemonNumber(pokemonNumber+1)
    }

    function previousPokemon() {
        if (pokemonNumber > 1) {
          setPokemonNumber(pokemonNumber-1)
        }
    }

    function onInputchange(e) {
      pokemonSearch = e.target.value
    }

    useEffect(() => {
        getPokemon()
    }, [pokemonNumber]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={PokedexImg} className="App-logo" alt="logo" />
        <img src={pokemonGif} className="pokemon_image" alt="logo" />
        <input className='inputPokemon' onChange={onInputchange}></input>

        <div className='crossCenter' onClick={getPokemonByString}>
            <div className='crossTop'></div>
            <div className='crossBottom'></div>
            <div className='crossLeft' onClick={previousPokemon}></div>
            <div className='crossRight' onClick={nextPokemon}></div>
            <div className='crossCircle'></div>
        </div>
      </header>
    </div>
  );
}

export default Pokedex;
