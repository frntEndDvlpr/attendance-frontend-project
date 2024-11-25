import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OpenCamera from "../components/OpenCamera";

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
  </Stak.Navigator>
);

export default CameraNavigation;
