import React, { useState, useEffect, Children } from 'react'
import { OutlinedInput, IconButton, Autocomplete, TextField, Typography, Box, DialogActions, DialogContent, DialogTitle, Stepper, Step, StepLabel, FormControl, FormControlLabel, Checkbox, FormGroup, FormLabel, List, ListItem, ListItemText, Menu, MenuItem, InputLabel, ListSubheader, Select } from '@mui/material'
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import TopicChip from '../TopicChip'
import StandardButton from '../controls/StandardButton'
import BrowsableTree from '../BrowsableTree'
import CheckBoxTree from '../CheckBoxTree';
import taxonomy from "../../taxonomy.json";
const initialNeeds = JSON.parse(JSON.stringify(taxonomy.at(0).subLevels))
const initialTech = JSON.parse(JSON.stringify(taxonomy.at(1).subLevels))
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

const dialogTitles = ['Check inside the database', 'Check outside the database', 'Identify topics']

const VerifySubmit = ({ response, handleClose }) => {


    const [foundElements, setFoundElements] = useState(initialResponse.founded_elements)
    const [notFoundElements, setNotFoundElements] = useState(initialResponse.not_founded_elements)
    const [selectedEl, setSelectedEl] = useState([]);
    const [toIdentify, setToIdentify] = useState(false)

    const [steps, setSteps] = useState(['Check inside the database', 'Check outside the database']);
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

    useEffect(() => {

        if (selectedEl.length > 0 && toIdentify === false) {
            setToIdentify(true)
            setSteps(steps.concat('Identify topics'))
        }
        if (selectedEl.length === 0 && toIdentify === true) {
            setToIdentify(false)
            setSteps(steps.filter(s => s !== 'Identify topics'))
        }
    }, [selectedEl])
    //qui prende i valori dall'autocomplete e li mette nello stato
    const handleChange = (e, value) => {
        setSelectedEl(value)
    }

    const handleSelection = (el, i) => (
        <ListItem key={i + el}>
            <ListItemText primary={el} />
            <IconButton aria-label="delete element" value={el} onClick={handleDeleteEl}><HighlightOffRoundedIcon /></IconButton>
        </ListItem>
    )

    const handleDeleteEl = (e) => {
        let value = e.currentTarget.value
        setNotFoundElements(notFoundElements => [...notFoundElements, value])
        setSelectedEl(selectedEl.filter(el => el !== value))
    }


    return (
        <Box>
            <Box sx={{ m: 1 }} >
                <StepperView activeStep={activeStep} isStepOptional={isStepOptional} isStepSkipped={isStepSkipped} steps={steps} />
            </Box>
            <DialogTitle>{dialogTitles[activeStep]}</DialogTitle>
            <DialogContent>
                {activeStep === 0 ?
                    <Box sx={{ my: 2 }}>
                        <p>Found in the taxonomy</p>
                        <FormCheck foundElements={foundElements} />
                    </Box>
                    : activeStep === 1 ?
                        <Box sx={{ my: 4, mx: 5 }}>
                            <p>Not found in the taxonomy (click to add)</p>
                            <Autocomplete
                                sx={{ width: 400 }}
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
                            <List sx={{ width: 400 }}>
                                {Array.isArray(selectedEl) ? selectedEl.map((el, i) => handleSelection(el, i)) : <></>}
                            </List>
                        </Box>
                        : activeStep === 2 ?
                            <Box sx={{ my: 4, mx: 5 }}>
                                <Typography variant="body1">Identify .... </Typography>
                                {selectedEl.map((el, i) => {
                                    return (
                                        <IdentifyEl el={el} />
                                    );
                                })}
                            </Box>
                            : <></>
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
        </ Box>
    )
}

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
            width: '80%',
            margin: "0 auto",
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

const IdentifyEl = ({ el }) => {
    const [value, setValue] = useState([])

    const sendToParent = (checkedEl) => {
        setValue(checkedEl)
    }

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 300,
            },
        },
    };



    return (
        <Box>
            <Typography variant="body1">{el}</Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={value}
                    input={<OutlinedInput label="Select in taxonomy" />}

                    MenuProps={MenuProps}
                >
                    <CheckBoxTree
                        initialNeeds={initialNeeds}
                        sendToParent={sendToParent} />
                </Select>
            </FormControl>

        </Box>
    )
}






export default VerifySubmit
