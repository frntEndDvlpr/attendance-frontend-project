import apiClient from "./client";

const endPoint = "employees/";

// Getting employees from the server API
const getEmployees = () => apiClient.get(endPoint);

// Adding an employee to the server API
const addEmployee = (employee, onUploadProgress) => {
  const data = new FormData();
  data.append("name", employee.name);
  data.append("employeeCode", employee.employeeCode);
  data.append("email", employee.email);
  data.append("phone", employee.phone);
  data.append("designation", employee.designation);
  data.append("department", employee.department);

  //console.log("Sending data to server:", data);

  return apiClient.post(endPoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

// Updating an employee in the server API
const updateEmployee = (id, employee) => {
  const data = new FormData();
  data.append("name", employee.name);
  data.append("employeeCode", employee.employeeCode);
  data.append("email", employee.email);
  data.append("phone", employee.phone);
  data.append("designation", employee.designation);
  data.append("department", employee.department);

  //console.log("Updating data to server:", data);

  return apiClient.put(endPoint + id + "/", data);
};

// Deleting an employee from the server API
const deleteEmployee = (id) => apiClient.delete(endPoint + id + "/");

export default { getEmployees, addEmployee, updateEmployee, deleteEmployee };
