import React, { useState, useEffect } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";

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
  email: Yup.string().notRequired().nullable().label("Email"),
  phone: Yup.string().label("Phone"),
  designation: Yup.string().nullable().label("Designation"),
  department: Yup.string().nullable().label("Department"),
});

function EmployeeFormScreen({ navigation, route }) {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState([]);
  const [project, setPrject] = useState();
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [photo, setphoto] = useState(null);

  const employee = route.params?.employee || null;

  const openMediaLibrary = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 0.5,
      });
      if (!result.canceled) {
        setphoto(result.assets[0].uri);
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
        setphoto(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error loading the image: ", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await auth.getUsers();
    if (response.ok) {
      setUser(response.data);
    } else {
      alert("Could not fetch Users.");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const response = await projectApi.getProjects();
    if (response.ok) {
      setProjects(response.data);
    } else {
      alert("Could not fetch projects.");
    }
  };

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

  // Handle submit
  const handleSubmit = async (employeeData) => {
    let result;
    setProgress(0);
    setUploadVisible(true);

    const dataToSubmit = {
      ...employeeData,
      projects: selectedProjects.map((p) => p.id), // Send only project IDs
      user_id: selectedUser?.[0]?.id || null,
      photo: photo,
    };
    console.log("data", dataToSubmit);

    if (employee) {
      result = await employeesApi.updateEmployee(
        employee.id,
        dataToSubmit,
        (progress) => setProgress(progress)
      );
    } else {
      result = await employeesApi.addEmployee(dataToSubmit, (progress) =>
        setProgress(progress)
      );
    }

    if (!result.ok) {
      console.log(result.problem);
      //console.log(dataToSubmit);
      setUploadVisible(false);
      return alert("Could not save the employee!");
    }

    setProgress(1);
    if (route.params?.onGoBack) route.params.onGoBack();
    setTimeout(() => {
      setUploadVisible(false);
      navigation.goBack();
    }, 2000);
  };

  return (
    <AppScreen style={styles.container}>
      <ScrollView>
        <UploadScreen
          onDone={() => setUploadVisible(false)}
          progress={progress}
          visible={uploadVisible}
        />
        <View style={styles.imageContainer}>
          <ImageInput
            imageUri={photo}
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
            icon="apps"
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
  container: {
    marginHorizontal: 10,
    fontWeight: "bold",
  },
  imageContainer: {
    marginVertical: 50,
    alignSelf: "center",
  },
});

export default EmployeeFormScreen;
