import apiClient from "./client";

const endPoint = "/api/attendance-logs/";

// Getting employees from the server API
const getAttendanceLogs = () => apiClient.get(endPoint);

// Adding an attendance to the server API
const addAttendanceLogs = (attendance, onUploadProgress) => {
  const data = new FormData();
  data.append("employee_id", attendance.employee_id);
  data.append("att_date_time", attendance.att_date_time);
  data.append("location", attendance.location);
  data.append("photo", attendance.photo);

  //console.log("Sending data to server:", data);

  return apiClient.post(endPoint, data, {
    onUploadProgress: (event) => {
      const progress = event.loaded / event.total;
      onUploadProgress(progress);
    },
  });
};

// Updating an attendance in the server API
const updateAttendanceLogs = (id, attendance, onUploadProgress) => {
  const data = new FormData();
  data.append("employee_id", attendance.employee_id);
  data.append("att_date_time", attendance.att_date_time);
  data.append("location", attendance.location);
  data.append("photo", attendance.photo);

  return apiClient.put(`${endPoint}${id}/`, data, {
    onUploadProgress: (event) => {
      const progress = event.loaded / event.total;
      onUploadProgress(progress);
    },
  });
};

// Deleting an employee from the server API
const deleteAttendanceLog = (id) => apiClient.delete(endPoint + id + "/");

export default {
  getAttendanceLogs,
  addAttendanceLogs,
  updateAttendanceLogs,
  deleteAttendanceLog,
};
