import React, { createContext, useContext, useState, useEffect } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    checkWinner();
  }, [board]);

  useEffect(() => {
    if (turn === "O" && !winner) {
      setTimeout(() => makeAIMove(), 500);
    }
  }, [turn, winner]);

  const makeAIMove = () => {
    let bestMove = getBestMove(board);
    if (bestMove !== -1) {
      handleMove(bestMove);
    }
  };

  const getBestMove = (newBoard) => {
    let bestScore = -Infinity;
    let move = -1;

    newBoard.forEach((cell, index) => {
      if (cell === null) {
        newBoard[index] = "O"; 
        let score = minimax(newBoard, 0, false);
        newBoard[index] = null; 

        if (score > bestScore) {
          bestScore = score;
          move = index;
        }
      }
    });

    return move;
  };

  const minimax = (newBoard, depth, isMaximizing) => {
    let result = evaluateBoard(newBoard);
    if (result !== 0) return result;
    if (!newBoard.includes(null)) return 0; 

    if (isMaximizing) {
      let bestScore = -Infinity;
      newBoard.forEach((cell, index) => {
        if (cell === null) {
          newBoard[index] = "O";
          bestScore = Math.max(bestScore, minimax(newBoard, depth + 1, false));
          newBoard[index] = null;
        }
      });
      return bestScore;
    } else {
      let bestScore = Infinity;
      newBoard.forEach((cell, index) => {
        if (cell === null) {
          newBoard[index] = "X";
          bestScore = Math.min(bestScore, minimax(newBoard, depth + 1, true));
          newBoard[index] = null;
        }
      });
      return bestScore;
    }
  };

  const evaluateBoard = (newBoard) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return newBoard[a] === "O" ? 10 : -10;
      }
    }

    return 0; 
  };

  const handleMove = (index) => {
    if (!board[index] && !winner) {
      const newBoard = [...board];
      newBoard[index] = turn;
      setBoard(newBoard);
      setTurn(turn === "X" ? "O" : "X");
    }
  };

  const checkWinner = () => {
    const result = evaluateBoard(board);
    if (result === 10) {
      setWinner("O");
    } else if (result === -10) {
      setWinner("X");
    } else if (!board.includes(null)) {
      setWinner("Draw");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn("X");
    setWinner(null);
  };

  return (
    <GameContext.Provider
      value={{ board, turn, winner, handleMove, resetGame }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
