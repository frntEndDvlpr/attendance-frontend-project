import React from "react";
import { View, StyleSheet, Image } from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";

function ProfileCard({ name, position, email, image }) {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <AppText style={styles.name}>{name}</AppText>
      <AppText style={styles.emailPosition}>{position}</AppText>
      <AppText style={styles.emailPosition}>{email}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", paddingTop: 100 },
  image: { height: 150, width: 150, borderRadius: 75, marginBottom: 10 },
  name: { fontSize: 20, fontWeight: "bold", color: colors.black },
  emailPosition: { fontSize: 17 },
});

export default ProfileCard;
