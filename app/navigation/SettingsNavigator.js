import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EmployeeNavigator from "../../app/navigation/EmployeeNavigator";
import ProjectNavigator from "../../app/navigation/ProjectNavigator";
import AppNavigator from "./AppNavigator";
import SettingsScreen from "../screens/SettingsScreen";
import UserNavigator from "./UserNavigator";

const Stak = createNativeStackNavigator();

const SettingsNavigator = () => (
  <Stak.Navigator>
    <Stak.Screen name="Settings" component={SettingsScreen} />
    <Stak.Screen
      name="User"
      component={UserNavigator}
      options={{ headerShown: false }}
    />
    <Stak.Screen
      name="Employees"
      component={EmployeeNavigator}
      options={{ headerShown: false }}
    />
    <Stak.Screen
      name="Projecs"
      component={ProjectNavigator}
      options={{ headerShown: false }}
    />
  </Stak.Navigator>
);

export default SettingsNavigator;
