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

const initialNeeds = JSON.parse(JSON.stringify(taxonomy.at(0).subLevels));
const initialTech = JSON.parse(JSON.stringify(taxonomy.at(1).subLevels));

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between', // Posiziona i box uno a sinistra e uno a destra
    "& .MuiFormControl-root": {
      margin: theme.spacing(2),
    },
  },
  box: {
    width: '48%', // Imposta la larghezza di ciascun box
  },
}));

const VerifySubmit = ({ onNextStep, onBackStep, selectedTopics, setSelectedTopics, formDataVerify1, setFormDataVerify1, taxonomy }) => {
  const classes = useStyles();
  const { values, handleCheckboxChange, convertToEventParams } = useContext(FormContext);
  const [selectedEl, setSelectedEl] = useState([]);
  const [isEl, setIsEl] = useState(false);

  const handleNextStep = () => {
    // Verifica se ci sono selezioni in entrambe le liste
    if (selectedTopics.length >  0) {
      onNextStep();
    } else {
      // Mostra un alert
      alert("Seleziona almeno un elemento da entrambe le liste.");
    }
  };
  

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

  return (
    <div autoComplete="off">
      <CardHeader
        title="Select the relative topics"
        subheader="Choose one or more topics for your article"
      />
      <CardContent className={classes.root}>
        {/* Box per i 'Need' */}
        <Box className={classes.box}>
          <FormLabel>Needs</FormLabel>
          <FormGroup>{renderRelatedTopics(taxonomy?.[0]?.subLevels)}</FormGroup>
        </Box>
        {/* Box per le 'Technologies' */}
        <Box className={classes.box}>
          <FormLabel>Technologies</FormLabel>
          <FormGroup>{renderRelatedTopics(taxonomy?.[1]?.subLevels)}</FormGroup>
        </Box>
      </CardContent>
      <CardActions>
        <Button onClick={onBackStep}>Back</Button>
        <Button onClick={onNextStep}>Next</Button>
      </CardActions>
    </div>
  );
};

export default VerifySubmit;
