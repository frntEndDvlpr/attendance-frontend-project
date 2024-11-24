import React, { useState } from "react";
import { FlatList } from "react-native";

import TaskListItem from "../components/TaskListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import AddTaskButton from "../navigation/AddTaskButton";

const initialProjects = [
  {
    id: 1,
    title: "Project 1",
    description: "description",
    starts: "1/1/2024",
    ends: "1/1/2024",
    client: "client 1",
  },
  {
    id: 2,
    title: "Project 2",
    description: "description",
    starts: "1/1/2024",
    ends: "1/1/2024",
    client: "client 2",
  },
  {
    id: 3,
    title: "Project 3",
    description: "description",
    starts: "1/1/2024",
    ends: "1/1/2024",
    client: "client 3",
  },
];
function ProjecstListScreen({ navigation }) {
  const [projects, setprojects] = useState(initialProjects);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (project) => {
    setprojects(projects.filter((t) => t.id !== project.id));
  };

  return (
    <>
      <FlatList
        data={initialProjects}
        keyExtractor={(project) => project.id.toString()}
        renderItem={({ item }) => (
          <TaskListItem
            title={item.title}
            description={item.description}
            starts={item.starts}
            ends={item.ends}
            client={item.client}
            onPress={() => console.log("Project Selected", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setprojects([
            {
              id: 2,
              title: "Project 2",
              description: "description",
              starts: "1/1/2024",
              ends: "1/1/2024",
              client: "client 2",
            },
          ]);
        }}
      />
      <AddTaskButton onPress={() => navigation.navigate("ProjectForm")} />
    </>
  );
}

export default ProjecstListScreen;
