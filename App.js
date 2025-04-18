import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GameProvider } from "./component/GameContext";
import HomeScreen from "./component/HomeScreen";
import GameScreen from "./component/GameScreen";
import Multiplayer from "./component/Multiplayer";

const Stack = createStackNavigator();

export default function App() {
  return (
    <GameProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Game" component={GameScreen} />
          <Stack.Screen name="Multiplayer" component={Multiplayer} />
        </Stack.Navigator>
      </NavigationContainer>
    </GameProvider>
  );
}
