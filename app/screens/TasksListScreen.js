import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import React, { useState } from "react";
import { FlatList, View, Button, Text, StyleSheet } from "react-native";

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

  function OpenCamera() {
    const [facing, setFacing] = useState < CameraType > "back";
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
      // Camera permissions are still loading.
      return <View />;
    }

    if (!permission.granted) {
      // Camera permissions are not granted yet.
      return (
        <View style={styles.container}>
          <Text style={styles.message}>
            We need your permission to show the camera
          </Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <CameraView style={styles.camera} facing={facing}></CameraView>
      </View>
    );
  }

  return (
    <>
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
      <AddTaskButton />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default TasksListScreen;
