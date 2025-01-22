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
    onUploadProgress: (event) => {
      const progress = event.loaded / event.total;
      onUploadProgress(progress);
    },
  });
};

// Updating an employee in the server API
const updateEmployee = (id, employee, onUploadProgress) => {
  const data = new FormData();
  data.append("name", employee.name);
  data.append("employeeCode", employee.employeeCode);
  data.append("email", employee.email);
  data.append("phone", employee.phone);
  data.append("designation", employee.designation);
  data.append("department", employee.department);

  //console.log("Updating data to server:", data);

  return apiClient.put(`${endPoint}${id}/`, data, {
    onUploadProgress: (event) => {
      const progress = event.loaded / event.total;
      onUploadProgress(progress);
    },
  });
};

// Deleting an employee from the server API
const deleteEmployee = (id) => apiClient.delete(endPoint + id + "/");

export default { getEmployees, addEmployee, updateEmployee, deleteEmployee };
