import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import ImageInput from "../components/ImageInput";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Username"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  imageUri: Yup.mixed().required("Profile Picture is required"), // Add imageUri to validation schema
});

function RegisterScreen(props) {
  const [imageUri, setImageUri] = useState(null);

  const openMediaLibrary = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 0.5,
      });
      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error loading the image: ", error);
    }
  };

  const TakePhoto = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        quality: 0.5,
        allowsEditing: true,
      });
      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error loading the image: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageInput
          imageUri={imageUri}
          handlePress={() => {
            Alert.alert(
              "Select an image",
              "Would you like to take a photo or choose one from your library?",
              [
                {
                  text: "Take Photo",
                  onPress: () => {
                    TakePhoto();
                  },
                },
                {
                  text: "Choose from Library",
                  onPress: () => {
                    openMediaLibrary();
                  },
                },
                { text: "Cancel" },
              ]
            );
          }}
        />
      </View>
      <AppForm
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          imageUri: null, // Add imageUri to initial values
        }}
        onSubmit={(values) => {
          values.imageUri = imageUri; // Include imageUri in form submission
          console.log(values);
        }}
        validationSchema={validationSchema}
      >
        <AppFormField
          name="name"
          placeholder="Username"
          maxLength={100}
          autoFocus
          icon="account"
        />
        <AppFormField
          name="email"
          placeholder="Email"
          keyboardType="email-address"
          icon="email"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="emailAddress"
        />
        <AppFormField
          name="password"
          placeholder="Password"
          icon="lock"
          secureTextEntry
          textContentType="password"
        />
        <AppFormField
          name="confirmPassword"
          placeholder="Confirm Password"
          icon="lock"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Register" />
      </AppForm>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    fontWeight: "bold",
  },
  imageContainer: {
    marginVertical: 50,
    alignSelf: "center",
  },
});

export default RegisterScreen;
