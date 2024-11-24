import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import * as Yup from "yup";

import { AppForm, SubmitButton, TaskFormField } from "../components/forms";
import AppScreen from "../components/AppScreen";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().label("Title"),
  description: Yup.string().required().label("Description"),
  starts: Yup.string().label("Staets"),
  ends: Yup.string().label("Ends"),
  client: Yup.string().label("Client"),
});

function ProjectsFormScreen(props) {
  return (
    <AppScreen style={styles.container}>
      <ScrollView>
        <AppForm
          initialValues={{
            title: "",
            description: "",
            starts: "",
            ends: "",
            client: "",
          }}
          onSubmit={(values) => console.log(values)}
          validationSchema={validationSchema}
        >
          <TaskFormField
            name="title"
            placeholder="Title"
            maxLength={100}
            autoFocus
          />
          <TaskFormField
            name="description"
            placeholder="Description"
            maxLength={100}
          />
          <TaskFormField
            name="starts"
            placeholder="Starts"
            keyboardType="phone-pad"
          />
          <TaskFormField
            name="ends"
            placeholder="Ends"
            keyboardType="phone-pad"
          />
          <TaskFormField
            name="client"
            placeholder="Client"
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

export default ProjectsFormScreen;
