import apiClient from "./client";

const endPoint = "api/employees/";

// Getting employees from the server API
const getEmployees = () => apiClient.get(endPoint);
const getEmployeesProfile = () => apiClient.get(endPoint + "me/");
const getEmployeeById = (userId) => apiClient.get(`${endPoint}/${userId}`);

// Adding an employee to the server API
const addEmployee = (employee, onUploadProgress) => {
  const data = new FormData();
  data.append("name", employee.name);
  data.append("employeeCode", employee.employeeCode);
  data.append("email", employee.email);
  data.append("phone", employee.phone);
  data.append("designation", employee.designation);
  data.append("department", employee.department);
  data.append("projects", employee.projects);

  //console.log("Sending data to server:", data);

  return apiClient.post(endPoint, data, {
    onUploadProgress: (event) => {
      const progress = event.loaded / event.total;
      onUploadProgress(progress);
    },
  });
};

// Updating an employee in the server API
const updateEmployee = async (id, employee, onUploadProgress) => {
  try {
    const data = new FormData();
    data.append("name", employee.name);
    data.append("employeeCode", employee.employeeCode);
    data.append("email", employee.email);
    data.append("phone", employee.phone);
    data.append("designation", employee.designation);
    data.append("department", employee.department);

    // Append each project ID individually
    employee.projects.forEach((projectId) => {
      data.append("projects", projectId);
    });

    if (employee.photo) {
      const photoUri = employee.photo;
      const photoName = photoUri.split("/").pop();
      const photoType = `image/${photoName.split(".").pop()}`;
      data.append("photo", {
        uri: photoUri,
        name: photoName,
        type: photoType,
      });
    }

    const response = await apiClient.put(`${endPoint}${id}/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (event) => {
        const progress = event.loaded / event.total;
        onUploadProgress(progress);
      },
    });

    console.log("Update employee response:", response);
    return response;
  } catch (error) {
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    } else if (error.request) {
      console.error("Error request data:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    console.error("Error config:", error.config);
    throw error;
  }
};

// Deleting an employee from the server API
const deleteEmployee = (id) => apiClient.delete(endPoint + id + "/");

export default {
  getEmployees,
  getEmployeeById,
  getEmployeesProfile,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
