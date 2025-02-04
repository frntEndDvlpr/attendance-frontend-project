import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Yup from "yup";

import colors from "../config/colors";
import { AppFormField, AppForm } from "../components/forms";
import AppButton from "../components/AppButton";
import AuthApi from "../api/auth";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen() {
  const [loginFailed, setLoginFailed] = useState(false);

  const handelSubmit = async ({ username, password }) => {
    const result = await AuthApi.login(username, password);
    if (!result.ok) {
      setLoginFailed(true);
      console.log(result.problem);
    }
    setLoginFailed(false);
    console.log(result.data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <MaterialCommunityIcons
          name="account"
          size={150}
          color={colors.secondary}
        />
      </View>

      <AppForm
        initialValues={{ username: "", password: "" }}
        onSubmit={handelSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoFocus
          autoCapitalize="none"
          autoCorrect={false}
          icon="account"
          name="username"
          placeholder="Username"
          //textContentType="emailAddress"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <AppButton title="login" onPress={handelSubmit} />
      </AppForm>
      <Button title="Forgot Your Password?" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  icon: {
    alignItems: "center",
    marginTop: 0,
  },
});

export default LoginScreen;
