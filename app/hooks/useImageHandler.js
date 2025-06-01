import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { useState } from "react";

export function useImageHandler() {
  const [image, setImage] = useState(null);

  const processImage = async (uri) => {
    const manipulated = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 800 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
    );

    const filename = manipulated.uri.split("/").pop();
    const type = "image/jpeg";

    setImage({
      uri: manipulated.uri,
      name: filename,
      type,
    });
  };

  const pickImageFromCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      cameraType: "front",
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      await processImage(result.assets[0].uri);
    }
  };

  const pickImageFromLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      await processImage(result.assets[0].uri);
    }
  };

  return {
    image, // This is the processed { uri, name, type } object
    pickImageFromCamera,
    pickImageFromLibrary,
    setImage, // optional
  };
}
