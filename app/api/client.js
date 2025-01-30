import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://192.168.0.159:8000/api/",
  timeout: 30000,
});

export default apiClient;
