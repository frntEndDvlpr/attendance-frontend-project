import apiClient from "./client";

const endPoint = "employees/";

const getEmployees = () => apiClient.get(endPoint);

const addEmployee = (employee) => {
  const data = new FormData();
  data.append("name", employee.name);
  data.append("employeeCode", employee.employee_code);
  data.append("department", employee.department);
  data.append("designation", employee.designation);
  data.append("email", employee.email);
  data.append("phone", employee.phone);
  data.append("location", employee.location);

  console.log("Sending data to server:", data);

  return apiClient.post(endPoint, data);
};

export default { getEmployees, addEmployee };
