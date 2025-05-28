import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountScreen from "../screens/AccountScreen";
import colors from "../config/colors";
import TaskNavigator from "./TaskNavigator";
import AppText from "../components/AppText";
import SettingsNavigator from "./SettingsNavigator";
import { View, StyleSheet } from "react-native";

const BottomTap = createBottomTabNavigator();

const AppNavigator = () => (
  <BottomTap.Navigator initialRouteName="TasksListings">
    <BottomTap.Screen
      name="Account"
      component={AccountScreen}
      options={{
        title: "Account",
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="account"
            color={colors.primary}
            size={size}
          />
        ),
      }}
    />
    <BottomTap.Screen
      name="TasksListings"
      component={TaskNavigator}
      options={{
        title: "Attendance",
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <View style={styles.container}>
            <MaterialCommunityIcons
              name="account-clock-outline"
              color={colors.white}
              size={35}
            />
          </View>
        ),
      }}
    />
    <BottomTap.Screen
      name="settings"
      component={SettingsNavigator}
      options={{
        title: "Settings",
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="cog"
            color={colors.primary}
            size={size}
          />
        ),
      }}
    />
  </BottomTap.Navigator>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 30,
    marginBottom: 35,
    borderColor: colors.lightGreen,
    borderWidth: 5,
    height: 60,
    justifyContent: "center",
    width: 60,
  },
  outerContainer: { alignItems: "flex-end" },
});

export default AppNavigator;
