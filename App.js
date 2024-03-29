import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setUsernumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);

  function numberHandler(e) {
    setUsernumber(e);
    setGameIsOver(false);
  }
  function gameOverHandler() {
    setGameIsOver(true);
  }
  let screen = <StartGameScreen numberHandler={numberHandler} />;
  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }
  if (gameIsOver && userNumber) {
    screen = <GameOverScreen />;
  }

  return (
    <LinearGradient
      colors={["#4e0329", "#ddb52f"]}
      style={styles.rootContainer}>
      <ImageBackground
        style={styles.rootContainer}
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        imageStyle={styles.backgrounImage}>
        <SafeAreaView style={styles.rootContainer}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  backgrounImage: {
    opacity: 0.25,
  },
});
