import React, { useState, useEffect, useContext, createContext } from "react";
import API from "../../API";
import { Link as RouterLink } from "react-router-dom";
import { Card, Container, makeStyles, AppBar, Toolbar, Box } from "@material-ui/core";
import { Stepper, Step, StepLabel, Typography, CardActions } from "@mui/material"
//Components
import AddArticleForm from "../AddArticleForm";
import VerifySubmit from "../VerifySubmit";
import VerifySubmit2 from "../VerifySubmit2";
import VerifySubmit3 from "../VerifySubmit3";
import StandardButton from "../controls/StandardButton";
import TopNavBar from "../TopNavBar";
//Hooks
import { useForm } from "../../hooks/useForm";


export const FormContext = createContext();

const useStyles = makeStyles((theme) => ({
  pageContent: {
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(16),
      marginRight: theme.spacing(16),
      marginTop: theme.spacing(4),
      padding: theme.spacing(1),
    },
    [theme.breakpoints.between('sm', 'md')]: {
      marginLeft: theme.spacing(8),
      marginRight: theme.spacing(8),
      marginTop: theme.spacing(2),
      padding: theme.spacing(1),
    },
    [theme.breakpoints.between('xs', 'sm')]: {
      margin: theme.spacing(0),
      padding: theme.spacing(1),
    }
  },
}));

const initialValues = {
  title: "",
  abstract: "",
  body: "",
  needs: [],
  tech: [],
};

const initialResponse = {
  founded_elements:
    [],
  not_founded_elements:
    []
}


const FormPage = () => {
  const classes = useStyles();

  const { } = useForm();
  const [steps, setSteps] = useState(['Insert your article', 'Review article in the database', 'Review affinity with other topics']);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [values, setValues] = useState(initialValues);
  const [check, setCheck] = useState([]);
  const [response, setResponse] = useState(initialResponse)
  const [errors, setErrors] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const [notFoundEl, setNotFoundEl] = useState([])

  const isStepOptional = (step) => {
    return step === 2;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

  };

  useEffect(() => {
    if (loaded) handleNext()
  }, [loaded])

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (activeStep > 0) setIsSubmit(false)
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleStepReset = () => {
    if (!isSubmit)
      setActiveStep(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setResponse(await submit);
    //setSavedValues(saveValues)
  };


  useEffect(() => {
    console.log(values)
  }, [values])



  //ci sarebbe da formattare bene a seconda dello step
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    //console.log(values)
  };

  const convertToEventParams = (name, value) => ({
    target: {
      name, value
    }
  })

  const handleCheckboxChange = (branch, e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [branch]: values[branch].map(el => el.hasOwnProperty(name) ? { [name]: value } : el),
    });
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
    try {
      if (validate()) {
        console.log("submitting...");
        const response = await API.submitArticle(values);
        setIsSubmit(true)
        setLoaded(true)
        return orderResponse(response);
      }
      else return initialResponse
    } catch (e) {
      console.log(e)
    }
  }

  const orderCheckbox = (el) => {
    return { [el]: true }
  }

  const orderResponse = (response) => {
    if (Array.isArray(response.founded_elements))
      setValues({
        needs: response.founded_elements.filter(el => el[1] === "Problems").map(el => orderCheckbox(el[0])),
        tech: response.founded_elements.filter(el => el[1] === "Technology").map(el => orderCheckbox(el[0]))
      })
    console.log(response)
  }


  return (
    <FormContext.Provider value={{ values, setValues, check, response, setResponse, errors, handleChange, handleReset, handleSubmit, handleCheckboxChange, convertToEventParams }}>
      <TopNavBar isForm={true} />
      <Container>
        <Box sx={{ m: 1 }} >
          <StepperView activeStep={activeStep} isStepOptional={isStepOptional} isStepSkipped={isStepSkipped} steps={steps} />
        </Box>


        <Card className={classes.pageContent} sx={{ width: "50%" }}>
          {activeStep === 0 ?
            <AddArticleForm />
            : activeStep === 1 ?
              loaded ?
                <VerifySubmit />
                : activeStep === 2 ?
                  < VerifySubmit2 steps={steps} setSteps={setSteps} />
                  : activeStep === 3 ?
                    <VerifySubmit3 steps={steps} setSteps={setSteps} />
                    : <> </>
              : <> </>
          }
          <CardActions>
            {activeStep > 0 ?
              <StandardButton
                color="inherit"
                onClick={activeStep === 0 ? () => { } : handleBack}
                text={activeStep === 0 ? "Close" : "Back"} />
              : <></>}

            <Box sx={{ flexGrow: 1 }} />
            {activeStep > 0 ?
              <StandardButton
                text={activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                type="button"
                onClick={handleNext} />
              : <></>}

          </CardActions>
        </Card>

      </ Container>
    </FormContext.Provider>
  );
};

const StepperView = ({ activeStep, isStepOptional, isStepSkipped, steps }) => {
  return (
    <Stepper activeStep={activeStep}>
      {steps.map((label, index) => {
        const stepProps = {};
        const labelProps = {};
        if (isStepOptional(index)) {
          labelProps.optional = (
            <Typography variant="caption">Optional</Typography>
          );
        }
        if (isStepSkipped(index)) {
          stepProps.completed = false;
        }
        return (
          <Step key={label} {...stepProps}>
            <StepLabel {...labelProps}>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  )
}

export default FormPage;


