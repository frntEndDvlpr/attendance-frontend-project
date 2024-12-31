/* import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./app/navigation/AuthNavigator";
import EmployeeNavigator from "./app/navigation/EmployeeNavigator";
import ClientNavigator from "./app/navigation/ClientNavigator";
import AppNavigator from "./app/navigation/AppNavigator";
import ProjectNavigator from "./app/navigation/ProjectNavigator";
import NavigationTheme from "./app/navigation/NavigationTheme";
import TaskNavigator from "./app/navigation/TaskNavigator";
import SettingsScreen from "./app/screens/SettingsScreen";
import SettingsNavigator from "./app/navigation/SettingsNavigator";

export default function App() {
 return (
   <NavigationContainer theme={NavigationTheme}>
     <AuthNavigator />
   </NavigationContainer>
 );
} */

import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import { View, Button, StyleSheet, Text } from "react-native";

export default function OpenCamera() {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No access to camera</Text>
        <Button
          title="Grant Permission"
          onPress={Camera.requestCameraPermissionsAsync}
        />
      </View>
    );
  }

  return <Camera style={styles.camera} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});
