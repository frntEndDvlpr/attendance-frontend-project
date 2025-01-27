import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import * as Yup from "yup";

import { AppForm, SubmitButton, TaskFormField } from "../components/forms";
import AppScreen from "../components/AppScreen";
import projectApi from "../api/project";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().label("Title"),
  description: Yup.string().required().label("Description"),
  start_date: Yup.string().nullable().notRequired().label("Staets"),
  end_date: Yup.string().nullable().notRequired().label("Ends"),
  client: Yup.string().nullable().notRequired().label("Client"),
  employees: Yup.string().nullable().notRequired().label("Employees"),
  location: Yup.string().nullable().notRequired().label("Location"),
});

function ProjectsFormScreen({ navigation, route }) {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const project = route.params?.project || null;

  const initialValues = {
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    client: "",
    employees: "",
    location: "",
  };

  // Handle submit
  const handleSubmit = async (projectData) => {
    console.log(projectData);

    let result;
    setProgress(0);
    setUploadVisible(true);

    if (project) {
      result = await projectApi.updateProject(
        project.id,
        projectData,
        (progress) => setProgress(progress)
      );
    } else {
      result = await projectApi.addProject(projectData, (progress) =>
        setProgress(progress)
      );
    }

    if (!result.ok) {
      console.log(result.problem);
      setUploadVisible(false);
      return alert("Could not save the project!");
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
        <AppForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
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
          <TaskFormField name="start_date" placeholder="Starts" />
          <TaskFormField name="end_date" placeholder="Ends" />
          <TaskFormField name="client" placeholder="Client" />
          <TaskFormField name="location" placeholder="Location" />
          <SubmitButton title={project ? "Update" : "Save"} />
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
