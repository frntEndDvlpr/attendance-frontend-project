import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function AddTaskButton({ onPress }) {
  return (
    <View style={styles.upper}>
      <TouchableOpacity style={styles.outerContainer} onPress={onPress}>
        <View style={styles.container}>
          <MaterialCommunityIcons
            name="plus-circle"
            color={colors.white}
            size={35}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 30,
    margin: 0,
    borderColor: colors.lightGreen,
    borderWidth: 5,
    height: 60,
    justifyContent: "center",
    width: 60,
    marginRight: 30,
  },
  outerContainer: {
    alignItems: "flex-end",
    width: "60",
    alignSelf: "flex-end",
  },
  upper: { borderTopWidth: 1, borderTopColor: colors.lightGrey },
});

export default AddTaskButton;
