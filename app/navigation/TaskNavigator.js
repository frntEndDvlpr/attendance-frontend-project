import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TaskFormScreen from "../screens/TaskFormScreen";
import TasksListScreen from "../screens/TasksListScreen";
import AppText from "../components/AppText";
import colors from "../config/colors";
import OpenCamera from "../screens/OpenCamera";

const Stak = createStackNavigator();

const TaskNavigator = () => (
  <Stak.Navigator screenOptions={{ presentation: "modal" }}>
    <Stak.Screen
      name="TasksList"
      component={TasksListScreen}
      options={{
        headerShown: false,
      }}
    />

    <Stak.Screen
      name="TaskForm"
      component={TaskFormScreen}
      options={{
        headerTitle: (props) => <AppText>New Task</AppText>,
        headerBackTitle: "Dismiss",
        headerBackTitleStyle: { color: colors.danger },
      }}
    />
    <Stak.Screen
      name="Camera"
      component={OpenCamera}
      options={{
        headerTitle: (props) => <AppText>New Attendace Log</AppText>,
        headerBackTitle: "Dismiss",
        headerBackTitleStyle: { color: colors.danger },
      }}
    />
  </Stak.Navigator>
);

export default TaskNavigator;
