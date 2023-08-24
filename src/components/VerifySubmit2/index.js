import React, { useState, useEffect, useContext } from 'react'
import { FormContext } from '../3 - FormPage';
import { OutlinedInput, IconButton, Autocomplete, TextField, Typography, Box, CardHeader, CardContent, CardActions, Stepper, Step, StepLabel, FormControl, FormControlLabel, Checkbox, FormGroup, FormLabel, List, ListItem, ListItemText, Menu, MenuItem, InputLabel, ListSubheader, Select } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { AccountCircle } from '@mui/icons-material';
import TopicChip from '../TopicChip'
import StandardButton from '../controls/StandardButton'
import BrowsableTree from '../BrowsableTree'
import CheckBoxTree from '../CheckBoxTree';
import taxonomy from "../../taxonomy.json";
import VerifySubmit from '../VerifySubmit';

const initialNeeds = JSON.parse(JSON.stringify(taxonomy.at(0).subLevels))
const initialTech = JSON.parse(JSON.stringify(taxonomy.at(1).subLevels))

const VerifySubmit2 = ({ onBackStep, formDataVerify1, selectedTopics, setSelectedTopics }) => {

  const { values, handleSubmit } = useContext(FormContext)

  const handleBack = () => {
    onBackStep();
  };

  const handleFormSubmit = async (e) =>  {
    // Chiamata al metodo handleSubmit definito in FormPage
    handleSubmit(e);
  };

    return (
        <form autoComplete="off">
          <CardHeader
            title="Riepilogo delle informazioni inserite nel form"
          />
          <CardContent>
            <Box sx={{ my: 2 }}>
              <Typography variant="body1">Titolo: {values.title}</Typography>
              <Typography variant="body1">Link: {values.link}</Typography>
              <Typography variant="body1">Tipo: {values.sourceType}</Typography>
              <Typography variant="body1">Data di pubblicazione: {values.publicationDate}</Typography>
              <Typography variant="body1">Rivista: {values.journal}</Typography>
              <Typography variant="body1">Autori: {values.authors}</Typography>
              <Typography variant="body1">Doi: {values.doi}</Typography>
              <Typography variant="body1">Astratto: {values.abstract}</Typography>
            </Box>

            <Box sx={{ my: 2 }}>
                <Typography variant="body1">Selected topics:</Typography>
                <List sx={{ width: 400 }}>
                    {selectedTopics.map((el, i) => (
                    <ListItem key={i + el}>
                        <ListItemText primary={el} />
                    </ListItem>
                    ))}
                </List>
            </Box>
          </CardContent>

          <CardActions>
            <StandardButton color="inherit" onClick={handleBack} text="Back" />
            <StandardButton color="primary" onClick={handleFormSubmit} text="Submit" />
          </CardActions>
        </form>
      );
    };

export default VerifySubmit2;
