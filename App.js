import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import NavigationTheme from "./app/navigation/NavigationTheme";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AppNavigator from "./app/navigation/AppNavigator";

import { AuthProvider } from "./app/auth/context";
import { useContext } from "react";
import AuthContext from "./app/auth/context";
import logger from "./app/utility/logger";

logger.start();

// A small wrapper to access context and render correct navigator
function Main() {
  const { user } = useContext(AuthContext);
  return user ? <AppNavigator /> : <AuthNavigator />;
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer theme={NavigationTheme}>
        <Main />
      </NavigationContainer>
    </AuthProvider>
  );
}
