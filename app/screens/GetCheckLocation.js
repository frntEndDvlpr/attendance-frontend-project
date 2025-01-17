import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Platform,
} from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";

import AppIcon from "../components/AppIcon";
import colors from "../config/colors";

export default function GetCheckLocation({ navigation }) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [targetLat, setTargetLat] = useState("");
  const [targetLon, setTargetLon] = useState("");
  const [range, setRange] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  /* const navigation = useNavigation(); */

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  const checkInRange = () => {
    if (!currentLocation) {
      Alert.alert("Error", "Current location not available");
      return;
    }
    if (!targetLat || !targetLon || !range) {
      Alert.alert("Error", "Please enter a target location and range");
      return;
    }

    const toRadians = (deg) => (deg * Math.PI) / 180;
    const R = 6371e3;

    const φ1 = toRadians(currentLocation.latitude);
    const φ2 = toRadians(parseFloat(targetLat));
    const Δφ = toRadians(parseFloat(targetLat) - currentLocation.latitude);
    const Δλ = toRadians(parseFloat(targetLon) - currentLocation.longitude);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;

    if (distance <= parseFloat(range)) {
      Alert.alert(
        "Success",
        `You are within ${range} meters of the target location!`
      );
    } else {
      Alert.alert(
        "Out of Range",
        `You are ${distance.toFixed(2)} meters away from the target location.`
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {errorMsg ? (
          <Text style={styles.error}>{errorMsg}</Text>
        ) : currentLocation ? (
          <>
            <MapView
              style={styles.map}
              initialRegion={currentLocation}
              mapType="hybrid" // Set map type to satellite
            >
              {/* Marker for current location */}
              <Marker
                coordinate={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                }}
                title="You Are Here"
              >
                <Image
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
                  }}
                  style={styles.icon}
                />
              </Marker>

              {/* Marker for target location */}
              {targetLat && targetLon && (
                <Marker
                  coordinate={{
                    latitude: parseFloat(targetLat),
                    longitude: parseFloat(targetLon),
                  }}
                  pinColor="blue"
                  title="Target Location"
                />
              )}

              {/* Circle around the range */}
              {targetLat && targetLon && range && (
                <Circle
                  center={{
                    latitude: parseFloat(targetLat),
                    longitude: parseFloat(targetLon),
                  }}
                  radius={parseFloat(range)}
                  strokeColor="rgba(0, 0, 255, 0.5)"
                  fillColor="rgba(0, 0, 255, 0.2)"
                />
              )}
            </MapView>

            <View style={styles.coordinates}>
              <AppIcon
                name="crosshairs-gps"
                size={70}
                backgroundColor="false"
                iconColor={colors.black}
              />
              <Text style={styles.coordText}>
                {currentLocation.latitude.toFixed(5)},{" "}
                {currentLocation.longitude.toFixed(5)}
              </Text>
            </View>
          </>
        ) : (
          <Text>Fetching current location...</Text>
        )}
        <TouchableOpacity
          style={styles.CamreaBtn}
          onPress={() => {
            navigation.navigate("OpenCamera");
          }}
        >
          <AppIcon name="camera-outline" size={35} />
        </TouchableOpacity>

        {/* <KeyboardAvoidingView
          style={styles.inputContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView>
            <TextInput
              style={styles.input}
              placeholder="Enter Target Latitude"
              keyboardType="numeric"
              value={targetLat}
              onChangeText={setTargetLat}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Target Longitude"
              keyboardType="numeric"
              value={targetLon}
              onChangeText={setTargetLon}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Range in Meters"
              keyboardType="numeric"
              value={range}
              onChangeText={setRange}
            />
            <Button title="Check Range" onPress={checkInRange} />
          </ScrollView>
        </KeyboardAvoidingView> */}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  inputContainer: {
    backgroundColor: "white",
    width: "100%",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  coordinates: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(104, 214, 104, 0.68)",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    height: 40,
  },
  coordText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 20,
  },
  CamreaBtn: { margin: 10 },
});
