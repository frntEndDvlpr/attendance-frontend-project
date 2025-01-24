import React, { useEffect, useState } from "react";
import { FlatList, Alert } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import TaskListItem from "../components/TaskListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import AddTaskButton from "../components/AddTaskButton";
import employeesApi from "../api/employees";
import colors from "../config/colors";
import HeaderAlert from "../components/HeaderAlert";
import UploadScreen from "./UploadScreen";

function EmployeesListScreen({ navigation }) {
  const [employees, setEmployees] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState(false);

  // Get employees list from the server
  const loadEmployees = async () => {
    setLoading(true); // Start loading
    const response = await employeesApi.getEmployees(); // Get employees
    setLoading(false); // Stop loading

    if (!response.ok) {
      setError(true);
      console.log(response.problem);
      setResponse(response.problem);
    } else {
      setError(false);
      setEmployees(response.data);
      console.log("Success:", response.data);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // Delete an employee
  const handleDelete = async (employee) => {
    setProgress(0);
    setUploadVisible(true);
    const response = await employeesApi.deleteEmployee(
      employee.id,
      (progress) => setProgress(progress)
    );
    setUploadVisible(false);

    if (!response.ok) {
      setUploadVisible(false);
      return Alert.alert("Fail", "Faiel to delet the employee", [
        { text: "Retry", onPress: () => handleDelete(employee) },
        { text: "Cancel", style: "cancel" },
      ]);
    }

    setProgress(1);
    setUploadVisible(false);
    setEmployees(employees.filter((e) => e.id !== employee.id));
    employees.filter;
  };

  // Confirm before deleting an employee
  const confirmDelete = (employee) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this employee?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => handleDelete(employee),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      {/* Display loading spinner while data is being fetched from the server */}
      {loading && <ActivityIndicator visible={true} />}

      {/* Display error message if data could not be fetched from the server */}
      {error && !loading && (
        <HeaderAlert
          error={
            "NETWORK ERROR: Couldn't retrieve or update the employees list."
          }
          backgroundColor={colors.danger}
          textStyle={{ color: colors.white }}
          iconName={"alert-circle-outline"}
          iconSize={70}
          iconColor={colors.white}
        />
      )}

      {/* Display "No employees found!" message if there are no employees */}
      {!loading && !error && employees.length === 0 && (
        <HeaderAlert
          error="No employees! Click on the + button to add a new employee."
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

      {/* Display the list of employees */}
      <FlatList
        data={employees}
        keyExtractor={(employee) => employee.id.toString()}
        renderItem={({ item }) => (
          <TaskListItem
            employeeCode={item.employeeCode}
            name={item.name}
            department={item.department}
            designation={item.department}
            email={item.department}
            Phone={item.department}
            onPress={() =>
              navigation.navigate("EmployeeForm", {
                employee: item,
                onGoBack: loadEmployees,
              })
            }
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => confirmDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          loadEmployees();
        }}
      />
      <AddTaskButton
        onPress={() =>
          navigation.navigate("EmployeeForm", { onGoBack: loadEmployees })
        }
      />
    </>
  );
}

export default EmployeesListScreen;
