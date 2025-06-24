import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import * as Yup from 'yup';

import AppTimePicker from '../components/AppTimePicker';
import { AppForm, AppFormField, SubmitButton } from '../components/forms';
import AppDateTimePicker from '../components/AppDateTimePicker';
import correctionRequestApi from '../api/CorrectionRequest';
import employeeApi from '../api/employees';

const validationSchema = Yup.object().shape({
  employee: Yup.number().required().label("Employee ID"),
  reason: Yup.string().required().label("Reason for Correction"),
  punch_type: Yup.string().required().label("Punch Type"),
  date: Yup.date().required().label("Date"),
  corrected_time: Yup.string().required().label("Corrected Time"),
});

function CorrectionRequestFormScreen({ navigation, route }) {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [employee, setEmployee] = useState(null);
  const correctionId = route?.params?.id;

  useEffect(() => {
    const loadProfile = async () => {
      const response = await employeeApi.getEmployeesProfile();
      if (response.ok) {
        setEmployee(response.data.id); // ✅ fixed early access to undefined state
      } else {
        console.error("Failed to load employee profile", response.problem);
      }
    };
    loadProfile();
  }, []);

  const handleSubmit = async (requestData) => {
    setProgress(0);
    setUploadVisible(true);

    let result;
    if (correctionId) {
      result = await correctionRequestApi.updateCorrectionRequest(
        correctionId,
        requestData,
        (progress) => setProgress(progress)
      );
    } else {
      result = await correctionRequestApi.addCorrectionRequest(
        requestData,
        (progress) => setProgress(progress)
      );
    }

    if (!result.ok) {
      console.log(result.problem);
      console.log("Data sent",result.data);
      setUploadVisible(false);
      return alert("Could not submit the correction request!");
    }

    setProgress(1);
    if (route.params?.onGoBack) route.params.onGoBack();
    setTimeout(() => {
      setUploadVisible(false);
      navigation.goBack();
    }, 2000);
  };

  // ✅ Don't show form until employee is loaded to avoid validation errors
  if (employee === null) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <AppForm
          initialValues={{
            employee: employee,
            reason: '',
            punch_type: '',
            date: '',
            corrected_time: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppFormField
            name="reason"
            placeholder="Reason for Correction"
            maxLength={500}
            icon="note-text"
            multiline
            numberOfLines={3}
          />
          <AppFormField
            name="punch_type"
            placeholder="Punch Type (IN/OUT)"
            maxLength={3}
            icon="clock"
          />
          <AppDateTimePicker
            name="date"
            placeholder="Date"
            mode="date"
            icon="calendar-today"
          />
          <AppTimePicker
            name="corrected_time"
            placeholder="Corrected Time (HH:MM)"
            icon="clock-time-four"
          />
          <SubmitButton title="Submit Correction" />
        </AppForm>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CorrectionRequestFormScreen;
