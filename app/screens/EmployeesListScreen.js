import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";

import TaskListItem from "../components/TaskListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import AddTaskButton from "../navigation/AddTaskButton";
import employeesApi from "../api/employees";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import ActivityIndicator from "../components/ActivityIndicator";

function EmployeesListScreen({ navigation }) {
  const [employees, setEmployees] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadEmployees = async () => {
    setLoading(true);
    const response = await employeesApi.getEmployees(); // Pass the endpoint relative to baseURL
    setLoading(false);

    if (!response.ok) return setError(true);

    setError(false);
    setEmployees(response.data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleDelete = (employee) => {
    setEmployees(employees.filter((e) => e.id !== employee.id));
  };

  return (
    <>
      {error && (
        <>
          <AppText>Could not fetch data</AppText>
          <AppButton title="Retry" onPress={loadEmployees} />
        </>
      )}
      <ActivityIndicator visible={true} />
      {/* <FlatList
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
            onPress={() => console.log("Employee Selected", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setEmployees([
            {
              id: 2,
              name: "Company 2",
              contactPerson: "Person 2",
              contactcreated_on: "6568646",
            },
          ]);
        }}
      /> */}
      <AddTaskButton onPress={() => navigation.navigate("EmployeeForm")} />
    </>
  );
}

export default EmployeesListScreen;
