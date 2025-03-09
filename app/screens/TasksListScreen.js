import React, { useEffect, useState, useCallback } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import EXIF from "exif-js";

import TaskListItem from "../components/TaskListItem";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import AppText from "../components/AppText";
import colors from "../config/colors";
import CameraNavigator from "../navigation/CameraNavigator";
import employeesApi from "../api/employees";
import useLocation from "../hooks/useLocation";
import AppIcon from "../components/AppIcon";
import attendanceApi from "../api/attendance";
import UploadScreen from "./UploadScreen";

const initialTasks = [
  {
    id: 1,
    date: "6/19/2024",
    time_in: "07-30",
    time_out: "16-30",
    location: "HO",
    status: "Present",
    total_hours: "8Hrs",
  },
  {
    id: 2,
    date: "6/19/2024",
    time_in: "07-30",
    time_out: "16-30",
    location: "HO",
    status: "Present",
    total_hours: "8Hrs",
  },
  {
    id: 3,
    date: "6/19/2024",
    time_in: "07-30",
    time_out: "16-30",
    location: "HO",
    status: "Present",
    total_hours: "8Hrs",
  },
];

function TasksListScreen({ navigation }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState();
  const [projectLocations, setProjectLocations] = useState([]);
  const [attendanceRange, setAttendanceRange] = useState([]);
  const [isAtProjectLocation, setIsAtProjectLocation] = useState(false);
  const [currentProjectTitle, setCurrentProjectTitle] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [photo, setphoto] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [photoDateTime, setPhotoDateTime] = useState(null);
  const currentLocation = useLocation();

  // Load the user's profile data
  const loadMyProfile = async () => {
    const response = await employeesApi.getEmployeesProfile();
    if (response.ok) {
      setUser(response.data);
      //console.log("user's profile", response.data);
      //console.log("User's Profile:", response.data);
    } else {
      alert("Error getting profile data.");
      console.log(response.problem);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadMyProfile();
    }, [])
  );

  // Extract the project locations and attendance ranges from the user's profile
  useEffect(() => {
    if (user) {
      //console.log("User's Projects:", user.projects);
      const projectsLocation = user.projects.map((project) => project.location);
      setProjectLocations(projectsLocation);
      //console.log("Project Locations:", projectsLocation);
      const attendanceRange = user.projects.map((project) => project.range);
      setAttendanceRange(attendanceRange);
      const employeeId = user.id;
      setEmployeeId(employeeId);
      //console.log("Employee ID:", employeeId);
      //console.log("Attendance Range:", attendanceRange);
    }
  }, [user]);

  const handleDelete = (task) => {
    setTasks(tasks.filter((t) => t.id !== task.id));
  };

  // Haversine formula to calculate the distance between two geographical points
  const haversineDistance = (coords1, coords2) => {
    const toRad = (x) => (x * Math.PI) / 180;

    const lat1 = coords1.latitude;
    const lon1 = coords1.longitude;
    const lat2 = coords2.latitude;
    const lon2 = coords2.longitude;

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000; // Distance in meters

    return distance;
  };

  // Function to check if the current location is within range of any project location
  const checkIfWithinRange = (
    currentLocation,
    projectLocations,
    attendanceRanges
  ) => {
    for (let i = 0; i < projectLocations.length; i++) {
      const projectLocation = projectLocations[i];
      const range = attendanceRanges[i]; // Range is already in meters

      const distance = haversineDistance(currentLocation, projectLocation);
      if (distance <= range) {
        return user.projects[i].title; // Return the project title if within range
      }
    }
    return null;
  };

  // Check if the current location is within range of any project location
  useEffect(() => {
    if (currentLocation) {
      //console.log("Current Location:", currentLocation);
      const projectTitle = checkIfWithinRange(
        currentLocation,
        projectLocations,
        attendanceRange
      );
      setIsAtProjectLocation(!!projectTitle);
      setCurrentProjectTitle(projectTitle || "");
      //console.log("Is at Project Location:", !!projectTitle);
    }
  }, [currentLocation, projectLocations, attendanceRange]);

  const TakePhoto = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        quality: 0.1,
        exif: true,
        cameraType: "front",
      });

      console.log("Camera result:", result);

      if (!result.canceled) {
        const photoUri = result.assets[0].uri;
        setphoto(photoUri);
        console.log("Photo URI:", photoUri);

        // Extract EXIF data directly from the result object
        const exifData = result.assets[0].exif;
        const dateTime = exifData.DateTimeOriginal || exifData.DateTime;
        setPhotoDateTime(dateTime);
        console.log("Captured Date and Time:", dateTime);

        // Call handleSubmit after setting the photo and dateTime
        handleSubmit(photoUri);
      }
    } catch (error) {
      console.error("Error loading the image: ", error);
    }
  };

  const handleSubmit = async (photoUri) => {
    setProgress(0);
    setUploadVisible(true);
    setRefreshing(true);
    const attendanceData = {
      employee_id: employeeId,
      att_date_time: new Date(photoDateTime).toISOString(),
      location: JSON.stringify(currentLocation),
      selfie: {
        uri: photoUri,
        type: "image/jpeg",
        name: "selfie.jpg",
      },
    };
    console.log("Attendance Data:", attendanceData);

    try {
      const response = await attendanceApi.addAttendanceLogs(attendanceData);
      (progress) => setProgress(progress);
      if (!response.ok) {
        console.log("Error saving attendance data:", response.problem);
        console.log("Error saving attendance data:", response.data);
        setUploadVisible(false);
      } else {
        setProgress(1);
        setTimeout(() => {
          setUploadVisible(false);
          setRefreshing(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error saving attendance data:", error);
      setRefreshing(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.map}>
        <CameraNavigator />
      </View>
      <View style={styles.locationCameraBtn}>
        <View
          style={[
            styles.coordinates,
            {
              backgroundColor: isAtProjectLocation
                ? "rgba(104, 214, 104, 0.5)"
                : "rgba(255, 0, 0, 0.5)", // Change this to the desired color when outside geofence
            },
          ]}
        >
          <AppIcon
            name="crosshairs-gps"
            size={40}
            backgroundColor="false"
            iconColor={colors.black}
          />
          <AppText style={styles.coordText}>
            {isAtProjectLocation
              ? `Within ${currentProjectTitle} geofence`
              : "Outside of the geofence"}
          </AppText>
        </View>
        {isAtProjectLocation && (
          <TouchableOpacity
            onPress={() => {
              /* navigation.navigate("Camera", {
                location: currentLocation,
                employee_id: employeeId,
              }); */
              TakePhoto();
            }}
          >
            <View style={styles.CamreaBtn}>
              <AppText style={styles.CamreaBtnText}>Time in</AppText>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.list}>
        <AppText style={styles.title}>My Attendace Log</AppText>

        <UploadScreen
          onDone={() => setUploadVisible(false)}
          progress={progress}
          visible={uploadVisible}
        />

        <FlatList
          data={tasks}
          keyExtractor={(task) => task.id.toString()}
          renderItem={({ item }) => (
            <TaskListItem
              date={item.date}
              time_in={item.time_in}
              time_out={item.time_out}
              location={item.location}
              status={item.status}
              total_hours={item.total_hours}
              onPress={() => console.log("Task selected", item)}
              renderRightActions={() => (
                <ListItemDeleteAction onPress={() => handleDelete(item)} />
              )}
            />
          )}
          /* ItemSeparatorComponent={ListItemSeparator} */
          refreshing={refreshing}
          onRefresh={() => {
            setTasks([
              {
                id: 4,
                date: "6/19/2024",
                time_in: "07-30",
                time_out: "16-30",
                location: "HO",
                status: "Present",
                total_hours: "8Hrs",
              },
              {
                id: 5,
                date: "6/19/2024",
                time_in: "07-30",
                time_out: "16-30",
                location: "HO Dqum Office 2",
                status: "Present",
                total_hours: "8Hrs",
              },
              {
                id: 6,
                title: "Absent",
                date: "6/19/2024",
                time_in: "07-30",
                time_out: "16-30",
                location: "HO",
                status: "Present",
                total_hours: "8Hrs",
              },
              {
                id: 7,
                date: "6/19/2024",
                time_in: "07-30",
                time_out: "16-30",
                location: "HO",
                status: "Present",
                total_hours: "8Hrs",
              },
              {
                id: 8,
                date: "6/19/2024",
                time_in: "07-30",
                time_out: "16-30",
                location: "HO",
                status: "Present",
                total_hours: "8Hrs",
              },
            ]);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: { flex: 1.3 },

  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 5,
  },

  list: {
    flex: 2,
    backgroundColor: colors.lightGrey,
  },
  CamreaBtn: {
    borderRadius: 5,
    width: 90,
    height: 40,
    justifyContent: "center",
    backgroundColor: colors.secondary,
  },
  CamreaBtnText: {
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  coordinates: {
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  coordText: {
    fontWeight: "bold",
    color: colors.black,
    marginRight: 10,
  },
  locationCameraBtn: {
    position: "absolute",
    flexDirection: "row",
    width: "100%",
    top: 45,
    justifyContent: "space-around",
  },
});

export default TasksListScreen;
