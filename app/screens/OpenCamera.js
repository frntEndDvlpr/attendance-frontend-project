import React, { useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { Camera, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export default function OpenCamera() {
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();
  const [facing, setFacing] = useState("front");
  const [faceDetected, setFaceDetected] = useState(false);
  const cameraRef = useRef(null);

  if (!permission || !mediaPermission) {
    return <View />;
  }

  if (!permission.granted || !mediaPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to use the camera and save photos.
        </Text>
        <Button
          onPress={() => {
            requestPermission();
            requestMediaPermission();
          }}
          title="Grant Permissions"
        />
      </View>
    );
  }

  async function handleFaceDetection({ faces }) {
    if (faceDetected || !cameraRef.current || faces.length === 0) return;
    setFaceDetected(true);

    try {
      const photo = await cameraRef.current.takePictureAsync();
      await MediaLibrary.createAssetAsync(photo.uri);
      alert("Photo captured and saved!");
    } catch (error) {
      console.error("Error taking photo:", error);
    } finally {
      setTimeout(() => setFaceDetected(false), 5000);
    }
  }

  function toggleCameraFacing() {
    setFacing((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={facing}
        ref={cameraRef}
        onFacesDetected={handleFaceDetection}
        faceDetectorSettings={{
          mode: "fast",
          detectLandmarks: "none",
          runClassifications: "none",
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
