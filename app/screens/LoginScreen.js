import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Yup from "yup";

import colors from "../config/colors";
import { AppFormField, AppForm, AppErrorMasage } from "../components/forms";
import AppButton from "../components/AppButton";
import AuthApi from "../api/auth";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({ navigation }) {
  const [loginFailed, setLoginFailed] = useState(false);

  handelSubmit = async ({ username, password }) => {
    const result = await AuthApi.login(username, password);
    if (!result.ok) return setLoginFailed(true);
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
        <AppErrorMasage
          error="Invalid username or password."
          visible={loginFailed}
        />
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
        <AppButton title="login" />
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
