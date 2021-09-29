import React, { useState } from "react";
import API from "../API.js";

const initialValues = {
  title: "",
  abstract: "",
  body: "",
};
export const useForm = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleReset = () => {
    setErrors({});
    setValues(initialValues);
  }

  const validate = () => {
    let temp = {};
    temp.title = values.title ? "" : "Please enter a title";
    temp.abstract = values.abstract ? "" : "Please enter a valid abstract";
    temp.body = values.body ? "" : "Please enter a valid body";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const submit = () => {
    if (validate()) {
      console.log("submitting...");
      API.submitArticle(values);
    }
  }

  return { values, setValues, errors, setErrors, handleChange, handleReset, validate, submit };
};
