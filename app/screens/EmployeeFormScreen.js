import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import * as Yup from "yup";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppScreen from "../components/AppScreen";

const validationSchema = Yup.object().shape({
  employeeCode: Yup.string().required().label("Employee Code"),
  name: Yup.string().required().label("Full Name"),
  department: Yup.string().label("Department"),
  designation: Yup.string().label("Designation"),
  email: Yup.string().label("Email"),
  Phone: Yup.string().label("Phone"),
});

function EmployeeFormScreen(props) {
  return (
    <AppScreen style={styles.container}>
      <ScrollView>
        <AppForm
          initialValues={{
            employeeCode: "",
            name: "",
            department: "",
            designation: "",
            email: "",
            Phone: "",
          }}
          onSubmit={(values) => console.log(values)}
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
          <SubmitButton title="Save" />
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
