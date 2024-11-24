import React, { useState } from "react";
import { FlatList } from "react-native";

import TaskListItem from "../components/TaskListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import AddTaskButton from "../navigation/AddTaskButton";

const initialClients = [
  {
    id: 1,
    title: "Company 1",
    contactPerson: "Person 1",
    contactPhone: "6568646",
  },
  {
    id: 2,
    title: "Company 2",
    contactPerson: "Person 2",
    contactPhone: "6568646",
  },
  {
    id: 3,
    title: "Company 3",
    contactPerson: "Person 3",
    contactPhone: "6568646",
  },
];
function ClientsListScreen({ navigation }) {
  const [clients, setclients] = useState(initialClients);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (client) => {
    setclients(clients.filter((c) => c.id !== client.id));
  };

  return (
    <>
      <FlatList
        data={clients}
        keyExtractor={(client) => client.id.toString()}
        renderItem={({ item }) => (
          <TaskListItem
            title={item.title}
            contactPerson={item.contactPerson}
            contactPhone={item.contactPhone}
            onPress={() => console.log("Project Selected", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setclients([
            {
              id: 2,
              title: "Company 2",
              contactPerson: "Person 2",
              contactPhone: "6568646",
            },
          ]);
        }}
      />
      <AddTaskButton onPress={() => navigation.navigate("ClientForm")} />
    </>
  );
}

export default ClientsListScreen;
