/* This code defines the EmployeeFormScreen component, which allows users to create or update employee records.
  It includes form validation, image upload functionality, and integrates with the employees API to save data. */

import React, { useState, useEffect } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppScreen from "../components/AppScreen";
import employeesApi from "../api/employees";
import projectApi from "../api/project";
import UploadScreen from "./UploadScreen";
import AppPicker from "../components/AppPicker";
import auth from "../api/auth";
import ImageInput from "../components/ImageInput";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  employeeCode: Yup.string().required().label("Employee Code"),
  email: Yup.string().nullable().label("Email"),
  phone: Yup.string().label("Phone"),
  designation: Yup.string().nullable().label("Designation"),
  department: Yup.string().nullable().label("Department"),
});

function EmployeeFormScreen({ navigation, route }) {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [photo, setPhoto] = useState(null);

  const employee = route.params?.employee || null;

  const openMediaLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const manipulated = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 800 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      setPhoto(manipulated.uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      cameraType: "front",
      quality: 0.7,
      allowsEditing: true,
    });

    if (!result.canceled) {
      const manipulated = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 800 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      setPhoto(manipulated.uri);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      const projectRes = await projectApi.getProjects();
      const userRes = await auth.getUsers();

      if (projectRes.ok) setProjects(projectRes.data);
      if (userRes.ok) setUser(userRes.data);
    };
    fetchInitialData();
  }, []);

  const initialValues = {
    name: employee?.name || "",
    employeeCode: employee?.employeeCode || "",
    email: employee?.email || "",
    phone: employee?.phone || "",
    designation: employee?.designation || "",
    department: employee?.department || "",
    projects: employee?.projects || [],
    user_id: employee?.user_id || "",
  };

  const handleSubmit = async (employeeData) => {
    setProgress(0);
    setUploadVisible(true);

    const dataToSubmit = {
      ...employeeData,
      projects: selectedProjects.map((p) => p.id),
      user_id: selectedUser?.[0]?.id || null,
      photo: photo !== employee?.photo ? photo : null,
    };

    const result = employee
      ? await employeesApi.updateEmployee(
          employee.id,
          dataToSubmit,
          setProgress
        )
      : await employeesApi.addEmployee(dataToSubmit, setProgress);

    setProgress(1);
    if (!result.ok) {
      setUploadVisible(false);
      console.log("Data submitted:", dataToSubmit);
      console.log("API response:", result.problem);
      return alert("Could not save the employee!");
    }

    // Success — handled in UploadScreen's `onDone`
  };

  const handleUploadDone = () => {
    setUploadVisible(false);
    if (route.params?.onGoBack) route.params.onGoBack();
    navigation.goBack();
  };

  return (
    <AppScreen style={styles.container}>
      <ScrollView>
        <UploadScreen
          onDone={handleUploadDone}
          progress={progress}
          visible={uploadVisible}
        />

        <View style={styles.imageContainer}>
          <ImageInput
            imageUri={photo}
            handlePress={() => {
              Alert.alert("Select an image", "Camera or Library?", [
                { text: "Take Photo", onPress: takePhoto },
                { text: "Choose from Library", onPress: openMediaLibrary },
                { text: "Cancel", style: "cancel" },
              ]);
            }}
          />
        </View>

        <AppForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppFormField
            name="name"
            placeholder="Full Name"
            maxLength={100}
            autoFocus
          />
          <AppFormField
            name="employeeCode"
            placeholder="Employee Code"
            maxLength={10}
            icon="account"
          />
          <AppFormField
            name="email"
            placeholder="Email"
            keyboardType="email-address"
            icon="email"
          />
          <AppFormField
            name="phone"
            placeholder="Phone"
            icon="phone"
            keyboardType="phone-pad"
          />
          <AppFormField name="designation" placeholder="Designation" />
          <AppFormField name="department" placeholder="Department" />
          <AppPicker
            icon="apps"
            items={projects}
            placeholder="Select Projects"
            selectedItems={selectedProjects}
            onSelectItems={setSelectedProjects}
          />
          <AppPicker
            icon="account"
            items={user}
            placeholder="Select User"
            selectedItems={selectedUser}
            onSelectItems={setSelectedUser}
          />
          <SubmitButton title={employee ? "Update" : "Save"} />
        </AppForm>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: { marginHorizontal: 10 },
  imageContainer: { marginVertical: 50, alignSelf: "center" },
});

export default EmployeeFormScreen;
