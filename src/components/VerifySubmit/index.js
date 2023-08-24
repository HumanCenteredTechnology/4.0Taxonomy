import React, { useState, useEffect, useContext } from 'react'
import { useForm } from '../../hooks/useForm';
import { FormContext } from '../3 - FormPage';
import { OutlinedInput, IconButton, Autocomplete, TextField, Typography, Box, CardHeader, CardContent, CardActions, Stepper, Step, StepLabel, FormControl, FormControlLabel, Checkbox, FormGroup, FormLabel, List, ListItem, ListItemText, Menu, MenuItem, InputLabel, ListSubheader, Select, Button } from '@mui/material'
import { makeStyles } from '@mui/styles';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import TopicChip from '../TopicChip'
import StandardButton from '../controls/StandardButton'
import BrowsableTree from '../BrowsableTree'
import CheckBoxTree from '../CheckBoxTree';
import taxonomy from "../../taxonomy.json";
const initialNeeds = JSON.parse(JSON.stringify(taxonomy.at(0).subLevels))
const initialTech = JSON.parse(JSON.stringify(taxonomy.at(1).subLevels))

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiFormControl-root": {

            margin: theme.spacing(2),
        },
    },
}));

const VerifySubmit = ({ onNextStep, onBackStep, selectedTopics, setSelectedTopics, formDataVerify1, setFormDataVerify1, taxonomy }) => {
    const classes = useStyles();
    const { values, handleCheckboxChange, convertToEventParams } = useContext(FormContext);
    const [selectedEl, setSelectedEl] = useState([]);
    const [isEl, setIsEl] = useState(false);

    // Stato per tenere traccia dell'eventuale errore di validazione
    const [validationError, setValidationError] = useState(false);

    // Funzione per gestire il click sul pulsante "Next"
    const handleNextStep = () => {
      onNextStep();
  };

  // Funzione per gestire il click sul pulsante "Back"
  const handleBackStep = () => {
    onBackStep();
  };

  const handleTopicSelectionChange = (event) => {
    selectedTopics = event.target.value;
    setSelectedTopics(selectedTopics);
  };

    const handleTopicCheckboxChange = (event, taxonomy) => {
      if (event.target.checked) {
        setSelectedTopics([...selectedTopics, taxonomy]);
      } else {
        setSelectedTopics(selectedTopics.filter((selectedTopic) => selectedTopic !== taxonomy));
      }
    };
  
    const renderRelatedTopics = (categories, isSubLevel = false) => {
      if (!categories) {
        return null;
      }
  
      return categories.map((category) => {
        const { label, subLevels } = category;
  
        return (
          <React.Fragment key={label}>
            {!isSubLevel ? (
              <FormControlLabel
              label={`- ${label}`}
              disabled
              control={
                <Typography variant="body1" component="span">
                  {selectedTopics.includes(label) ? "[X]" : "[ ]"}
                </Typography>
              }
            />
            ) : (
              <FormControlLabel
            control={
              <Checkbox
                checked={selectedTopics.includes(label)}
                onChange={(e) => handleTopicCheckboxChange(e, label)}
              />
            }
            label={label}
          />            
            )}
            {subLevels && renderRelatedTopics(subLevels, true)}
          </React.Fragment>
        );
      });
    };


    const renderForm = (el, branch) => {
        console.log(Object.values(el))

        let name = Object.keys(el);
        let value = Object.values(el)
        console.log(name + value + branch)
        return (
            <FormControlLabel
                key={name}
                label={name}
                control={
                    <Checkbox
                        name={name}
                        onChange={e => handleCheckboxChange(branch, convertToEventParams(name, e.target.checked))}
                        value={value} />} />
        )
  
    }

    return (
      <form autoComplete="off">
            <CardHeader
                title="Select the relative topics from the"
                subheader="Choose one or more topics for your article"
            />
            <CardContent>
              <Box sx={{ my: 2 }}>
                <p>Select topics</p>
                  <Box
                    sx={{
                      width: '100%',
                      margin: "0 auto",
                      overflow: 'auto',
                      maxHeight: 500,
                      '& ul': { padding: 0 },
                    }}
                  >
                  <FormControl>
                  <FormLabel>Needs</FormLabel>
                  <FormGroup>{renderRelatedTopics(taxonomy?.[0]?.subLevels)}</FormGroup>
                  <FormLabel>Technologies</FormLabel>
                  <FormGroup>{renderRelatedTopics(taxonomy?.[1]?.subLevels)}</FormGroup> 
                  </FormControl>
              </Box>
            </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={handleBackStep}>Back</Button>
                <Button onClick={handleNextStep}>Next</Button>
              </Box>
            </CardContent>
        </form>
    )
}

export default VerifySubmit
