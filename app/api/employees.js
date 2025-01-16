import apiClient from "./client";

const endPoint = "/employees";

const getEmployees = () => apiClient.get(endPoint);

export default { getEmployees };
