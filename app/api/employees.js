import client from "./client";

const endPoint = "/employees";

const getEmployees = () => client.get(endPoint);

export default { getEmployees };
