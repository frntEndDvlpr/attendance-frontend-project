import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TaskFormScreen from "../screens/TaskFormScreen";
import TasksListScreen from "../screens/TasksListScreen";
import AppText from "../components/AppText";
import colors from "../config/colors";

const Stak = createStackNavigator();

const TaskNavigator = () => (
  <Stak.Navigator screenOptions={{ presentation: "modal" }}>
    <Stak.Screen
      name="TasksList"
      component={TasksListScreen}
      options={{
        headerTitle: (props) => <AppText>Tasks List</AppText>,
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
  </Stak.Navigator>
);

export default TaskNavigator;
