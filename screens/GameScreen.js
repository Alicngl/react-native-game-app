import { Text, View, StyleSheet, SafeAreaView, Alert } from "react-native";
import Title from "../components/Title";
import { useEffect, useState } from "react";
import NumberContainer from "../components/NumberContainer";
import PrimaryButton from "../components/PrimaryButton";

function generateRandom(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandom(min, max, exclude);
  } else {
    return rndNum;
  }
}
let min = 0;
let max = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandom(min, max, userNumber);
  const [current, setCurrent] = useState(initialGuess);

  useEffect(() => {
    if (current === userNumber) {
      onGameOver();
    }
  }, [current, userNumber, onGameOver]);
  function nextGuessHandler(direction) {
    console.log(userNumber, "nnn");
    if (
      (direction == "lower" && current < userNumber) ||
      (direction == "greater" && current > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction == "lower") {
      console.log(direction);
      max = current;
    } else {
      min = current + 1;
    }
    console.log(min, max);
    const newRndNum = generateRandom(min, max, current);
    setCurrent(newRndNum);
  }
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{current}</NumberContainer>
      <View>
        <Text>Higher or lower?</Text>
        <View>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
            -
          </PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
            +
          </PrimaryButton>
        </View>
      </View>
      {/* <View>LOG ROUNDS</View> */}
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ddb52f",
    textAlign: "center",
    borderWidth: 2,
    borderColor: "#ddb52f",
    padding: 12,
  },
});
