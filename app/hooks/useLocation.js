import { useState, useEffect } from "react";
import * as Location from "expo-location";

const useLocation = () => {
  const [location, setLocation] = useState();

  const GetLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      setLocation({ latitude, longitude });
      //console.log("Location:", { latitude, longitude });
    } catch (error) {
      console.log("Error getting location:", error);
    }
  };

  useEffect(() => {
    GetLocation();
  }, []);

  return location;
};

export default useLocation;
