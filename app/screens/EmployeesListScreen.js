import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";

import TaskListItem from "../components/TaskListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import AddTaskButton from "../navigation/AddTaskButton";
import employeesApi from "../api/employees";

function EmployeesListScreen({ navigation }) {
  const [employees, setEmployees] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadEmployees;
  }, []);

  const loadEmployees = async () => {
    const response = await employeesApi.getEmployees();
    setEmployees(response.data);
  };

  const handleDelete = (employee) => {
    setEmployees(employees.filter((e) => e.id !== employee.id));
  };

  return (
    <>
      <FlatList
        data={employees}
        keyExtractor={(employee) => employee.id.toString()}
        renderItem={({ item }) => (
          <TaskListItem
            employeeCode={item.employeeCode}
            title={item.title}
            department={item.department}
            designation={item.department}
            email={item.department}
            Phone={item.department}
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
              title: "Company 2",
              contactPerson: "Person 2",
              contactPhone: "6568646",
            },
          ]);
        }}
      />
      <AddTaskButton onPress={() => navigation.navigate("EmployeeForm")} />
    </>
  );
}

export default EmployeesListScreen;
