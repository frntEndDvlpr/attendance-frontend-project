import apiClient from "./client";

const getUsers = () => apiClient.get("auth/users/");

const login = (username, password) =>
  apiClient.post("token/", { username, password });

export default { login, getUsers };
