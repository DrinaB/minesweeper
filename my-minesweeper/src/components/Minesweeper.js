import React from "react";
import {useState, useEffect } from 'react';
import './minesweeper.css'


const Minesweeper = () => {
    const [grid, setGrid] = useState([]);
    const [flagsLeft, setFlagsLeft] = useState(20); // Change the initial number of flags as needed
    const [isGameOver, setIsGameOver] = useState(false);
    const [result, setResult] = useState('');
    const width = 10;
    const bombAmount = 20;
    const squares = [];
    
    useEffect(() => {
      createBoard();
    }, []);
  
    const createBoard = () => {
      setFlagsLeft(bombAmount);
      setIsGameOver(false);
  
      // Define and shuffle the game array
      
      const bombsArray = Array(bombAmount).fill('bomb');
      const emptyArray = Array(width * width - bombAmount).fill('valid');
      const gameArray = emptyArray.concat(bombsArray);
      const shuffledArray = gameArray.sort(() => Math.random() - 0.5);
  
      for (let i = 0; i < width * width; i++) {
        squares.push({
          id: i,
          status: shuffledArray[i],
          isFlag: false,
          isRevealed: false,
        });
      }
  
      setGrid([...squares]);
    };
  
    // Add Flag with right click
    const addFlag = (square) => {
      if (isGameOver) return;
      if (!square.isRevealed && flagsLeft > 0) {
        const updatedGrid = [...grid];
        const targetSquare = updatedGrid.find((s) => s.id === square.id);
        if (!targetSquare.isFlag) {
          targetSquare.isFlag = true;
          setFlagsLeft(flagsLeft - 1);
          checkForWin();
        } else {
          targetSquare.isFlag = false;
          setFlagsLeft(flagsLeft + 1);
        }
        setGrid(updatedGrid);
        checkForWin();
      }
    };
  
    // Click on square actions
    const click = (square) => {
      if (isGameOver) return;
      if (square.isRevealed || square.isFlag) return;
      if (square.status === 'bomb') {
        gameOver(square);
      } else {
        const total = calculateTotal(square);
        if (total !== 0) {
          square.isRevealed = true;
          square.total = total;
        } else {
          revealAdjacentSquares(square);
        }
        square.isRevealed = true;
        const updatedGrid = [...grid];
        setGrid(updatedGrid);
        checkForWin();
      }
    };
  
    // Calculate the total number of adjacent bombs
    const calculateTotal = (square) => {
        const { id } = square;
        const adjacentOffsets = [-width - 1, -width, -width + 1, -1, 1, width - 1, width, width + 1];
        let total = 0;
    
        adjacentOffsets.forEach((offset) => {
          const neighborId = id + offset;
          const neighborSquare = grid.find((s) => s.id === neighborId);
          if (neighborSquare && neighborSquare.status === 'bomb') {
            total++;
          }
        });
        return total;
    };
  
    // Recursive function to reveal adjacent squares with total 0
    const revealAdjacentSquares = (square) => {
        const { id } = square;
        const adjacentOffsets = [-width - 1, -width, -width + 1, -1, 1, width - 1, width, width + 1];
    
        adjacentOffsets.forEach((offset) => {
          const neighborId = id + offset;
          const neighborSquare = grid.find((s) => s.id === neighborId);
    
          if (neighborSquare && !neighborSquare.isRevealed) {
            const total = calculateTotal(neighborSquare);
            neighborSquare.isRevealed = true;
            neighborSquare.total = total;
    
            // If the revealed square has total 0, recursively reveal its neighbors
            if (total === 0) {
              revealAdjacentSquares(neighborSquare);
            }
          }
        });
    };
  
    // Game over
    const gameOver = (square) => {
      setResult('BOOM! Game Over!');
      setIsGameOver(true);
  
      // Show ALL the bombs
      const updatedGrid = [...grid];
      updatedGrid.forEach((s) => {
        if (s.status === 'bomb') {
          s.isRevealed = true;
        }
      });
      setGrid(updatedGrid);
    };
  
    // Check for win
    const checkForWin = () => {
        let win = true;

        grid.forEach((square) => {
          if (square.status === 'bomb' && !square.isFlag) {
            win = false;
          }
          if (square.status !== 'bomb' && !square.isRevealed) {
            win = false;
          }
        });
      
        if (win) {
          setResult('YOU WIN! Good Job!');
          setIsGameOver(true);
        }
    };
  
    return (
      <div className="minesweeper">
        <div className="grid">
          {grid.map((square) => (
            <div
              key={square.id}
              className={`square ${square.isRevealed ? 'revealed' : ''}`}
              onClick={() => click(square)}
              onContextMenu={(e) => {
                e.preventDefault();
                addFlag(square);
              }}
            >
              {square.isRevealed && square.status === 'bomb' ? '💣' : square.isRevealed && square.total ? square.total : ''}
            </div>
          ))}
        </div>
        <div className="status">
          {isGameOver ? result : `Flags Left: ${flagsLeft}`}
        </div>
        <button onClick={createBoard}>Start New Game</button>
      </div>
    );
  };
  
  export default Minesweeper;
  