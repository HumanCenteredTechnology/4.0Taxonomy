import React, { useState, useEffect } from "react";
import API from "../API.js";

const initialFoundElCheck = {
  needs: [{}],
  tech: [{}],
}





const initialFormSteps = {
  step1: {},
  step2: {},
  step3: {}
}



export const useForm = () => {


  const [checkboxes, setCheckboxes] = useState({})

  const [formSteps, setFormSteps] = useState(initialFormSteps)





  return {

  };
};
