import React, { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";

import authApi from "../api/auth";
import ActivityIndicator from "../components/ActivityIndicator";
import HeaderAlert from "../components/HeaderAlert";
import UploadScreen from "./UploadScreen";
import EmployeeListItem from "../components/EmployeeListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import AppScreen from "../components/AppScreen";
import colors from "../config/colors";
import employeesApi from "../api/employees";

function UserListScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState(false);

  useEffect(() => {
    loadUsers();
    //console.log(users);
  }, []);

  //const sortedUsers = users.sort((a, b) => b.id - a.id);

  // Get users list from the server
  const loadUsers = async () => {
    setLoading(true); // Start loading
    const response = await authApi.getUsers(); // Get users
    setLoading(false); // Stop loading

    if (!response.ok) {
      setError(true);
      console.log(response.problem);
      //console.log(response.data);
      setResponse(response.problem);
    } else {
      setError(false);
      setUsers(response.data);
      //console.log("Success:", response.data);
    }
  };

  const fetchEmployees = async () => {
    const response = await employeesApi.getEmployees();

    if (response.ok) {
      setEmployees(response.data);
      //console.log(response.data);
    } else {
      alert("Could not load employees");
      //console.log(response.data);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Delete a user
  const handleDelete = async (user) => {
    setProgress(0);
    setUploadVisible(true);
    const response = await authApi.deleteUser(user.id, (progress) =>
      setProgress(progress)
    );
    setUploadVisible(false);

    if (!response.ok) {
      setUploadVisible(false);
      return Alert.alert("Fail", "Faiel to delet the employee", [
        { text: "Retry", onPress: () => handleDelete(user) },
        { text: "Cancel", style: "cancel" },
      ]);
    }

    setProgress(1);
    setUploadVisible(false);
    setUsers(user.filter((u) => u.id !== user.id));
    user.filter;
  };

  // Confirm before deleting an employee
  const confirmDelete = (user) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this user?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => handleDelete(user),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <AppScreen>
      {/* Display loading bar while data is being fetched from the server */}
      {loading && <ActivityIndicator visible={true} />}

      {/* Display error message if data could not be fetched from the server */}
      {error && !loading && (
        <HeaderAlert
          error={"NETWORK ERROR: Couldn't retrieve or update the users list."}
          backgroundColor={colors.danger}
          textStyle={{ color: colors.white }}
          iconName={"alert-circle-outline"}
          iconSize={70}
          iconColor={colors.white}
        />
      )}

      {/* Display "No users found!" message if there are no users */}
      {!loading && !error && users.length === 0 && (
        <HeaderAlert
          error="No users! Click on the + button to add a new employee."
          backgroundColor={colors.secondary}
          textStyle={{ color: colors.white }}
          iconName={"file-alert-outline"}
          iconSize={70}
          iconColor={colors.white}
        />
      )}

      {/* Display the upload screen */}
      <UploadScreen
        onDone={() => {
          setUploadVisible(false);
        }}
        progress={progress}
        visible={uploadVisible}
      />

      {/* Display the list of users */}
      <FlatList
        data={users}
        keyExtractor={(user) => user.id.toString()}
        renderItem={({ item }) => (
          <EmployeeListItem
            name={item.username}
            employeeCode={item.id}
            email={item.email}
            phone={item.employee}
            designation={item.designation}
            department={item.department}
            projects={item.projects}
            onPress={() => {navigation.navigate("UserForm", {
              user: item,
              onGoBack: loadUsers,
            })}}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => confirmDelete(item)} />
            )}
          />
        )}
        refreshing={refreshing}
        onRefresh={() => {
          loadUsers();
        }}
        ItemSeparatorComponent={ListItemSeparator}
      />
    </AppScreen>
  );
}

export default UserListScreen;
