import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";

const Multiplayer = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState(null);

  // Handle player moves
  const handleMove = (index) => {
    if (!board[index] && !winner) {
      const newBoard = [...board];
      newBoard[index] = turn;
      setBoard(newBoard);
      checkWinner(newBoard);
      setTurn(turn === "X" ? "O" : "X");
    }
  };

  // Check if there's a winner
  const checkWinner = (newBoard) => {
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
        setWinner(newBoard[a]);
        return;
      }
    }

    if (!newBoard.includes(null)) {
      setWinner("Draw");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn("X");
    setWinner(null);
  };

  return (
    <ImageBackground
      source={require("../assets/bg.png")}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.status}>
          {winner
            ? winner === "Draw"
              ? "It's a Draw!"
              : `Winner: ${winner}`
            : `Turn: ${turn}`}
        </Text>

        <View style={styles.board}>
          {board.map((cell, index) => (
            <TouchableOpacity
              key={index}
              style={styles.cell}
              onPress={() => handleMove(index)}
            >
              <Text
                style={[
                  styles.cellText,
                  { color: cell === "X" ? "#e74c3c" : "#3498db" },
                ]}
              >
                {cell}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={resetGame}>
          <Text style={styles.buttonText}>Restart Game</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: "100%",
    height: "100%",
  },
  status: {
    fontSize: 22,
    marginVertical: 15,
    fontWeight: "600",
    color: "#34495e",
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  cell: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#3498db",
    backgroundColor: "white",
  },
  cellText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default Multiplayer;
