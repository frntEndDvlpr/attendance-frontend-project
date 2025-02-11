import apiClient from "./client";

const getUsers = () => apiClient.get("auth/users/");

const login = (username, password) =>
  apiClient.post("token/", { username, password });

// Deleting a user from the server API
const deleteUser = (id) => apiClient.delete(endPoint + id + "/");

export default { login, getUsers, deleteUser };
