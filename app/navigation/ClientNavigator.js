import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ClientsListScreen from "../screens/ClientsListScreen";
import ClientFormScreen from "../screens/ClientFormScreen";
import AppText from "../components/AppText";

const Stak = createStackNavigator();

const ClientNavigator = () => (
  <Stak.Navigator screenOptions={{ presentation: "modal" }}>
    <Stak.Screen
      name="ClientsList"
      component={ClientsListScreen}
      options={{
        headerTitle: (props) => <AppText>Clients List</AppText>,
      }}
    />

    <Stak.Screen
      name="ClientForm"
      component={ClientFormScreen}
      options={{
        headerTitle: (props) => <AppText>New Client</AppText>,
        headerBackTitle: "Dismiss",
        headerBackTitleStyle: {},
      }}
    />
  </Stak.Navigator>
);

export default ClientNavigator;
