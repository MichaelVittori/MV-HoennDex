import React, { useState, useEffect } from "react";

/* This page I added purely for fun, basically just tells user that the page is loading */
const Loading = () => {
    const [loadingText, setLoadingText] = useState("Loading");

    useEffect(() => {
        /* Adds periods at the end of loading to show that page didn't freeze */
        const interval = setInterval(() => {
            setLoadingText((text) => {
                /* The switch cases allow the app to add periods/clear all periods */
                switch (text) {
                    case "Loading":
                        return "Loading.";
                    case "Loading.":
                        return "Loading..";
                    case "Loading..":
                        return "Loading...";
                    case "Loading...":
                        return "Loading";
                    default:
                        return "Loading";
                }
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    /* Render loading message */
    return (
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
            <h3>{loadingText}</h3>
        </div>
    );
};

export default Loading;