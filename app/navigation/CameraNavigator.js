import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import OpenCamera from "../screens/OpenCamera";
import GetCheckLocation from "../screens/GetCheckLocation";
import colors from "../config/colors";
import AppText from "../components/AppText";

const Stak = createStackNavigator();

const CameraNavigation = () => (
  <Stak.Navigator screenOptions={{ presentation: "modal" }}>
    <Stak.Screen
      name="OpenCamera"
      component={OpenCamera}
      options={{
        headerTitle: (props) => <AppText>New Attendace Log</AppText>,
        headerBackTitle: "Dismiss",
        headerBackTitleStyle: { color: colors.danger },
      }}
    />
    <Stak.Screen
      name="GetLocation"
      component={GetCheckLocation}
      options={{
        headerTitle: (props) => <AppText>Location</AppText>,
      }}
    />
  </Stak.Navigator>
);

export default CameraNavigation;
