import apiClient from "./client";

const login = (username, password) =>
  apiClient.post("token/", { username, password });

export default { login };
