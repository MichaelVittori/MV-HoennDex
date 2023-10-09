import React, { useEffect, useState } from "react";
import Loading from "./Loading.js";
import Pokemon from "./Pokemon.js";


/* Display 4 rows of 9 Pokemon. I originally had some rudimentary resizing working here but it caused more harm than good. */
const PAGE_SIZE = 36;


/* Fetches all the Pokemon data from the first custom endpoint, displays them in tabular form.
*  handleBack prop used to return to landing screen if desired. */
const Pokedex = ({ handleBack }) => {
    const [pokedex, setPokedex] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                const res = await fetch("/pokemon");
                const data = await res.json();
                setPokedex(data);
                setLoading(false); //Stop loading when data is retrieved
            } catch (err) {
                console.log(err);
            }
        };
        fetchPokemonData();
    }, []);

    /* I thought using pages would be more fun than having users scroll, so I split the Pokemon among a couple pages*/
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const currentPokemon = pokedex.slice(startIndex, endIndex);

    /* Callback for moving to next page */
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    /* Callback for moving to previous page */
    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    /* Display selected Pokemon information */
    const handlePokemonClick = (pokedexNum) => {
        setSelectedPokemon(pokedexNum);
    };

    /* Return to Pokedex is user clicks the return button in Pokemon.jss */
    const handlePokemonBack = () => {
        setSelectedPokemon(null);
    };

    /* If loading, display loading screen */
    if (loading) {
        return <Loading />;
    }

    /* If a Pokemon's selected, display it */
    if (selectedPokemon) {
        return <Pokemon pokedexNum={selectedPokemon} handleBack={handlePokemonBack} />;
    }

    const pokemonList = currentPokemon.map((pokemon) => {
        return (
            /* Create each Pokemon entry for the Pokedex */
            <div
                key={pokemon.pokedexNum}
                className="pokemon-container"
                onClick={() => handlePokemonClick(pokemon.pokedexNum)}
                style={{ cursor: "pointer" }}
            >
                {/* Display Pokemon picture */}
                <div className="pokemon-container-frame">
                    <div className="pokemon-container-img">
                        <img
                            src={pokemon.pictureURL}
                            alt={pokemon.name}
                            height={100}
                            width={100}
                        />
                    </div>
                </div>
                {/* Add Pokemon name and types */}
                <div className="pokemon-name-container">
                    <p>{pokemon.name}</p>
                    <p>
                        {pokemon.primaryType} {pokemon.secondaryType !== "None" && ` / ${pokemon.secondaryType}`}
                    </p>
                </div>
            </div>
        );
    });

    const totalPages = Math.ceil(pokedex.length / PAGE_SIZE);

    /* Render Pokemon and the different buttons to the screen */
    return (
        <div style={{textAlign: "center"}}>

            <button onClick={handleBack}>Back to Landing Page</button>

            <div className={"table-wrapper"}>
                <div className={"pokemon-grid"} data-testid={"pokemon-grid"}> {pokemonList} </div>
            </div>

            <div>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Previous Page
                </button>
                <button onClick={handleNextPage} disabled={currentPage >= totalPages}>
                    Next Page
                </button>
            </div>
        </div>
    );
};

export default Pokedex;
