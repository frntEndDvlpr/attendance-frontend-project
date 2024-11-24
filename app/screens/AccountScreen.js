import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  View,
  FlatList,
  StatusBar,
} from "react-native";

import TaskListItem from "../components/TaskListItem";
import colors from "../config/colors";
import TaskListIcon from "../components/TaskListIcon";

const menuItems = [
  {
    title: "My Tasks",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
  },
  {
    title: "My Emails",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
  },
];

function AccountScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <TaskListItem
        title="Abbas Muhammad"
        customer="abbassalama2@gmail.com"
        image={require("../assets/SOMS-icon.png")}
      />
      <View>
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <TaskListItem
              title={item.title}
              ImageComponent={
                <TaskListIcon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default AccountScreen;
