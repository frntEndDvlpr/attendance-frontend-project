import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://192.168.0.159:800/api",
});

export default apiClient;
