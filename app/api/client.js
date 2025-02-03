import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://192.168.17.113:8000/api/",
  timeout: 10000,
});

export default apiClient;
