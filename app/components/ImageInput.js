import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function ImageInput({ imageUri }) {
  return (
    <View style={styles.container}>
      {!imageUri && (
        <MaterialCommunityIcons
          color={colors.darkGrey}
          name="camera"
          size={35}
        />
      )}
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 35,
    backgroundColor: colors.lightGreen,
    height: 70,
    justifyContent: "center",
    width: 70,
  },
  image: {
    Highlight: "100%",
    width: "100%",
  },
});

export default ImageInput;
