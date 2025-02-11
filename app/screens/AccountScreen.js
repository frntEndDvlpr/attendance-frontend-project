import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";

import colors from "../config/colors";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";
import ProfileCard from "../components/ProfileCard";
import AccountListItem from "../components/AccountListItem";
import ListItemSeparator from "../components/ListItemSeparator";

function AccountScreen(props) {
  const { user, setUser } = useContext(AuthContext);

  const handelLogout = () => {
    setUser(null);
    authStorage.removeTokem();
  };

  employees = () => {
    user.employee;
  };

  return (
    <View style={styles.container}>
      <ProfileCard
        entifire={user.user_id}
        name="Abbas Muhammad"
        position="Software Engineer"
        email="abbassalama2@gmail.com"
        image={require("../assets/Mr.Bean2.jpg")}
      />
      <View style={styles.list}>
        <AccountListItem
          title="My Attendance Logs"
          iconName="format-list-bulleted"
          rightIcon="chevron-right"
          backgroundColor={colors.blue}
          onPress={() => console.log()}
        />
        <ListItemSeparator />
        <AccountListItem
          title="My Requests"
          iconName="file-document-edit-outline"
          rightIcon="chevron-right"
          backgroundColor={colors.secondary}
          onPress={() => console.log()}
        />
        <ListItemSeparator />
        <AccountListItem
          title="My Leaves"
          iconName="airplane-clock"
          rightIcon="chevron-right"
          backgroundColor={colors.primary}
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
