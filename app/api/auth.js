import apiClient from "./client";

const endPoint = "auth/users/";

const getUsers = () => apiClient.get(endPoint);

const adduser = (user, onUploadProgress) => {
  const data = new FormData();
  data.append("username", user.name);
  data.append("email", user.email);
  data.append("password", user.password);

  console.log("Sending data to server:", data);

  return apiClient.post(endPoint, data, {
    onUploadProgress: (event) => {
      const progress = event.loaded / event.total;
      onUploadProgress(progress);
    },
  });
};

const login = (username, password) =>
  apiClient.post("token/", { username, password });

// Deleting a user from the server API
const deleteUser = (id) => apiClient.delete(endPoint + id + "/");

export default { login, adduser, getUsers, deleteUser };
