import React, { useState } from "react";
import Landing from "./Landing";
import Pokedex from "./Pokedex";

/* Used to determine whether the site should be displaying the landing page or the Pokedex.
*  I chose to move all the modules to different files for simplicity's sake. */
const App = () => {
    const [showPokedex, setShowPokedex] = useState(false);

    const handleShowPokedex = () => {
        setShowPokedex(true);
    };

    const handleBack = () => {
        setShowPokedex(false);
    };

    /* Render landing page until user clicks the button to enter the Pokedex */
    return (
        <div data-testid={"app"}>
            {showPokedex ? (
                <Pokedex handleBack={handleBack} />
            ) : (
                <Landing handleShowPokedex={handleShowPokedex} />
            )}
        </div>
    );
};

export default App;
