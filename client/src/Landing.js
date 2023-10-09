import React from "react";
import "./Landing.css";

/* Landing page, provides some context on the project and was *supposed* to allow filtering of the pokedex. */
const LandingPage = ({ handleShowPokedex }) => {
    /* Render a welcome message, information about the project, and button to view Pokedex */
    return (
        <div className={"container"}>
            <div className={"landing-page"}>
                <h1>Welcome to Michael's Hoenn Pokedex!</h1>
                <p>This is a basic react Pokedex containing all the new Pokemon from Generation III</p>
                <p>Click below to see all the new Pokemon of this Generation (Load time ~8-10 seconds):</p>
                <button onClick={handleShowPokedex}>Show Pokedex</button>
                <p>I chose to only do these Pokemon mainly because loading all 1,000+ Pokemon they have now was taking forever and this is my favorite generation.</p>
            </div>
        </div>
    );
};

export default LandingPage;
