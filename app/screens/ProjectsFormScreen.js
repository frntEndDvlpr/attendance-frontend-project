import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Yup from "yup";

import { AppForm, SubmitButton, TaskFormField } from "../components/forms";
import AppScreen from "../components/AppScreen";
import projectApi from "../api/project";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().label("Title"),
  description: Yup.string().required().label("Description"),
  start_date: Yup.string().nullable().notRequired().label("Starts"),
  end_date: Yup.string().nullable().notRequired().label("Ends"),
  client: Yup.string().nullable().notRequired().label("Client"),
  location: Yup.object()
    .shape({
      latitude: Yup.number().required().label("Latitude"),
      longitude: Yup.number().required().label("Longitude"),
    })
    .nullable()
    .notRequired()
    .label("Location"),
});

function ProjectsFormScreen({ navigation, route }) {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const project = route.params?.project || null;

  const initialValues = {
    title: project?.title || "",
    description: project?.description || "",
    start_date: project?.start_date || "",
    end_date: project?.end_date || "",
    client: project?.client || "",
    location: project?.location || null,
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  // Handle submit
  const handleSubmit = async (projectData) => {
    let result;
    setProgress(0);
    setUploadVisible(true);

    const dataToSubmit = { ...projectData, location: selectedLocation };

    if (project) {
      result = await projectApi.updateProject(
        project.id,
        dataToSubmit,
        (progress) => setProgress(progress)
      );
    } else {
      result = await projectApi.addProject(dataToSubmit, (progress) =>
        setProgress(progress)
      );
    }

    if (!result.ok) {
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
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            onPress={handleMapPress}
            initialRegion={{
              latitude: selectedLocation?.latitude || 37.78825,
              longitude: selectedLocation?.longitude || -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          ></MapView>
        </View>
        <View style={styles.fieldsContainer}>
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
          {selectedLocation && <Marker coordinate={selectedLocation} />}

          <SubmitButton title={project ? "Update" : "Save"} />
        </View>
      </AppForm>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  mapContainer: {
    flex: 1,
    height: 300,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  fieldsContainer: { flex: 2 },
});

export default ProjectsFormScreen;
