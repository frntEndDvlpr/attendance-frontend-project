import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import TaskListItem from "../components/TaskListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import AddTaskButton from "../navigation/AddTaskButton";
import GetCheckLocation from "../screens/GetCheckLocation";
import AppText from "../components/AppText";

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
    title: "Task 10",
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

  return (
    <>
      <View style={styles.container}>
        <View style={styles.map}>
          <GetCheckLocation />
        </View>
        <AppText style={styles.title}>My Attendace Log</AppText>
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
              anies={item.anies}
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
                title: "Present",
                date: "6/19/2024",
                assignee: "HO",
                project: "07:30:30",
                customer: "14:30:50",
                anies: "09:00 Hrs",
              },
              {
                id: 2,
                title: "Absent",
                date: "6/19/2024",
                assignee: "Branch",
                project: "07:30:30",
                customer: "14:30:50",
                anies: "10:08 Hrs",
              },
              {
                id: 2,
                title: "Absent",
                date: "6/19/2024",
                assignee: "Branch",
                project: "07:30:30",
                customer: "14:30:50",
                anies: "08:50 Hrs",
              },
              {
                id: 2,
                title: "Present",
                date: "6/19/2024",
                assignee: "HO",
                project: "07:30:30",
                customer: "14:30:50",
                anies: "09:00 Hrs",
              },
              {
                id: 2,
                title: "Absent",
                date: "6/19/2024",
                assignee: "Branch",
                project: "07:30:30",
                customer: "14:30:50",
                anies: "08:50 Hrs",
              },
              {
                id: 2,
                title: "Present",
                date: "6/19/2024",
                assignee: "HO",
                project: "07:30:30",
                customer: "14:30:50",
                anies: "09:00 Hrs",
              },
            ]);
          }}
        />
        <AddTaskButton
          style={styles.camreabtn}
          onPress={() => navigation.navigate("OpenCamera")}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: { height: 250 },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  camreabtn: { margin: 0 },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 10,
  },
});

export default TasksListScreen;
