import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CompanyListScreen from "../screens/CompanyListScreen";
import CompanyFormScreen from "../screens/CompanyFormScreen";
import AppText from "../components/AppText";

const Stak = createStackNavigator();

const CompanyNavigator = () => (
  <Stak.Navigator screenOptions={{ presentation: "modal" }}>
    <Stak.Screen
      name="Company"
      component={CompanyListScreen}
      options={{
        headerTitle: (props) => <AppText>Company</AppText>,
      }}
    />

    <Stak.Screen
      name="CompanyForm"
      component={CompanyFormScreen}
      options={{
        headerTitle: (props) => <AppText>New Company</AppText>,
        headerBackTitle: "Dismiss",
        headerBackTitleStyle: {},
      }}
    />
  </Stak.Navigator>
);

export default CompanyNavigator;
