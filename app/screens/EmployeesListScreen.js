import React, { useState } from "react";
import { FlatList } from "react-native";

import TaskListItem from "../components/TaskListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import AddTaskButton from "../navigation/AddTaskButton";

const initialEmployees = [
  {
    id: 1,
    employeeCode: "Company 1",
    title: "Person 1",
    department: "Department 1",
    designation: "Designation 1",
    email: "admin@domain.com",
    Phone: "6568646",
  },
  {
    id: 2,
    employeeCode: "Company 2",
    title: "Person 2",
    department: "Department 2",
    designation: "Designation 2",
    email: "admin@domain.com",
    Phone: "6568646",
  },
  {
    id: 3,
    employeeCode: "Company 1",
    title: "Person 3",
    department: "Department 3",
    designation: "Designation 3",
    email: "admin@domain.com",
    Phone: "6568646",
  },
];
function EmployeesListScreen({ navigation }) {
  const [employees, setEmployees] = useState(initialEmployees);
  const [refreshing, setRefreshing] = useState(false);

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
