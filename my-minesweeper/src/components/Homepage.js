import React from "react";
import minesweeperImage from "./minesweeper.png";
import {Link} from "react-router-dom"
const Homepage = () => {
    const divStyle = {
        backgroundImage: `url(${minesweeperImage})`,
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat', 
        width: '100vw',
        height: '100vh', 
    };

    return (
        <div style={divStyle}>
            <h3>Press Start to play Minesweeper</h3>
            <Link to="/play">
            <button>Start the game now</button>
            </Link>
        </div>
    );
};

export default Homepage;
