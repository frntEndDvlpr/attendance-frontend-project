import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import TaskListItem from "../components/TaskListItem";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import AppText from "../components/AppText";
import colors from "../config/colors";
import CameraNavigator from "../navigation/CameraNavigator";
import TextHeader from "../components/TextHeader";

const initialTasks = [
  {
    id: 1,
    date: "6/19/2024",
    time_in: "07-30",
    time_out: "16-30",
    location: "HO",
    status: "Present",
    total_hours: "8Hrs",
  },
  {
    id: 2,
    date: "6/19/2024",
    time_in: "07-30",
    time_out: "16-30",
    location: "HO",
    status: "Present",
    total_hours: "8Hrs",
  },
  {
    id: 3,
    date: "6/19/2024",
    time_in: "07-30",
    time_out: "16-30",
    location: "HO",
    status: "Present",
    total_hours: "8Hrs",
  },
];
function TasksListScreen({ navigation }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (task) => {
    setTasks(tasks.filter((t) => t.id !== task.id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.map}>
        <CameraNavigator />
      </View>
      <View style={styles.list}>
        <AppText style={styles.title}>My Attendace Log</AppText>
        <FlatList
          data={tasks}
          keyExtractor={(task) => task.id.toString()}
          renderItem={({ item }) => (
            <TaskListItem
              date={item.date}
              time_in={item.time_in}
              time_out={item.time_out}
              location={item.location}
              status={item.status}
              total_hours={item.total_hours}
              onPress={() => navigation.navigate("TaskForm", item)}
              renderRightActions={() => (
                <ListItemDeleteAction onPress={() => handleDelete(item)} />
              )}
            />
          )}
          /* ItemSeparatorComponent={ListItemSeparator} */
          refreshing={refreshing}
          onRefresh={() => {
            setTasks([
              {
                id: 4,
                date: "6/19/2024",
                time_in: "07-30",
                time_out: "16-30",
                location: "HO",
                status: "Present",
                total_hours: "8Hrs",
              },
              {
                id: 5,
                date: "6/19/2024",
                time_in: "07-30",
                time_out: "16-30",
                location: "HO Dqum Office 2",
                status: "Present",
                total_hours: "8Hrs",
              },
              {
                id: 6,
                title: "Absent",
                date: "6/19/2024",
                time_in: "07-30",
                time_out: "16-30",
                location: "HO",
                status: "Present",
                total_hours: "8Hrs",
              },
              {
                id: 7,
                date: "6/19/2024",
                time_in: "07-30",
                time_out: "16-30",
                location: "HO",
                status: "Present",
                total_hours: "8Hrs",
              },
              {
                id: 8,
                date: "6/19/2024",
                time_in: "07-30",
                time_out: "16-30",
                location: "HO",
                status: "Present",
                total_hours: "8Hrs",
              },
            ]);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: { flex: 1 },

  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 5,
  },

  list: {
    flex: 2,
    backgroundColor: colors.lightGrey,
  },
});

export default TasksListScreen;
