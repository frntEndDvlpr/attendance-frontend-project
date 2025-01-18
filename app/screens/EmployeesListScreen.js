import React, { useEffect, useState } from "react";
import { FlatList, ActivityIndicator } from "react-native";

import TaskListItem from "../components/TaskListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import AddTaskButton from "../components/AddTaskButton";
import employeesApi from "../api/employees";
import AppText from "../components/AppText";

function EmployeesListScreen({ navigation }) {
  const [employees, setEmployees] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadEmployees = async () => {
    setLoading(true);
    const response = await employeesApi.getEmployees();
    setLoading(false);

    if (!response.ok) {
      setError(true);
      console.log(response.problem);
    } else {
      setError(false);
      setEmployees(response.data);
      console.log("Success:", response.data);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleDelete = (employee) => {
    const response = employeesApi.deleteEmployee(employee.id);
    if (!response.ok) {
      console.log(response.problem);
      return;
    }
    setEmployees(employees.filter((e) => e.id !== employee.id));
  };

  return (
    <>
      {error && (
        <>
          <AppText>Could not fetch data!</AppText>
        </>
      )}
      {loading && <ActivityIndicator visible={true} size={"large"} />}
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
            onPress={() => console.log("Employee Selected", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
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
