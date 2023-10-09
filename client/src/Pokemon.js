import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import './Pokedex.css'

/* Names of the stats */
const statNames = ['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed']

/* Accepts prop pokedexNum indicating which Pokemon to display.
*  handleBack is a prop used to return to the Pokedex, similar to Pokedex.js' handleBack*/
const Pokemon = ({ pokedexNum, handleBack }) => {
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        /* Fetches the specific Pokemon using the second custom endpoint defined in app.js */
        const fetchPokemonData = async () => {
            try {
                const response = await fetch(`/pokemon/${pokedexNum}`);
                const data = await response.json();
                setPokemon(data);
                setLoading(false); //Stop loading once data is retrieved
            } catch (err) {
                console.log(err);
            }
        };
        fetchPokemonData();
    }, [pokedexNum]);

    if (loading) {
        return <Loading />;
    }

    /* Render Pokemon information */
    return (
        <div style={{textAlign: 'center'}}>
            {/* Render the back button */}
            <button onClick={handleBack}>Back to Pokedex</button>
            {/* Render the Pokemon data */}
            <div className={'pokemon-details'}>
                <h1>{pokemon.name}</h1>
                <img src={pokemon.pictureURL} alt={pokemon.name} height={300} width={300} />
                <div>Type: {pokemon.primaryType} {pokemon.secondaryType !== 'None' && `/ ${pokemon.secondaryType}`}</div>
                <div>Height: {pokemon.height}m</div>
                <div>Weight: {pokemon.weight}kg</div>
                <div>Abilities: {pokemon.abilities.join(", ")}</div>
                <div>Stats:</div>
                <ul>
                    {pokemon.stats.map((stat, index) => (
                        <li key={index}>{statNames[index]}: {stat}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Pokemon;
