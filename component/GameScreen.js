import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useGame } from "./GameContext";

const GameScreen = () => {
  const { board, turn, winner, handleMove, resetGame } = useGame();

  return (
    <ImageBackground
    source={require("../assets/bg.png")}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.status}>
          {winner ? "Game Over" : `Turn: ${turn}`}
        </Text>

        <View style={styles.board}>
          {board.map((cell, index) => (
            <TouchableOpacity
              key={index}
              style={styles.cell}
              onPress={() => !cell && !winner && handleMove(index)}
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

        {winner && (
          <View style={styles.winnerContainer}>
            <Text
              style={winner === "Draw" ? styles.drawText : styles.winnerText}
            >
              {winner === "Draw" ? "It's a Draw!" : `Winner: ${winner}`}
            </Text>
            <TouchableOpacity style={styles.button} onPress={resetGame}>
              <Text style={styles.buttonText}>Play Again</Text>
            </TouchableOpacity>
          </View>
        )}

        {!winner && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#e74c3c" }]}
            onPress={resetGame}
          >
            <Text style={styles.buttonText}>Restart Game</Text>
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
background: {
  flex: 1,
  width: "100%",
  height: "100%",
  resizeMode: "cover", // You can try "contain" or "stretch" too
  justifyContent: "center",
  alignItems: "center",
},
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)", // Semi-transparent overlay
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
  winnerContainer: {
    alignItems: "center",
    marginTop: 20,
    padding: 15,
    backgroundColor: "rgba(46, 204, 113, 0.1)",
    borderRadius: 10,
  },
  winnerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2ecc71",
    marginBottom: 10,
  },
  drawText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f39c12",
    marginBottom: 10,
  },
});

export default GameScreen;
