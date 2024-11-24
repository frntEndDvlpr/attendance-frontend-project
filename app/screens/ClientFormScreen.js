import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import * as Yup from "yup";

import { AppForm, SubmitButton, TaskFormField } from "../components/forms";
import AppScreen from "../components/AppScreen";

const validationSchema = Yup.object().shape({
  companyName: Yup.string().required().label("Company Name"),
  contactPerson: Yup.string().label("Contact Person"),
  contactPhone: Yup.string().label("Contact Phone"),
});

function ClientFormScreen(props) {
  return (
    <AppScreen style={styles.container}>
      <ScrollView>
        <AppForm
          initialValues={{
            companyName: "",
            contactPerson: "",
            contactPhone: "",
          }}
          onSubmit={(values) => console.log(values)}
          validationSchema={validationSchema}
        >
          <TaskFormField
            name="companyName"
            placeholder="Company Name"
            maxLength={100}
            autoFocus
            icon="city-variant-outline"
          />
          <TaskFormField
            name="contactPerson"
            placeholder="Contact Person"
            maxLength={100}
            icon="account"
          />
          <TaskFormField
            name="contactPhone"
            placeholder="Contact Phone"
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

export default ClientFormScreen;
