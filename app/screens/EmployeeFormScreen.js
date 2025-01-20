import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import * as Yup from "yup";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppScreen from "../components/AppScreen";
import employeesApi from "../api/employees";

const validationSchema = Yup.object().shape({
  employeeCode: Yup.string().required().label("Employee Code"),
  name: Yup.string().required().label("Full Name"),
  department: Yup.string().label("Department"),
  designation: Yup.string().label("Designation"),
  email: Yup.string().label("Email"),
  phone: Yup.string().label("Phone"),
});

function EmployeeFormScreen({ navigation, route }) {
  const employee = route.params?.employee;
  const initialValues = {
    employeeCode: employee?.employeeCode || "",
    name: employee?.name || "",
    department: employee?.department || "",
    designation: employee?.designation || "",
    email: employee?.email || "",
    phone: employee?.phone || "",
  };
  console.log("Employee data:", employee);
  console.log("Initial values:", initialValues);

  // Add or update an employee in the database
  const handleSubmit = async (employeeData) => {
    let result;
    if (employee) {
      result = await employeesApi.updateEmployee(employee.id, employeeData);
    } else {
      result = await employeesApi.addEmployee(employeeData);
    }

    if (!result.ok) return console.log(result.problem);
    alert(
      employee
        ? "Employee updated successfully."
        : "Employee saved successfully."
    );
    if (route.params?.onGoBack) route.params.onGoBack();
    navigation.goBack();
  };

  return (
    <AppScreen style={styles.container}>
      <ScrollView>
        <AppForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppFormField
            name="employeeCode"
            placeholder="Employee Code"
            maxLength={100}
            autoFocus
            icon="city-variant-outline"
          />
          <AppFormField name="name" placeholder="Full Name" maxLength={100} />
          <AppFormField name="department" placeholder="Department" />
          <AppFormField name="designation" placeholder="Designation" />
          <AppFormField name="email" placeholder="Email" />
          <AppFormField
            name="Phone"
            placeholder="Phone"
            icon="phone"
            keyboardType="phone-pad"
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
});

export default EmployeeFormScreen;
