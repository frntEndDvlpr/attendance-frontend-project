import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OpenCamera from "../screens/OpenCamera";
import AppText from "../components/AppText"; // Ensure AppText is imported correctly
import GetCheckLocation from "../screens/GetCheckLocation";

const Stack = createStackNavigator();

const CameraNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="map"
      component={GetCheckLocation}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Camera"
      component={OpenCamera}
      options={{
        headerTitle: (props) => <AppText>Camera</AppText>,
      }}
    />
  </Stack.Navigator>
);

export default CameraNavigator;
