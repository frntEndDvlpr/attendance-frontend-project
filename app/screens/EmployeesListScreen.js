import React, { useEffect, useState } from "react";
import { FlatList, Alert, View, StyleSheet } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import TaskListItem from "../components/TaskListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import AddTaskButton from "../components/AddTaskButton";
import employeesApi from "../api/employees";
import AppText from "../components/AppText";
import colors from "../config/colors";
import AppIcon from "../components/AppIcon";

function EmployeesListScreen({ navigation }) {
  const [employees, setEmployees] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleteloading, setDeleteLoading] = useState(false);
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
    setDeleteLoading(true);
    const response = await employeesApi.deleteEmployee(employee.id);
    setDeleteLoading(false);
    if (!response.ok) {
      console.log(response.problem);
      return;
    }
    setEmployees(employees.filter((e) => e.id !== employee.id));
    //console.log("Employee deleted successfully:", employee);
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
          text: "OK",
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
      {deleteloading && <ActivityIndicator visible={true} />}
      {/* Display error message if data could not be fetched from the server */}

      {error && !loading && response && (
        <View style={styles.bar}>
          <AppIcon name="exclamation" size={70} backgroundColor={false} />
          <AppText>
            {response}. Couldn't retrieve or update the employees list.
          </AppText>
        </View>
      )}

      {/* Display "No employees found!" message if there are no employees */}
      {!loading && !error && employees.length === 0 && (
        <AppText style={{ margin: 10 }}>
          No employees! Click on the + button to add a new employee.
        </AppText>
      )}
      <FlatList
        data={employees}
        keyExtractor={(employee) => employee.id.toString()}
        renderItem={({ item }) => (
          <TaskListItem
            employeeCode={item.employeeCode}
            name={item.name}
            department={item.department}
            designation={item.department}
            employee_code={item.employee_code}
            email={item.department}
            Phone={item.department}
            created_on={item.created_on}
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

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.danger,
  },
});

export default EmployeesListScreen;
