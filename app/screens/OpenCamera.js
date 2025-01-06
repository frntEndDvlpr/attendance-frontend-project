import React, { useState, useEffect } from "react";
import { View, Button, Image, Alert, Text } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Camera, CameraView } from "expo-camera";

export default function OpenCamera() {
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

  const takePicture = async () => {
    if (camera) {
      const photoData = await camera.takePictureAsync();
      setPhoto(photoData.uri);
      savePhotoToCameraRoll(photoData.uri);
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
      <CameraView style={{ flex: 1 }} ref={setCamera}>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Button title="Take Picture" onPress={takePicture} />
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
