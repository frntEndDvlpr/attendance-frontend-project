import React, { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";

import ListItemSeparator from "../components/ListItemSeparator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import AddTaskButton from "../components/AddTaskButton";
import ProjectListItem from "../components/ProjectListItem";
import projectApi from "../api/project";
import HeaderAlert from "../components/HeaderAlert";
import UploadScreen from "./UploadScreen";
import ActivityIndicator from "../components/ActivityIndicator";
import colors from "../config/colors";

function ProjecstListScreen({ navigation }) {
  const [projects, setprojects] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState(false);

  // Sort Projects list descending based on the 'id'
  const sortedProjects = projects.sort((a, b) => b.id - a.id);

  // Get employees list from the server
  const loadProjects = async () => {
    setLoading(true); // Start loading
    const response = await projectApi.getProjects(); // Get employees
    setLoading(false); // Stop loading

    if (!response.ok) {
      setError(true);
      console.log(response.problem);
      setResponse(response.problem);
    } else {
      setError(false);
      setprojects(response.data);
      //console.log("Success:", response.data);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Delete a project
  const handleDelete = async (project) => {
    setProgress(0);
    setUploadVisible(true);
    const response = await projectApi.deleteProject(project.id, (progress) =>
      setProgress(progress)
    );
    setUploadVisible(false);

    if (!response.ok) {
      setUploadVisible(false);
      return Alert.alert("Fail", "Faiel to delet the project", [
        { text: "Retry", onPress: () => handleDelete(project) },
        { text: "Cancel", style: "cancel" },
      ]);
    }

    setProgress(1);
    setUploadVisible(false);
    setprojects(projects.filter((e) => e.id !== project.id));
    projects.filter;
  };

  // Confirm before deleting a project
  const confirmDelete = (project) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this project?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => handleDelete(project),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <>
      {/* Display loading bar while data is being fetched from the server */}
      {loading && <ActivityIndicator visible={true} />}

      {/* Display error message if data could not be fetched from the server */}
      {error && !loading && (
        <HeaderAlert
          error={
            "NETWORK ERROR: Couldn't retrieve or update the projects list."
          }
          backgroundColor={colors.danger}
          textStyle={{ color: colors.white }}
          iconName={"alert-circle-outline"}
          iconSize={70}
          iconColor={colors.white}
        />
      )}

      {/* Display "No projects found!" message if there are no employees */}
      {!loading && !error && projects.length === 0 && (
        <HeaderAlert
          error="No projects! Click on the + button to add a new project."
          backgroundColor={colors.secondary}
          textStyle={{ color: colors.white }}
          iconName={"file-alert-outline"}
          iconSize={70}
          iconColor={colors.white}
        />
      )}

      {/* Display the upload screen */}
      <UploadScreen
        onDone={() => {
          setUploadVisible(false);
        }}
        progress={progress}
        visible={uploadVisible}
      />

      {/* Display the list of projects */}
      <FlatList
        data={projects}
        keyExtractor={(project) => project.id.toString()}
        renderItem={({ item }) => (
          <ProjectListItem
            title={item.title}
            description={item.description}
            start_date={item.start_date}
            end_date={item.end_date}
            client={item.client}
            location={item.location}
            attendanceRange={item.attendanceRange}
            onPress={() => {
              navigation.navigate("ProjectForm", {
                project: item,
                onGoBack: loadProjects,
              });
            }}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => confirmDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          loadProjects();
        }}
      />
      <AddTaskButton
        onPress={() =>
          navigation.navigate("ProjectForm", { onGoBack: loadProjects })
        }
      />
    </>
  );
}

export default ProjecstListScreen;
