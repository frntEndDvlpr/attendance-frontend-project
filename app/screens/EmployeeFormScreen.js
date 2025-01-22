import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import * as Yup from "yup";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppScreen from "../components/AppScreen";
import employeesApi from "../api/employees";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  employeeCode: Yup.string().required().label("Employee Code"),
  email: Yup.string().label("Email"),
  phone: Yup.string().label("Phone"),
  designation: Yup.string().label("Designation"),
  department: Yup.string().label("Department"),
});

function EmployeeFormScreen({ navigation, route }) {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const employee = route.params?.employee;
  const initialValues = {
    name: employee?.name || "",
    employeeCode: employee?.employeeCode || "",
    email: employee?.email || "",
    phone: employee?.phone || "",
    designation: employee?.designation || "",
    department: employee?.department || "",
  };
  //console.log("Employee data:", employee);
  //console.log("Initial values:", initialValues);

  // Add or update an employee in the database
  const handleSubmit = async (employeeData) => {
    let result;
    setProgress(0);
    setUploadVisible(true);

    if (employee) {
      result = await employeesApi.updateEmployee(
        employee.id,
        employeeData,
        (progress) => setProgress(progress)
      );
    } else {
      result = await employeesApi.addEmployee(employeeData, (progress) =>
        setProgress(progress)
      );
    }

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the employee.");
    }

    setProgress(1);
    if (route.params?.onGoBack) route.params.onGoBack();
    setTimeout(() => {
      setUploadVisible(false);
      navigation.goBack();
    }, 3000);
  };

  return (
    <AppScreen style={styles.container}>
      <ScrollView>
        <UploadScreen
          onDone={() => {
            setUploadVisible(false);
          }}
          progress={progress}
          visible={uploadVisible}
        />
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
            name="Phone"
            placeholder="Phone"
            icon="phone"
            keyboardType="phone-pad"
          />
          <AppFormField name="designation" placeholder="Designation" />
          <AppFormField name="department" placeholder="Department" />

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
});

export default EmployeeFormScreen;
