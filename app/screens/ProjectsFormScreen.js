import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as Yup from "yup";

import { AppForm, SubmitButton, TaskFormField } from "../components/forms";
import projectApi from "../api/project";
import UploadScreen from "./UploadScreen";
import AppText from "../components/AppText";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().label("Title"),
  description: Yup.string().required().label("Description"),
  start_date: Yup.string().nullable().notRequired().label("Starts"),
  end_date: Yup.string().nullable().notRequired().label("Ends"),
  client: Yup.string().nullable().notRequired().label("Client"),
  location: Yup.object()
    .shape({
      latitude: Yup.number().nullable().notRequired().label("Latitude"),
      longitude: Yup.number().nullable().notRequired().label("Longitude"),
    })
    .nullable()
    .notRequired()
    .label("Location"),
  range: Yup.number().nullable().notRequired().label("Range"),
});

function ProjectsFormScreen({ navigation, route }) {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const project = route.params?.project || null;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const initialValues = {
    title: project?.title || "",
    description: project?.description || "",
    start_date: project?.start_date || "",
    end_date: project?.end_date || "",
    client: project?.client || "",
    location: project?.location || { latitude: null, longitude: null },
    range: project?.range || "",
  };

  // Handle submit
  const handleSubmit = async (projectData) => {
    let result;
    setProgress(0);
    setUploadVisible(true);

    const dataToSubmit = {
      ...projectData,
      location: selectedLocation
        ? {
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
          }
        : projectData.location,
    };

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
      console.log(dataToSubmit);
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

  const handelSelectedLocation = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  return (
    <View style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />

      <AppText style={styles.selectedLocationHeader}>
        Selected Location:
        {selectedLocation
          ? `${selectedLocation.latitude}, ${selectedLocation.longitude}`
          : "None"}
      </AppText>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={currentLocation}
          onLongPress={handelSelectedLocation}
        >
          {currentLocation && <Marker coordinate={currentLocation} />}
          {selectedLocation && (
            <Marker
              coordinate={selectedLocation}
              image={require("../assets/selectedLocation.png")}
            />
          )}
        </MapView>
      </View>

      <View style={styles.fieldsContainer}>
        <ScrollView>
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
            <TaskFormField name="location.latitude" placeholder="Latitude" />
            <TaskFormField name="location.longitude" placeholder="Longitude" />
            <TaskFormField name="rang" placeholder="Range" />
            <TaskFormField name="client" placeholder="Client" />

            <SubmitButton title={project ? "Update" : "Save"} />
          </AppForm>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  fieldsContainer: { flex: 2 },
  selectedLocationHeader: { padding: 3 },
});

export default ProjectsFormScreen;
