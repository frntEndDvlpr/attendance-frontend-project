import React from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  photo: Yup.string().label("Photo"),
});

function AccountFormScreen(props) {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default AccountFormScreen;
