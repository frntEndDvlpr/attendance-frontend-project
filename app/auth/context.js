import React, { createContext, useEffect, useState } from "react";
import { AppState } from "react-native";
import Bugsnag from "@bugsnag/expo";
import authStorage from "./storage";
import authApi from "../api/auth";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from token on app start
  const loadUser = async () => {
    try {
      const token = await authStorage.getAccessToken();
      if (token) {
        const decoded = jwtDecode(token);
        setUser(decoded);
      }
    } catch (error) {
      Bugsnag.notify(error);
    }
  };

  // Refresh token logic
  const refreshToken = async () => {
    const refresh = await authStorage.getRefreshToken();
    if (!refresh) return logout();

    const result = await authApi.refreshToken(refresh);
    if (result.ok && result.data?.access) {
      await authStorage.storeTokens(result.data.access, refresh);
      const decoded = jwtDecode(result.data.access);
      setUser(decoded);
    } else {
      logout(); // If refresh fails
    }
  };

  // Logout function
  const logout = async () => {
    setUser(null);
    await authStorage.removeTokens();
  };

  // Try to refresh token when app comes to foreground
  useEffect(() => {
    const subscription = AppState.addEventListener("change", async (nextAppState) => {
      if (nextAppState === "active") {
        await refreshToken();
      }
    });

    return () => subscription.remove();
  }, []);

  // On mount, load the user
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
