import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import Autocomplete from "react-native-autocomplete-input";
import { useFormikContext } from "formik";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import ImageInput from "../components/ImageInput";
import employeesApi from "../api/employees";
import authApi from "../api/auth";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
  employee: Yup.number().label("Employee Id"),
  employee_name: Yup.string().label("Employee Name"),
  name: Yup.string().required().label("Username"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  imageUri: Yup.mixed(),
});

function RegisterScreen({ navigation }) {
  const [imageUri, setImageUri] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [progress, setProgress] = useState(0);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  console.log("Selected Employee", selectedEmployee);

  const fetchEmployees = async () => {
    const result = await employeesApi.getEmployees();
    if (result.ok) {
      const employeeObj = result.data.map((employee) => ({
        id: employee.id,
        name: employee.name,
        email: employee.email,
      }));
      setEmployees(employeeObj);
      console.log("Employee", employeeObj);
    } else {
      alert("Could not fetch employees");
      console.error("Could not fetch employees");
    }
  };

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

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (userData) => {
    let result;
    setProgress(0);
    setUploadVisible(true);

    const dataToSubmit = { ...userData, employee: selectedEmployee.id };

    result = await authApi.adduser(dataToSubmit, (progress) =>
      setProgress(progress),
    );

    //Update the selected employee's profile with the captured photo
    if (imageUri && selectedEmployee?.id) {
      try {
        await employeesApi.updateEmployee(selectedEmployee.id, {
          photo: imageUri,
        });
      } catch (error) {
        console.error("Failed to update employee photo:", error);
        alert("NOTE!", "User created, but employee's photo did not updated");
      }
    }

    if (!result.ok) {
      console.log(result.problem);
      console.log(dataToSubmit);
      setUploadVisible(false);
      return alert("Could not save the user!");
    }

    setProgress(1);
    setTimeout(() => {
      setUploadVisible(false);
      navigation.navigate("Login");
    }, 2000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0} // adjust if needed
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
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
                    ],
                  );
                }}
              />
            </View>
            <UploadScreen
              onDone={() => setUploadVisible(false)}
              progress={progress}
              visible={uploadVisible}
            />
            <AppForm
              initialValues={{
                employee_name: "",
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                imageUri: null,
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <FormObserver query={query} imageUri={imageUri} />
              <View style={styles.autocompleteContainer}>
                <Autocomplete
                  data={filteredEmployees}
                  defaultValue={query}
                  onChangeText={(text) => {
                    setQuery(text);
                    if (text) {
                      const filtered = employees.filter((employee) =>
                        employee.name
                          .toLowerCase()
                          .includes(text.toLowerCase()),
                      );
                      setFilteredEmployees(filtered);
                    } else {
                      setFilteredEmployees([]);
                    }
                  }}
                  placeholder="Select Employee"
                  flatListProps={{
                    keyExtractor: (_, idx) => idx.toString(),
                    renderItem: ({ item }) => (
                      <EmployeeItem
                        item={item}
                        setQuery={setQuery}
                        setFilteredEmployees={setFilteredEmployees}
                        setSelectedEmployee={setSelectedEmployee}
                      />
                    ),
                  }}
                  containerStyle={styles.autocompleteContainerStyle}
                  inputContainerStyle={styles.autocompleteInputContainerStyle}
                  listStyle={styles.autocompleteListStyle}
                />
              </View>
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
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

// EmployeeItem component to render each employee in the autocomplete list
function EmployeeItem({
  item: employeeItem,
  setQuery,
  setFilteredEmployees,
  setSelectedEmployee,
}) {
  const { setFieldValue } = useFormikContext();

  return (
    <TouchableOpacity
      onPress={() => {
        setQuery(employeeItem.name);
        setFilteredEmployees([]);
        setFieldValue("name", employeeItem.name);
        setFieldValue("email", employeeItem.email);
        setSelectedEmployee(employeeItem); // Now this function is available as a prop
      }}
    >
      <Text style={styles.itemText}>{employeeItem.name}</Text>
    </TouchableOpacity>
  );
}

function FormObserver({ query, imageUri }) {
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    setFieldValue("employee_name", query);
  }, [query]);

  useEffect(() => {
    setFieldValue("imageUri", imageUri);
  }, [imageUri]);

  return null;
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    fontWeight: "bold",
  },
  imageContainer: {
    marginVertical: 50,
    alignSelf: "center",
  },
  autocompleteContainer: {
    marginBottom: 50,
  },
  autocompleteContainerStyle: {
    flex: 1,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1,
  },
  autocompleteInputContainerStyle: {
    borderWidth: 0,
  },
  autocompleteListStyle: {
    borderWidth: 1,
    borderColor: "#ddd",
    maxHeight: 200,
  },
  itemText: {
    padding: 10,
    fontSize: 18,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 40,
  },
});

export default RegisterScreen;
