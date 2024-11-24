import React from "react";
import { useFormikContext } from "formik";

import AppErrorMasage from "./AppErrorMasage";
import TaskTextInput from "../TaskTextInput";

function TaskFormField({ name, ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <TaskTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        {...otherProps}
      />
      <AppErrorMasage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default TaskFormField;
