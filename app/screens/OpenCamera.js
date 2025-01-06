import {
  Camera,
  CameraView,
  CameraType,
  useCameraPermissions,
} from "expo-camera";
import { useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TakePhotoButton from "../components/TakePhotoButton";
import AppIcon from "../components/AppIcon";
import colors from "../config/colors";

export default function App() {
  const [facing, setFacing] = useState("front");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [Photo, setCPhoto] = useState(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 1, base64: true };
      const photo = await takePictureAsync(options);
      console.console.log("Photo URI", photo.uri);
      setCPhoto(photo);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView flash autofocus style={styles.camera} facing={facing}>
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
    //backgroundColor: "black",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
  },
});
