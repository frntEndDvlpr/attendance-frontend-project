import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://192.168.100.33:8000/api/",
});

export default apiClient;
