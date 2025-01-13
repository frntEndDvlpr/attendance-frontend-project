import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OpenCamera from "../components/OpenCamera";
import GetCheckLocation from "../screens/GetCheckLocation";

const Stak = createStackNavigator();

const CameraNavigation = () => (
  <Stak.Navigator screenOptions={{ presentation: "modal" }}>
    <Stak.Screen
      name="CameranNavigator"
      component={OpenCamera}
      options={{
        headerTitle: (props) => <AppText>Camera</AppText>,
      }}
    />
    <Stak.Screen
      name="LocationNavigator"
      component={GetCheckLocation}
      options={{
        headerTitle: (props) => <AppText>Location</AppText>,
      }}
    />
  </Stak.Navigator>
);

export default CameraNavigation;
