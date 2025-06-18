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

// Function to log in a user by sending username and password to the server API
const login = (username, password) =>
  apiClient.post("token/", { username, password });

// Function to refresh the token using the refresh token
const refreshToken = (refresh) => 
  apiClient.post("/token/refresh/", { refresh });

// Deleting a user from the server API
const deleteUser = (id) => apiClient.delete(endPoint + id + "/");

export default { login, adduser, getUsers, deleteUser, refreshToken };
