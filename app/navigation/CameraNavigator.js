import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import OpenCamera from "../screens/OpenCamera";
import GetCheckLocation from "../screens/GetCheckLocation";
import colors from "../config/colors";
import AppText from "../components/AppText";
import OpenCamera from "../screens/OpenCamera";
import AppText from "../components/AppText"; // Ensure AppText is imported correctly
import GetCheckLocation from "../screens/GetCheckLocation";

const Stack = createStackNavigator();

const CameraNavigation = () => (
  <Stack.Navigator screenOptions={{ presentation: "modal" }}>
    <Stack.Screen
      name="Camera"
      component={OpenCamera}
      options={{
        headerTitle: (props) => <AppText>New Attendace Log</AppText>,
        headerBackTitle: "Dismiss",
        headerBackTitleStyle: { color: colors.danger },
      }}
    />
    <Stack.Screen
      name="GetLocation"
      component={GetCheckLocation}
      options={{
        headerTitle: (props) => <AppText>Location</AppText>,
      }}
    />
  </Stack.Navigator>
);

export default CameraNavigation;
