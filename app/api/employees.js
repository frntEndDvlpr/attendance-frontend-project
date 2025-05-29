// employees.js
import apiClient from "./client";
const endPoint = "api/employees/";

const getEmployees = () => apiClient.get(endPoint);
const getEmployeesProfile = () => apiClient.get(endPoint + "me/");
const getEmployeeById = (userId) => apiClient.get(`${endPoint}/${userId}`);

const addEmployee = (employee, onUploadProgress) => {
  const data = new FormData();
  Object.entries(employee).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => data.append(key, v));
    } else {
      data.append(key, value);
    }
  });

  if (employee.photo) {
    const photoUri = employee.photo;
    const photoName = photoUri.split("/").pop();
    const photoType = `image/${photoName.split(".").pop()}`;
    data.append("photo", { uri: photoUri, name: photoName, type: photoType });
  }

  return apiClient.post(endPoint, data, {
    onUploadProgress: (event) => onUploadProgress(event.loaded / event.total),
  });
};

const updateEmployee = (id, employee, onUploadProgress) => {
  const data = new FormData();
  Object.entries(employee).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => data.append(key, v));
    } else {
      data.append(key, value);
    }
  });

  if (employee.photo) {
    const photoUri = employee.photo;
    const photoName = photoUri.split("/").pop();
    const photoType = `image/${photoName.split(".").pop()}`;
    data.append("photo", { uri: photoUri, name: photoName, type: photoType });
  }

  return apiClient.put(`${endPoint}${id}/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (event) => onUploadProgress(event.loaded / event.total),
  });
};

const deleteEmployee = (id) => apiClient.delete(endPoint + id + "/");

export default {
  getEmployees,
  getEmployeeById,
  getEmployeesProfile,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
