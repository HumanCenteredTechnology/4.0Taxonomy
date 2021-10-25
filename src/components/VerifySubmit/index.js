import React, { useState, useEffect } from 'react'
import { IconButton, Autocomplete, TextField, Typography, Grid, Box, DialogActions, DialogContent, DialogTitle, Stepper, Step, StepLabel, FormControl, FormControlLabel, Checkbox, FormGroup, FormLabel, List, ListItem, ListItemText } from '@mui/material'
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import TopicChip from '../TopicChip'
import StandardButton from '../controls/StandardButton'
import BrowsableTree from '../BrowsableTree'
const initialResponse = {
    "founded_elements":
        [
            ["Smart warehouse", "Supply Chain", "Problems", ["Link to Article", "Link to Article"]],
            ["Tableau", "Advanced reporting and self-service business intelligence tools", "Technology", ["Link to Article ", "Link To Article"]],
            ["Smart warehouse", "Supply Chain", "Problems", ["Link to Article", "Link to Article"]],
            ["Tableau", "Advanced reporting and self-service business intelligence tools", "Technology", ["Link to Article ", "Link To Article"]]

        ],
    "not_founded_elements":
        [
            ["Computer", "Supply Chain", "Problems", ["Link to Article", "Link to Article"]],
            ["Tableau", "Advanced reporting and self-service business intelligence tools", "Technology", ["Link to Article ", "Link To Article"]]
        ]
}
const steps = ['Check inside the database', 'Check outside the database'];

const VerifySubmit = ({ response, handleClose }) => {


    const [foundElements, setFoundElements] = useState(initialResponse.founded_elements)
    const [notFoundElements, setNotFoundElements] = useState(initialResponse.not_founded_elements)
    const [selectedEl, setSelectedEl] = useState([]);
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());

    const isStepOptional = (step) => {
        return step === 1;
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

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
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

    const handleReset = () => {
        setActiveStep(0);
    };

    useEffect(() => {
        setFoundElements(response.founded_elements)
        setNotFoundElements(response.not_founded_elements)

    }, [response])
    //qui prende i valori dall'autocomplete e li mette nello stato
    const handleChange = (e, value) => {
        setSelectedEl(value)
        console.log(selectedEl)
    }

    const handleSelection = (el, i) => (
        <ListItem key={i + el}>
            <ListItemText primary={el} />
            <IconButton aria-label="delete element" value={el} onClick={handleDeleteEl}><HighlightOffRoundedIcon /></IconButton>
        </ListItem>
    )

    const handleDeleteEl = (e) => {
        setNotFoundElements(notFoundElements => [...notFoundElements, e.currentTarget.value])
        setSelectedEl(selectedEl.filter(el => el !== e.currentTarget.value))
        console.log(selectedEl)
    }

    return (
        <>
            <Box sx={{ m: 1 }} >
                <StepperView activeStep={activeStep} isStepOptional={isStepOptional} isStepSkipped={isStepSkipped} />
            </Box>
            <DialogTitle>Confirm submission</DialogTitle>
            <DialogContent>
                {activeStep == 0 ?
                    <Box sx={{ my: 2 }}>
                        <p>Found in the taxonomy</p>
                        <FormCheck foundElements={foundElements} />
                    </Box>
                    :
                    <Box sx={{ my: 4 }}>
                        <p>Not found in the taxonomy (click to add)</p>
                        <Autocomplete
                            multiple
                            renderTags={() => null}
                            id="tags-outlined"
                            options={notFoundElements}
                            getOptionLabel={(option) => option}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label=""
                                    placeholder="Click to add"
                                />
                            )}
                            onChange={handleChange}
                            value={selectedEl}
                            filterSelectedOptions
                        />
                        <Typography variant="body1">Selected topics: </Typography>


                        <List>
                            {Array.isArray(selectedEl) ? selectedEl.map((el, i) => handleSelection(el, i)) : <></>}
                        </List>
                    </Box>
                }
            </DialogContent>
            <DialogActions>
                <StandardButton
                    color="inherit"
                    onClick={activeStep === 0 ? handleClose : handleBack}
                    text={activeStep === 0 ? "Close" : "Back"} />
                <Box sx={{ flexGrow: 1 }} />
                <StandardButton
                    text={activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    onClick={handleNext} />


            </DialogActions>

        </>
    )
}

const StepperView = ({ activeStep, isStepOptional, isStepSkipped }) => {
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


const FormCheck = ({ foundElements }) => {
    const [needs, setNeeds] = useState([])
    const [tech, setTech] = useState([])



    useEffect(() => {
        if (foundElements.length !== 0) {
            setNeeds(foundElements.filter(el => el[1] === "Problems"))
            setTech(foundElements.filter(el => el[1] === "Technology"))
        }
    }, [foundElements])

    const renderForm = (el) => (
        <FormControlLabel control={<Checkbox defaultChecked />} label={el[0]} />
    )

    return (
        <Box sx={{
            width: '100%',
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 400,
            '& ul': { padding: 0 },
        }}>
            <FormControl>
                <FormLabel>Needs</FormLabel>
                <FormGroup>
                    {needs.map(el => (renderForm(el)))}
                </FormGroup>
                <FormLabel>Technologies</FormLabel>
                <FormGroup>
                    {tech.map(el => (renderForm(el)))}
                </FormGroup>
            </ FormControl>
        </Box>
    )
}

export default VerifySubmit
