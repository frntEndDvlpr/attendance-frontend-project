import React, { useState } from "react";
import { FlatList } from "react-native";

import ListItemSeparator from "../components/ListItemSeparator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import AddTaskButton from "../components/AddTaskButton";
import ProjectListItem from "../components/ProjectListItem";

const initialProjects = [
  {
    id: 1,
    title: "Project 1",
    description: "description",
    start_date: "1/1/2024",
    end_date: "1/1/2024",
    client: "client 1",
    location: "location 3",
  },
  {
    id: 2,
    title: "Project 2",
    description: "description",
    start_date: "1/1/2024",
    end_date: "1/1/2024",
    client: "client 2",
    location: "location 3",
  },
  {
    id: 3,
    title: "Project 3",
    description: "description",
    start_date: "1/1/2024",
    end_date: "1/1/2024",
    client: "client 3",
    location: "location 3",
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
          <ProjectListItem
            title={item.title}
            description={item.description}
            start_date={item.start_date}
            end_date={item.end_date}
            client={item.client}
            location={item.location}
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
              start_date: "1/1/2024",
              end_date: "1/1/2024",
              client: "client 2",
              location: "location 2",
            },
          ]);
        }}
      />
      <AddTaskButton onPress={() => navigation.navigate("ProjectForm")} />
    </>
  );
}

export default ProjecstListScreen;
