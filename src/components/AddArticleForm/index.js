import React, { useState, useEffect, useContext } from "react";

import { FormContext } from '../3 - FormPage';
//Components
import StandardButton from "../controls/StandardButton";
import TextInput from "../controls/TextInput";
import VerifySubmit from "../VerifySubmit";
//Hooks
import { useForm } from "../../hooks/useForm";
//Styles
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { CardActions, CardContent, CardHeader, Grid, makeStyles, Box, Modal } from "@material-ui/core";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {

      margin: theme.spacing(2),
    },
  },
}));

const filter = createFilterOptions();

const AddArticleForm = () => {
  const classes = useStyles();
  const { values, errors, handleChange, handleReset, handleSubmit } = useContext(FormContext)
  const sourceType = ['Diary', 'Conference', 'Scientia Iranica', 'None'];
  const options = ['None'];
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);
  const authors = [];

const handleClose = () => {
  setDialogValue({
    name: ''
  });
  toggleOpen(false);
};

const [dialogValue, setDialogValue] = React.useState({
  name: ''
});

const handleSubmitValue = (event) => {
  event.preventDefault();
  setValue({
    name: dialogValue.name
  });
  handleClose();
};

    

  return (
    <form className={classes.root} onSubmit={handleSubmit} autoComplete="off">
      <CardHeader
        title="Submit an article"
        subheader="Complete the form and submit your article"
      />
      <CardContent>
        <Grid container spacing={1}>
          <Grid  >
            <Grid item md={10} lg={10} xs={10} xl={12}>
            <TextInput
                variant = "outlined"
                label = "Title"
                name = "title"
                value = {values.title}
                onChange = {handleChange}
                error = {errors.title}
              />
              <TextInput
                variant = "outlined"
                label = "Link"
                name = "link"
                value = {values.link}
                onChange = {handleChange}
                error = {errors.link}
              />
             <Autocomplete
                disablePortal
                id="box"
                options={sourceType}
                sx={{ width: 400 }}
                renderInput={(params) => <TextField {...params} label="Source Type" />}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker label="Publication date" />
                </DemoContainer>
              </LocalizationProvider>
              <TextInput
                variant = "outlined"
                label = "Journal"   
                name = "journal"
                value = {values.journal}
                onChange = {handleChange}
                error = {errors.journal}
              />

              <React.Fragment>
                    <Autocomplete
                      value={value}
                      onChange={(event, newValue) => {
                        if (typeof newValue === 'string') {
                          // timeout to avoid instant validation of the dialog's form.
                          setTimeout(() => {
                            toggleOpen(true);
                            setDialogValue({
                              name: newValue
                            });
                          });
                        } else if (newValue && newValue.inputValue) {
                          toggleOpen(true);
                          setDialogValue({
                            name: newValue.inputValue
                          });
                        } else {
                          setValue(newValue);
                        }
                      }}
                      filterOptions={(options, params) => {
                        const filtered = filter(options, params);

                        if (params.inputValue !== '') {
                          filtered.push({
                            inputValue: params.inputValue,
                            name: `Add "${params.inputValue}"`,
                          });
                        }

                        return filtered;
                      }}
                      id="free-solo-dialog-demo"
                      options={authors}
                      getOptionLabel={(option) => {

                        if (typeof option === 'string') {
                          return option;
                        }
                        if (option.inputValue) {
                          return option.inputValue;
                        }
                        return option.name;
                      }}
                      selectOnFocus
                      clearOnBlur
                      handleHomeEndKeys
                      renderOption={(props, option) => <li {...props}>{option.name}</li>}
                      sx={{ width: 400 }}
                      freeSolo
                      renderInput={(params) => <TextField {...params} label="Authors" />}
                    />
                    <Dialog open={open} onClose={handleClose}>
                      <form onSubmit={handleSubmitValue}>
                        <DialogTitle>Add a new author</DialogTitle>
                        <DialogContent>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            value={dialogValue.name}
                            onChange={(event) =>
                              setDialogValue({
                                ...dialogValue,
                                name: event.target.value,
                              })
                            }
                            label="author"
                            type="text"
                            variant="standard"
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Cancel</Button>
                          <Button type="submit">Add</Button>
                        </DialogActions>
                      </form>
                    </Dialog>
                  </React.Fragment>
              <TextInput 
                variant = "outlined"
                label = "Doi"
                name = "doi"
                value = {values.doi}
                onChange = {handleChange}
                error = {errors.doi}
              />
              <TextInput 
                variant = "outlined"
                label = "Abstract"
                name = "abstract"
                value = {values.abstract}
                onChange = {handleChange}
                error = {errors.abstract}
              />
            </Grid>
          </Grid>
          { <Box sx = {{ width: "200", height: "200", bgcolor: "primary" }}></Box> }
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
          type="submit"
          text="Submit"
          onClick={handleSubmit}
        />
      </CardActions>


      {/* {response.founded_elements ?
        <Dialog
          fullWidth
          maxWidth="md"
          open={open}
          onClose={handleClose}
          scroll="body"
        >
          <VerifySubmit response={response} handleClose={handleClose} />
        </Dialog>
        : <> </>} */}
    </form>
  );
};

export default AddArticleForm;
