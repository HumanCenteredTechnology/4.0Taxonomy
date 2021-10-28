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
  const [response, setResponse] = useState({})
  const [loaded, setLoaded] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

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
    setIsSubmit(false)
  }

  const validate = () => {
    let temp = {};
    temp.title = values.title ? "" : "Please enter a title";
    temp.abstract = values.abstract ? "" : "Please enter a valid abstract";
    temp.body = values.body ? "" : "Please enter a valid body";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const submit = async () => {
    setLoaded(false)
    console.log(isSubmit)
    if (validate()) {
      console.log("submitting...");
      setResponse(await API.submitArticle(values));
      setIsSubmit(true)
      setLoaded(true)
    }
  }

  return { values, setValues, errors, setErrors, handleChange, handleReset, validate, submit, isSubmit, setIsSubmit, response, loaded };
};
