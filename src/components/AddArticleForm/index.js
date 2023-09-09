import React, { useState, useEffect, useContext } from "react";
import { FormContext } from '../3 - FormPage';
import StandardButton from "../controls/StandardButton";
import TextInput from "../controls/TextInput";
import VerifySubmit from "../VerifySubmit";
import { useForm } from "../../hooks/useForm";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CardActions, CardContent, CardHeader, Grid, makeStyles, Box, Modal } from "@material-ui/core";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { handleNext } from '../3 - FormPage'; 

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      margin: theme.spacing(2),
    },
  },
}));

const filter = createFilterOptions();

const AddArticleForm = ({ onNextStep }) => {
  const classes = useStyles();
  const { values, errors, handleChange, handleReset, handleSubmit } = useContext(FormContext);
  const sourceType = ['Conference paper', 'Journal paper', 'White paper', 'Tech report', 'Case study', 'Other'];
  const options = ['Other'];
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);
  const [authors, setAuthors] = React.useState([]); // Cambia in un array vuoto per gestire più autori

  // Funzione per aggiungere un nuovo autore all'array
  const addAuthor = () => {
    setAuthors([...authors, ""]); // Aggiunge un autore vuoto all'array
  };

  // Funzione per rimuovere un autore dall'array
  const removeAuthor = (index) => {
    const updatedAuthors = [...authors];
    updatedAuthors.splice(index, 1);
    setAuthors(updatedAuthors);
  };

  // Funzione per aggiornare un autore specifico nell'array
  const updateAuthor = (index, newValue) => {
    const updatedAuthors = [...authors];
    updatedAuthors[index] = newValue;
    setAuthors(updatedAuthors);
  };


   // Funzione per gestire il click sul pulsante "Next"
   const handleNextStep = () => {
    // Verifica che i campi obbligatori siano compilati prima di passare allo step successivo
    if (values.title && values.link && values.sourceType) {
      onNextStep();
    } else {
      // Mostra un alert
      alert("Completa tutti i campi obbligatori.");
    }
  };

  return (
    <div className={classes.root} autoComplete="off">
      <CardHeader
        title="Submit an article"
        subheader="Complete the form and submit your article"
      />
      <CardContent>
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <TextInput
              variant="outlined"
              label="Title"
              name="title"
              value={values.title}
              onChange={handleChange}
              error={errors.title}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              variant="outlined"
              label="Link"
              name="link"
              value={values.link}
              onChange={handleChange}
              error={errors.link}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              variant="outlined"
              label="Journal"
              name="journal"
              value={values.journal}
              onChange={handleChange}
              error={errors.journal}
            />
          </Grid>
          {authors.map((author, index) => (
        <Grid item xs={12} key={index}>
          <FormControl variant="outlined">
            <InputLabel htmlFor={`author-${index}`}>
              Author {index + 1}
            </InputLabel>
            <Input
              id={`author-${index}`}
              variant="outlined"
              label={`Author ${index + 1}`}
              value={author}
              onChange={(e) => updateAuthor(index, e.target.value)}
              error={errors.authors}
            />
          </FormControl>
          {index > 0 && ( // Mostra il pulsante di rimozione solo per gli autori aggiunti dopo il primo
            <Fab color="secondary" size="small" onClick={() => removeAuthor(index)}>
              <RemoveIcon />
            </Fab>
          )}
        </Grid>
      ))}
      
      {/* Pulsante per aggiungere un nuovo autore */}
      <Grid item xs={12}>
        <Fab color="primary" size="small" onClick={addAuthor}>
          <AddIcon />
        </Fab>
      </Grid>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker label="Publication date" />
              </DemoContainer>
            </LocalizationProvider>
            <TextInput
              variant="outlined"
              label="Doi"
              name="doi"
              value={values.doi}
              onChange={handleChange}
              error={errors.doi}
            />
          
          <Autocomplete
            disablePortal
            id="box"
            options={sourceType}
            sx={{ width: 400 }}
            value={values.sourceType}
            onChange={(e, newValue) => {
              
                handleChange({ target: { name: 'sourceType', value: newValue } });
              
            }}
            renderInput={(params) => (
              <TextField {...params} label="Source Type" />
            )}
            freeSolo
            required
          />
          <Grid item xs={12}>
            <TextInput
              variant="outlined"
              label="Abstract"
              name="abstract"
              value={values.abstract}
              onChange={handleChange}
              error={errors.abstract}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <StandardButton
          text="Reset"
          color="default"
          onClick={handleReset}
        />
        <Box sx={{ flexGrow: 1 }} />
        <StandardButton
          type="next"
          text=" Next"
          onClick={onNextStep}
          disabled={!(values.title && values.link && values.sourceType)} // Disabilita il pulsante se i campi obbligatori non sono compilati
        />
      </CardActions>
    </div>
  );
};

export default AddArticleForm;
