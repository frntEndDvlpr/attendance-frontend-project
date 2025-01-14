import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./app/navigation/AuthNavigator";
import EmployeeNavigator from "./app/navigation/EmployeeNavigator";
import ClientNavigator from "./app/navigation/ClientNavigator";
import AppNavigator from "./app/navigation/AppNavigator";
import ProjectNavigator from "./app/navigation/ProjectNavigator";
import NavigationTheme from "./app/navigation/NavigationTheme";
import SettingsScreen from "./app/screens/SettingsScreen";
import GetCheckLocation from "./app/screens/GetCheckLocation";

export default function App() {
  return (
    <NavigationContainer theme={NavigationTheme}>
      <GetCheckLocation />
    </NavigationContainer>
  );
}
