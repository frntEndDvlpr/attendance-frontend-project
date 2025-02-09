import React, { useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  View,
  FlatList,
  StatusBar,
  Button,
} from "react-native";

import TaskListItem from "../components/TaskListItem";
import colors from "../config/colors";
import TaskListIcon from "../components/TaskListIcon";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";
import AppScreen from "../components/AppScreen";
import ProfileCard from "../components/ProfileCard";
import AppListItem from "../components/AppListItem";
import AppIcon from "../components/AppIcon";
import AccountListItem from "../components/AccountListItem";
import ListItemSeparator from "../components/ListItemSeparator";

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
  const { user, setUser } = useContext(AuthContext);

  const handelLogout = () => {
    setUser(null);
    authStorage.removeTokem();
  };

  return (
    <View style={styles.container}>
      <ProfileCard
        name="Abbas Muhammad"
        position="Software Engineer"
        email="abbassalama2@gmail.com"
        image={require("../assets/Mr.Bean2.jpg")}
      />
      <View style={styles.list}>
        <AccountListItem
          title="My Attendance Logs"
          iconName="format-list-bulleted"
          backgroundColor={colors.primary}
          onPress={() => console.log()}
        />
        <ListItemSeparator />
        <AccountListItem
          title="My Requests"
          iconName="file-document-edit-outline"
          backgroundColor={colors.secondary}
          onPress={() => console.log()}
        />
        <ListItemSeparator />
        <AccountListItem
          title="My Leaves"
          iconName="airplane-clock"
          backgroundColor={colors.blue}
          onPress={() => console.log()}
        />
      </View>
      <AccountListItem
        title="Log Out"
        iconName="logout"
        backgroundColor={colors.danger}
        onPress={handelLogout}
      />

      {/* <Button title="Logout" onPress={handelLogout} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGrey,
  },
  list: {
    marginTop: 50,
    borderRadius: 100,
    paddingBottom: 70,
  },
});

export default AccountScreen;
