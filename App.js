import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./app/navigation/AuthNavigator";
import EmployeeNavigator from "./app/navigation/EmployeeNavigator";
import ClientNavigator from "./app/navigation/ClientNavigator";
import AppNavigator from "./app/navigation/AppNavigator";
import ProjectNavigator from "./app/navigation/ProjectNavigator";
import NavigationTheme from "./app/navigation/NavigationTheme";
import TaskNavigator from "./app/navigation/TaskNavigator";
import SettingsScreen from "./app/screens/SettingsScreen";
import SettingsNavigator from "./app/navigation/SettingsNavigator";

export default function App() {
  return (
    <NavigationContainer theme={NavigationTheme}>
      <AuthNavigator />
    </NavigationContainer>
  );
}
