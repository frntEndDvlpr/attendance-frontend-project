import apiClient from "./client";

const endPoint = "/api/attendance-logs/";

// Helper function to validate and format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    console.error("Invalid date string:", dateString);
    throw new RangeError("Date value out of bounds");
  }
  return date.toISOString();
};

// Getting employees from the server API
const getAttendanceLogs = () => apiClient.get(endPoint);

// Adding an attendance to the server API
const addAttendanceLogs = (attendance, onUploadProgress) => {
  const data = new FormData();
  data.append("employee_id", attendance.employee_id);
  data.append("att_date_time", formatDate(attendance.att_date_time));
  data.append("location", JSON.stringify(attendance.location));
  data.append("selfie", {
    uri: attendance.selfie.uri,
    type: attendance.selfie.type,
    name: attendance.selfie.name,
  });

  //console.log("Sending attendance data to server:", data); // Debugging log

  return apiClient.post(endPoint, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
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
  data.append("att_date_time", formatDate(attendanceData.att_date_time)); // Format the date correctly
  data.append("location", JSON.stringify(attendanceData.location)); // Ensure location is a valid JSON object
  data.append("selfie", {
    uri: attendanceData.selfie.uri,
    type: attendanceData.selfie.type,
    name: attendanceData.selfie.name,
  });

  return apiClient.put(`${endPoint}${id}/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
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
