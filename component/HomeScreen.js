import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => (
  <View style={styles.screen}>
    <Text style={styles.title}>Tic-Tac-Toe</Text>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("Game")}
    >
      <Text style={styles.buttonText}>Start Game</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "600" },
});

export default HomeScreen;
