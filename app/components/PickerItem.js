import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import AppText from "./AppText";

function PickerItem({ title, description, onPress, location }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <AppText style={styles.text}>{title}</AppText>
      <AppText style={styles.text}>{description}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
});

export default PickerItem;
