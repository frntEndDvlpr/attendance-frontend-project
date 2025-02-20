import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Camera, CameraView } from "expo-camera";

import AppIcon from "../components/AppIcon";
import colors from "../config/colors";
import TakePhotoButton from "../components/TakePhotoButton";

export default function OpenCamera({ navigation }) {
  const [facing, setFacing] = useState("front");
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [photoDateTime, setPhotoDateTime] = useState(null);

  // Getting permission to access the camera and media library
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

  // Toggling between the front and back camera
  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  // Capturing a photo
  const takePicture = async () => {
    if (camera) {
      const photoData = await camera.takePictureAsync({ exif: true });
      setPhoto(photoData.uri);
      setPhotoUri(photoData.uri);

      if (photoData.exif) {
        const { DateTimeOriginal } = photoData.exif;
        if (DateTimeOriginal) {
          setPhotoDateTime(DateTimeOriginal);
          //console.log(`Photo captured at: ${DateTimeOriginal}`); // Log the date and time
        } else {
          console.log("Date and time metadata not available in EXIF");
        }
      } else {
        console.log("No EXIF metadata available");
      }

      //console.log(photoData.uri);
    }
  };

  // Insuring all required access rights have been granted
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
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
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: photo }}
            style={{ width: "100%", height: "89%", margin: 20 }}
          />
          <View style={styles.btnsContainer}>
            <Button
              title="Confirm"
              color={colors.primary}
              onPress={() => {
                console.log("Photo URI:", photoUri);
                console.log("Photo DateTime:", photoDateTime);
                // You can add logic here to include the photo in a Formik form and send it to the server
                navigation.goBack(); // Close the camera after confirming
              }}
            />
            <Button
              title="Retake"
              color={colors.danger}
              onPress={() => setPhoto(null)}
            />
          </View>
        </View>
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
  previewContainer: {
    alignItems: "center",
  },
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
