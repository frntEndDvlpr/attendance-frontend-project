import Constants from "expo-constants";

const settings = {
  dev: {
    apiUrl: "http://192.168.0.104:8000/",
  },

  staging: {
    apiUrl: "http://192.168.0.117:8000/",
  },

  prod: {
    apiUrl: "http://192.168.0.117:8000/",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
