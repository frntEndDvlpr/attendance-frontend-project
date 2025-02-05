import React, { useContext, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";

import colors from "../config/colors";
import {
  AppFormField,
  AppForm,
  AppErrorMasage,
  SubmitButton,
} from "../components/forms";
import AuthApi from "../api/auth";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen() {
  const [loginFailed, setLoginFailed] = useState(false);
  const authContext = useContext(AuthContext);

  const handelSubmit = async ({ username, password }) => {
    const result = await AuthApi.login(username, password);
    if (!result.ok) {
      setLoginFailed(true);
      return console.log(result.problem);
    }
    setLoginFailed(false);
    const user = jwtDecode(result.data.access);
    authContext.setUser(user);
    authStorage.storeToken(result.data.access);
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

      <AppErrorMasage
        error="Invalid username and/or password!"
        visible={loginFailed}
      />
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
        <SubmitButton title="login" />
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
