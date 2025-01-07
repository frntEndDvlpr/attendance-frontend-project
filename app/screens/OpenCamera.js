import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Camera, CameraView } from "expo-camera";
import AppIcon from "../components/AppIcon";
import colors from "../config/colors";
import TakePhotoButton from "../components/TakePhotoButton";

export default function OpenCamera() {
  const [facing, setFacing] = useState("front");
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");

      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      if (mediaLibraryPermission.status !== "granted") {
        Alert.alert("Permission to access media library is required!");
      }
    })();
  }, []);

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePicture = async () => {
    if (camera) {
      const photoData = await camera.takePictureAsync();
      setPhoto(photoData.uri);
      savePhotoToCameraRoll(photoData.uri);
      console.log(photoData.uri);
    }
  };

  const savePhotoToCameraRoll = async (uri) => {
    try {
      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert(
        "Photo saved!",
        "Your photo has been saved to the camera roll."
      );
    } catch (error) {
      console.log(error);
      Alert.alert("Error saving photo", "There was an error saving the photo.");
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView style={styles.camera} ref={setCamera} facing={facing}>
        <View style={styles.cameraIcons}>
          <TouchableOpacity style={styles.button}>
            <AppIcon
              name={"close-thick"}
              size={60}
              backgroundColor={colors.primaryTransparency}
            />
          </TouchableOpacity>
          <TakePhotoButton onPress={takePicture} />
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <AppIcon
              name={"camera-flip-outline"}
              size={60}
              backgroundColor={colors.primaryTransparency}
            />
          </TouchableOpacity>
        </View>
      </CameraView>

      {photo && (
        <Image
          source={{ uri: photo }}
          style={{ width: 100, height: 100, margin: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
  },
  cameraIcons: {
    height: "150",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
  },
});
