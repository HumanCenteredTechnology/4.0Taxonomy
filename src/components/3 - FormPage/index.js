import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Card, Container, makeStyles, AppBar, Toolbar, Box } from "@material-ui/core";
import { Stepper, Step, StepLabel, Typography, CardActions } from "@mui/material"
//Components
import AddArticleForm from "../AddArticleForm";
import VerifySubmit from "../VerifySubmit";
import VerifySubmit2 from "../VerifySubmit2";
import StandardButton from "../controls/StandardButton";
import TopNavBar from "../TopNavBar";
//Hooks
import { useForm } from "../../hooks/useForm";



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

const FormPage = () => {
  const classes = useStyles();
  const { values, errors, handleChange, handleReset, submit, isSubmit, setIsSubmit, response, loaded } = useForm();
  const [steps, setSteps] = useState(['Insert your article', 'Review article in the database', 'Review affinity with other topics']);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

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

  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };

  return (
    <Box>
      <TopNavBar isForm={true} />
      <Container>
        <Box sx={{ m: 1 }} >
          <StepperView activeStep={activeStep} isStepOptional={isStepOptional} isStepSkipped={isStepSkipped} steps={steps} />
        </Box>


        <Card className={classes.pageContent} sx={{ width: "50%" }}>
          {activeStep === 0 ?
            <AddArticleForm values={values} errors={errors} handleChange={handleChange} handleReset={handleReset} handleSubmit={handleSubmit} />
            : activeStep === 1 ?
              <VerifySubmit response={response} steps={steps} setSteps={setSteps} />
              : activeStep === 2 ?
                < VerifySubmit2 response={response} steps={steps} setSteps={setSteps} />
                : activeStep === 3 ?
                  <h1>step4</h1>
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
    </Box>
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


