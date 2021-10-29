import React, { useState, useEffect } from 'react'
import { OutlinedInput, IconButton, Autocomplete, TextField, Typography, Box, CardHeader, CardContent, CardActions, Stepper, Step, StepLabel, FormControl, FormControlLabel, Checkbox, FormGroup, FormLabel, List, ListItem, ListItemText, Menu, MenuItem, InputLabel, ListSubheader, Select } from '@mui/material'
import { makeStyles } from '@mui/styles';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import TopicChip from '../TopicChip'
import StandardButton from '../controls/StandardButton'
import BrowsableTree from '../BrowsableTree'
import CheckBoxTree from '../CheckBoxTree';
import taxonomy from "../../taxonomy.json";
import VerifySubmit from '../VerifySubmit';
const initialNeeds = JSON.parse(JSON.stringify(taxonomy.at(0).subLevels))
const initialTech = JSON.parse(JSON.stringify(taxonomy.at(1).subLevels))

const VerifySubmit2 = ({ response, steps, setSteps }) => {
    //const classes = useStyles();


    const [notFoundElements, setNotFoundElements] = useState([])
    const [selectedEl, setSelectedEl] = useState([]);
    const [toIdentify, setToIdentify] = useState(false)



    useEffect(() => {
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
        <form autoComplete="off">
            <CardHeader
                title="Not found in the taxonomy"
                subheader="click to add..."
            />
            <CardContent>
                <Box sx={{ my: 2 }}>
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
            </CardContent>
            <CardActions>
            </CardActions>
        </ form>
    )
}






const IdentifyEl = ({ el }) => {
    const [selectValue, setSelectValue] = useState([])
    const [internalValue, setInternalValue] = useState([])

    const sendToParent = (checkedEl, checkedElPlain) => {
        setSelectValue(checkedElPlain)
        setInternalValue(checkedEl)
        console.log(internalValue)
    }

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        disablePortal: true,
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
                    value={selectValue}
                    input={<OutlinedInput label="Select in taxonomy" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    <CheckBoxTree
                        initialNeeds={initialNeeds}
                        sendToParent={sendToParent}
                        internalValue={internalValue} />
                </Select>
            </FormControl>
        </Box>
    )
}

export default VerifySubmit2;
