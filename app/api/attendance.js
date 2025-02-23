import apiClient from "./client";

const endPoint = "/api/attendance-logs/";

// Getting employees from the server API
const getAttendanceLogs = () => apiClient.get(endPoint);

// Adding an attendance to the server API
const addAttendanceLogs = (attendance, onUploadProgress) => {
  const data = new FormData();
  data.append("employee_id", attendance.employee_id);
  data.append(
    "att_date_time",
    new Date(attendance.att_date_time).toISOString()
  ); // Format the date correctly
  data.append("location", attendance.location);
  data.append("selfie", {
    uri: attendance.selfie.uri,
    type: attendance.selfie.type,
    name: attendance.selfie.name,
  });

  return apiClient.post(endPoint, data, {
    onUploadProgress: (event) => {
      const progress = event.loaded / event.total;
      onUploadProgress(progress);
    },
  });
};

// Updating an attendance in the server API
const updateAttendanceLogs = (id, attendanceData, onUploadProgress) => {
  const data = new FormData();
  data.append("employee_id", attendanceData.employee_id);
  data.append(
    "att_date_time",
    new Date(attendanceData.att_date_time).toISOString()
  ); // Format the date correctly
  data.append("location", attendanceData.location);
  data.append("selfie", {
    uri: attendanceData.selfie.uri,
    type: attendanceData.selfie.type,
    name: attendanceData.selfie.name,
  });

  return apiClient.put(`${endPoint}${id}/`, data, {
    onUploadProgress: (event) => {
      const progress = event.loaded / event.total;
      onUploadProgress(progress);
    },
  });
};

// Deleting an employee from the server API
const deleteAttendanceLog = (id) => apiClient.delete(`${endPoint}${id}/`);

export default {
  getAttendanceLogs,
  addAttendanceLogs,
  updateAttendanceLogs,
  deleteAttendanceLog,
};
