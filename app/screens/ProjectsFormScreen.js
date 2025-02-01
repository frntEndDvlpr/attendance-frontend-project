import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import * as Yup from "yup";
import * as Location from "expo-location";

import { AppForm, TaskFormField, SubmitButton } from "../components/forms";
import projectApi from "../api/project";
import UploadScreen from "./UploadScreen";
import MapView, { Circle, Marker } from "react-native-maps";
import AppIcon from "../components/AppIcon";
import colors from "../config/colors";
import AppText from "../components/AppText";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().label("Title"),
  description: Yup.string().required().label("description"),
  start_date: Yup.string().notRequired().nullable().label("Start Date"),
  end_date: Yup.string().label("End Date"),
  client: Yup.string().nullable().label("Client"),
  location: Yup.string().nullable().label("Client"),
  attendanceRange: Yup.string().nullable().label("Attendance Range"),
});

function ProjectsFormScreen({ navigation, route }) {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const project = route.params?.project || null;

  // Map variables
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [radius, setRadius] = useState(100);

  //Permissioning and getting the current location
  useEffect(() => {
    //Get locatio permission
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      //Get current location
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  // Handeling selected location
  const handelSelectedLocation = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const initialValues = {
    title: project?.title || "",
    description: project?.description || "",
    start_date: project?.start_date || "",
    end_date: project?.end_date || "",
    client: project?.client || "",
    location: project?.location || "",
    attendanceRange: project?.attendanceRange || 0,
  };

  // Handling submission form
  const handleSubmit = async (projectData) => {
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
    <View style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      {
        <AppText style={styles.projectLocationText}>
          Project Location:
          {selectedLocation
            ? `${selectedLocation.latitude}, ${selectedLocation.longitude}`
            : "None"}
        </AppText>
      }
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          mapType="hybrid"
          initialRegion={currentLocation}
          onLongPress={handelSelectedLocation}
        >
          <TextInput
            style={styles.radiusInput}
            keyboardType="numeric"
            value={String(radius)}
            onChangeText={(text) => setRadius(Number(text))}
            placeholder="Enter radius"
          />{" "}
          {currentLocation && (
            <Marker coordinate={currentLocation}>
              <AppIcon
                name="map-marker"
                iconColor={colors.red}
                size={70}
                backgroundColor={false}
              />
            </Marker>
          )}{" "}
          {selectedLocation && (
            <>
              <Marker coordinate={selectedLocation}>
                <AppIcon
                  name="bullseye"
                  size={70}
                  iconColor={colors.primary}
                  backgroundColor={false}
                />
              </Marker>
              <Circle
                center={selectedLocation}
                radius={radius}
                strokeColor={colors.primary}
                fillColor={colors.primaryTransparency}
              />
            </>
          )}
        </MapView>
      </View>

      <View style={styles.formConatainer}>
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
            <TaskFormField name="description" placeholder="Description" />
            <TaskFormField name="start_date" placeholder="start Date" />
            <TaskFormField name="end_date" placeholder="End Date" icon="" />
            <TaskFormField name="client" placeholder="Client" />
            <TaskFormField name="location" placeholder="Location" />
            <TaskFormField
              name="attendanceRange"
              placeholder="Attendance Range in Meters"
            />

            <SubmitButton title={project ? "Update" : "Save"} />
          </AppForm>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  mapContainer: { flex: 1 },
  map: { flex: 1 },
  formConatainer: { flex: 2 },
  projectLocationText: { padding: 3, fontWeight: "bold" },
  radiusInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
});

export default ProjectsFormScreen;
