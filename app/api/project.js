import apiClient from "./client";

const endPoint = "projects/";

// Getting projects from the server API
const getProjects = () => apiClient.get(endPoint);

// Adding an employee to the server API
const addProject = (project, onUploadProgress) => {
  const data = new FormData();
  data.append("title", project.title);
  data.append("description", project.description);
  data.append("start_date", project.start_date);
  data.append("end_date", project.end_date);
  data.append("client", project.client);
  data.append("employees", project.employees);
  data.append("location", project.location);

  return apiClient.post(endPoint, data, {
    onUploadProgress: (event) => {
      const progress = event.loaded / event.total;
      onUploadProgress(progress);
    },
  });
};

// Updating an project in the server API
const updateProject = (id, project, onUploadProgress) => {
  const data = new FormData();
  data.append("title", project.title);
  data.append("description", project.description);
  data.append("start_date", project.start_date);
  data.append("end_date", project.end_date);
  data.append("client", project.client);
  data.append("employees", project.employees);
  data.append("location", project.location);

  //console.log("Updating data to server:", data);

  return apiClient.put(`${endPoint}${id}/`, data, {
    onUploadProgress: (event) => {
      const progress = event.loaded / event.total;
      onUploadProgress(progress);
    },
  });
};

// Deleting a project from the server API
const deleteProject = (id) => apiClient.delete(endPoint + id + "/");

export default { getProjects, addProject, updateProject, deleteProject };
