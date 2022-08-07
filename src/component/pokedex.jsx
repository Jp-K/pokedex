import '../App.css';
import PokedexImg from '../Images/pokedex.png'
import { useState, useCallback } from 'react';
import axios from 'axios';

const pokeUrl = 'https://pokeapi.co/api/v2/pokemon/';


function Pokedex() {

    let pokemonSearch = "";
    const [pokemonNumber, setPokemonNumber] = useState(1);
    const [pokemonGif, setPokemonGif] = useState("");
    const [pokemonData, setPokemon] = useState("");

    const getPokemon = useCallback(async (numberVal) => {
      const num = pokemonNumber + numberVal > 0 ? pokemonNumber + numberVal : pokemonNumber;
      const pokemon = await axios.get(pokeUrl+num);
      if (pokemon) {
        if (pokemon.data.sprites.versions['generation-v']['black-white'].animated.front_default) {
          setPokemonGif(pokemon.data.sprites.versions['generation-v']['black-white'].animated.front_default);
          setPokemon(pokemon.data.name + " - " + pokemon.data.id);
        } else {
          setPokemonGif(pokemon.data.sprites.versions['generation-v']['black-white'].front_default);
          setPokemon(pokemon.data.name + " - " + pokemon.data.id);
        }
      }
      setPokemonNumber(num);
    }, [pokemonNumber]);

    async function getPokemonByString() {
      if(pokemonSearch.length) {
        const pokemon = await axios.get(pokeUrl+pokemonSearch.toLowerCase());
        if (pokemon) {
          if (pokemon.data.sprites.versions['generation-v']['black-white'].animated.front_default) {
            setPokemonGif(pokemon.data.sprites.versions['generation-v']['black-white'].animated.front_default);
            setPokemon(pokemon.data.name + " - " + pokemon.data.id);
          } else {
            setPokemonGif(pokemon.data.sprites.versions['generation-v']['black-white'].front_default);
            setPokemon(pokemon.data.name + " - " + pokemon.data.id);
          }
          setPokemonNumber(pokemon.data.id);
        }
      }
    }

    function onInputchange(e) {
      pokemonSearch = e.target.value;
    }

    if (pokemonGif.length === 0) getPokemon();

  return (
    <div className="App">
      <header className="App-header">
        <img src={PokedexImg} className="App-logo" alt="logo" />
        <img src={pokemonGif} className="pokemon_image" alt="logo" />
        <input className='inputPokemon' onChange={onInputchange}></input>
        <span className='pokemonDescription'>{pokemonData}</span>

        <div className='crossCenter' onClick={getPokemonByString}>
            <div className='crossTop'></div>
            <div className='crossBottom'></div>
            <div className='crossLeft' onClick={() => getPokemon(-1)}></div>
            <div className='crossRight' onClick={() => getPokemon(1)}></div>
            <div className='crossCircle'></div>
        </div>
      </header>
    </div>
  );
}

export default Pokedex;
