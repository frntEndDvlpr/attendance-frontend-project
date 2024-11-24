import React from "react";
import { Image, ImageBackground, StyleSheet, View, Text } from "react-native";

import colors from "../config/colors";
import AppButton from "../components/AppButton";

function WellcomeScreen({ navigation }) {
  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.welcomeLogo}
          source={require("../assets/SOMS-logo.png")}
        />
        <Text style={styles.tagLine}>rgister and track all tasks and jobs</Text>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title={"login"}
          onPress={() => navigation.navigate("Login")}
        />
        <AppButton
          title={"register"}
          color="secondary"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logoContainer: {
    top: 70,
    position: "absolute",
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: colors.primary,
    width: "100%",
    height: 30,
  },
  registerButton: {
    backgroundColor: colors.secondary,
    width: "100%",
    height: 30,
  },
  welcomeLogo: {
    height: 100,
    resizeMode: "contain",
  },
  buttonContainer: {
    width: "100%",
    padding: 20,
  },
  tagLine: {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 10,
    color: colors.darkGreen,
    textTransform: "capitalize",
  },
});

export default WellcomeScreen;
