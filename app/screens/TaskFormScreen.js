import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import * as Yup from "yup";

import { AppForm, TaskFormField, SubmitButton } from "../components/forms";

const validationSchema = Yup.object().shape({
  assignee: Yup.string().required().label("Assignee"),
  client: Yup.string().label("Client"),
  department: Yup.string().label("Department"),
  description: Yup.string().label("Description"),
  ends: Yup.string().required().label("Ends"),
  project_code: Yup.string().required().label("Project Code"),
  starts: Yup.string().required().label("Stats"),
  title: Yup.string().required().label("Title"),
});

function TaskFormScreen(props) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <AppForm
          initialValues={{
            assignee: "",
            client: "",
            department: "",
            description: "",
            ends: "",
            project_code: "",
            starts: "",
            title: "",
          }}
          onSubmit={(values) => console.log(values)}
          validationSchema={validationSchema}
        >
          <TaskFormField
            name="title"
            placeholder="Task"
            maxLength={100}
            autoFocus
            icon="clipboard-clock-outline"
          />
          <TaskFormField
            name="description"
            placeholder="Description"
            multiline
            numberOfLines={3}
            maxLength={255}
            icon="file-document-edit-outline"
          />
          <TaskFormField
            name="project-code"
            placeholder="Project Code"
            icon="folder-pound-outline"
          />
          <TaskFormField
            name="starts"
            placeholder="Starts"
            icon="calendar-start"
          />
          <TaskFormField name="ends" placeholder="Ends" icon="calendar-end" />
          <TaskFormField
            name="assignee"
            placeholder="Assignee"
            icon="account"
          />
          <TaskFormField
            name="department"
            placeholder="Department"
            icon="office-building-cog-outline"
          />
          <TaskFormField
            name="client"
            placeholder="Client"
            icon="city-variant-outline"
          />
          <SubmitButton title="Post" />
        </AppForm>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    fontWeight: "bold",
  },
});

export default TaskFormScreen;
