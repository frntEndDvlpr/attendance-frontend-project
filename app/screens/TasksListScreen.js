import React, { useState, useRef } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";

import TaskListItem from "../components/TaskListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import AddTaskButton from "../navigation/AddTaskButton";

const initialTasks = [
  {
    id: 1,
    title: "Task 1",
    date: "1/1/2024",
    assignee: "Assignee",
  },
  {
    id: 2,
    title: "Task 2",
    date: "6/19/2024",
    assignee: "Ahmed",
    project: "Project 2",
  },
  {
    id: 3,
    title: "Task 3",
    date: "7/19/2024",
    assignee: "Ali",
    project: "Project 3",
    customer: "XYZ",
  },
];
function TasksListScreen({ navigation }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (task) => {
    setTasks(tasks.filter((t) => t.id !== task.id));
  };

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const handleCameraReady = () => {
    setIsCameraReady(true);
  };

  const openCamera = async () => {
    if (hasPermission === null) {
      await requestCameraPermission();
    }
    if (hasPermission === false) {
      Alert.alert("Permission to access camera is required!");
    }
  };

  return (
    <>
      <View style={styles.container}>
        {hasPermission && (
          <Camera
            style={styles.camera}
            ref={(ref) => setCameraRef(ref)}
            onCameraReady={handleCameraReady}
          />
        )}
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(task) => task.id.toString()}
        renderItem={({ item }) => (
          <TaskListItem
            title={item.title}
            date={item.date}
            assignee={item.assignee}
            project={item.project}
            customer={item.customer}
            image={item.image}
            onPress={() => navigation.navigate("TaskForm", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setTasks([
            {
              id: 2,
              title: "Task 2",
              date: "6/19/2024",
              assignee: "Ahmed",
              project: "Project 2",
              customer: "ABC",
            },
          ]);
        }}
      />
      <AddTaskButton onPress={openCamera} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  button: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "#1E90FF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default TasksListScreen;
