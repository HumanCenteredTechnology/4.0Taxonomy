import React, { useState, useEffect } from "react";
import API from "../API.js";

const initialFoundElCheck = {
  needs: [{}],
  tech: [{}],
}

const initialResponse = {
  founded_elements:
    [],
  not_founded_elements:
    []
}

const initialValues = {
  title: "",
  abstract: "",
  body: "",
};



const initialFormSteps = {
  step1: {},
  step2: {},
  step3: {}
}



export const useForm = () => {
  const [values, setValues] = useState(initialValues);
  const [checkboxes, setCheckboxes] = useState({})
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(initialResponse)
  const [foundElCheck, setFoundElCheck] = useState(initialFoundElCheck)
  const [loaded, setLoaded] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formSteps, setFormSteps] = useState(initialFormSteps)


  useEffect(() => {
    if (response.founded_elements > 0)
      setFoundElCheck({
        needs: response.founded_elements.filter(el => el[1] === "Problems").map(el => orderCheckbox(el[0])),
        tech: response.founded_elements.filter(el => el[1] === "Technology").map(el => orderCheckbox(el[0]))
      })
    //console.log(foundElCheck);
  }, [response])


  const orderCheckbox = (el) => {
    return { [JSON.stringify(el)]: true }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    console.log(values)
  };

  const convertToEventParams = (name, value) => ({
    target: {
      name, value
    }
  })

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    setCheckboxes({
      ...checkboxes,
      [name]: checked
    })
    setValues({
      ...values,

    })
    //console.log(checkboxes)
  }

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
    if (validate()) {
      console.log("submitting...");
      const response = await API.submitArticle(values);
      setIsSubmit(true)
      setLoaded(true)
      return response;
    }
  }

  return {
    values, setValues, errors, setErrors, handleChange, convertToEventParams, handleReset,
    validate, submit, isSubmit, setIsSubmit, response, foundElCheck, loaded, formSteps, setFormSteps
  };
};
