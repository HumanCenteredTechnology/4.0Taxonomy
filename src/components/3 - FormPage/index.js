import React, { useState, useEffect, useContext, createContext } from "react";
import { useNavigate } from 'react-router-dom';
import API from "../../API";
import { Link as RouterLink } from "react-router-dom";
import { Card, Container, makeStyles, AppBar, Toolbar, Box } from "@material-ui/core";
import { Stepper, Step, StepLabel, Typography, CardActions, FormGroup, FormControl, FormControlLabel, Checkbox } from "@mui/material"
//Components
import AddArticleForm from "../AddArticleForm";
import VerifySubmit from "../VerifySubmit";
import VerifySubmit2 from "../VerifySubmit2";
import StandardButton from "../controls/StandardButton";
import TopNavBar from "../TopNavBar";
import taxonomy from "../../taxonomy.json";
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
  link: "",
  sourceType: "",
  journal: "",
  authors: "",
  doi: "",
  publicationDate: "",
  abstract: "",
  needs: [],
  tech: [],
};

const initialResponse = {
  founded_elements:
    []
}


const FormPage = ({ onNextStep, onBackStep }) => {
  const classes = useStyles();

  const { } = useForm();
  const [steps, setSteps] = useState(['Insert your article', 'Review article in the database', 'Verify']);
  const [activeStep, setActiveStep] = useState(0);
  const [values, setValues] = useState(initialValues);
  const [check, setCheck] = useState([]);
  const [response, setResponse] = useState(initialResponse)
  const [errors, setErrors] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1); // Inizia con lo step 1
  const [activeForm, setActiveForm] = useState("AddArticleForm");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [formDataVerify1, setFormDataVerify1] = useState({
    selectedEl: [],
  });
 
  const handleNext = (topics) => {
    // Imposta il form attivo in base alla fase corrente
    if (activeStep === 0) {
      setActiveForm("VerifySubmit");
    } else if (activeStep === 1) {
      setActiveForm("VerifySubmit2");
    }
    setCurrentStep((prevStep) => prevStep + 1);
    setFormDataVerify1({
      ...formDataVerify1,
      selectedEl: topics,
    });
  };

  const handleVerifySubmitFormChange = (updatedFormData) => {
    setFormDataVerify1({
      ...formDataVerify1,
      ...updatedFormData,
    });
  };

  useEffect(() => {
    if (loaded) handleNext()
  }, [loaded])

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    if (activeStep > 0) setIsSubmit(false)
  };

  const handleStepReset = () => {
    if (!isSubmit)
      setActiveStep(0);
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
    temp.title = values.title ? "" : "Please enter a valid title";
    temp.link = values.link ? "" : "Please enter a valid link";
    temp.sourceType = values.sourceType ? "" : "Please enter a valid source type";
    temp.journal = values.journal ? "" : "Please enter a valid journal";
    temp.authors = values.authors ? "" : "Please enter one or more authors: Surname Name";
    temp.doi = values.doi ? "" : "Please enter a valid doi";
    temp.publicationDate = values.publicationDate ? "" : "Please enter the publication date";
    temp.abstract = values.abstract ? "" : "Please enter a valid abstract"; 
  
      // Validazione dei campi obbligatori
      const validationErrors = {};
  
      if (!values.title) {
        validationErrors.title = 'Il campo Titolo è obbligatorio.';
      }
    
      if (!values.link) {
        validationErrors.link = 'Il campo Link è obbligatorio.';
      }
    
      if (!values.sourceType) {
        validationErrors.sourceType = 'Il campo Source Type è obbligatorio.';
      }
    
    // Combina i messaggi di errore da entrambe le parti
    //const combinedErrors = { ...temp, ...validationErrors };
  
    // Imposta gli errori combinati nello stato
    setErrors(validationErrors);

    // Verifica se ci sono errori
    const hasErrors = Object.values(validationErrors).some((x) => x !== "");

    // Se ci sono errori, la validazione non è riuscita
    return !hasErrors;
};
 
    
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit is called");
    setLoaded(false);
    console.log("Inizio handleSubmit");

    // Verifica in quale fase del form ci troviamo
    if (currentStep === 1) {
      // Salva i dati dalla componente "AddArticleForm" e vai avanti
      setValues({ ...values });
    } else if (currentStep === 2) {
      // Salva i dati dalla componente "VerifySubmit" e vai avanti
      setFormDataVerify1({ ...formDataVerify1 });
    } else if (currentStep === 3) {
      // Gestisci l'invio del form "verifySubmit2"
        try {
          if (validate()) {
            console.log("Validazione riuscita, invio della richiesta API...");
            const response = await API.submitArticle(values); // Controlla se 'values' contiene dati validi.
            console.log("Risposta dalla richiesta API:", response);
            setIsSubmit(true);
            setLoaded(true);
            console.log("handleSubmit completato con successo");
            return orderResponse(response);
          } else {
            console.log("Validazione non riuscita");
            return initialResponse;
          }
        } catch (e) {
          console.error("Errore durante l'invio dell'articolo:", e);
        }
    }
    setCurrentStep((prevStep) => prevStep + 1);
    // Naviga alla destinazione finale dopo il completamento del submit o in caso di errore
    navigate('/');
  };
  


  return (
    <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
    <FormContext.Provider value={{ values, setValues, check, response, setResponse, errors, handleChange, handleReset, handleSubmit, handleCheckboxChange, convertToEventParams }}>
      <TopNavBar isForm={true} />
      <Container>
        <Box sx={{ m: 1 }} >
          <StepperView activeStep={activeStep} steps={steps} />
        </Box>
        <Card className={classes.pageContent} sx={{ width: "50%" }}>
          {currentStep === 1 &&(
                <AddArticleForm onNextStep={handleNext} />
          )}
          {currentStep === 2 && (
              <VerifySubmit
                onNextStep={handleNext}
                onBackStep={handleBack}
                selectedTopics={selectedTopics}
                setSelectedTopics={setSelectedTopics}
                relatedTopics={formDataVerify1.relatedTopics}
                onFormChange={handleVerifySubmitFormChange}
                taxonomy={taxonomy}
              /> 
          )}
          {currentStep === 3 && (
              <VerifySubmit2
                onBackStep={handleBack}
                handleSubmit={handleSubmit}
                formDataVerify1={formDataVerify1}
                selectedTopics={selectedTopics}
                setSelectedTopics={setSelectedTopics}
              />
          )}
          <CardActions>
            {activeStep > 0 ?
              <StandardButton
                type="button"
                color="inherit"
                onClick={activeStep === 0 ? () => { } : handleBack}
                text={activeStep === 0 ? "Close" : "Back"} />
              : <></>}

            <Box sx={{ flexGrow: 1 }} />
            {activeStep > 0 ?
              <StandardButton
              type="button"
              color="inherit"
              onClick={activeStep === steps.length - 1 ? () => { } : handleNext} 
              text={activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            />
            : <></>
            }

          </CardActions>
        </Card>

      </ Container>
    </FormContext.Provider>
    </form>
  );
};

const StepperView = ({ activeStep, steps }) => {
  return (
    <Stepper activeStep={activeStep}>
      {steps.map((label, index) => {
        const stepProps = {};
        const labelProps = {};
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


