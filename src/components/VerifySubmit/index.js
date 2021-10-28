import React, { useState, useEffect } from 'react'
import { OutlinedInput, IconButton, Autocomplete, TextField, Typography, Box, CardHeader, CardContent, CardActions, Stepper, Step, StepLabel, FormControl, FormControlLabel, Checkbox, FormGroup, FormLabel, List, ListItem, ListItemText, Menu, MenuItem, InputLabel, ListSubheader, Select } from '@mui/material'
import { makeStyles } from '@mui/styles';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import TopicChip from '../TopicChip'
import StandardButton from '../controls/StandardButton'
import BrowsableTree from '../BrowsableTree'
import CheckBoxTree from '../CheckBoxTree';
import taxonomy from "../../taxonomy.json";
const initialNeeds = JSON.parse(JSON.stringify(taxonomy.at(0).subLevels))
const initialTech = JSON.parse(JSON.stringify(taxonomy.at(1).subLevels))

/* const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiFormControl-root": {

            margin: theme.spacing(2),
        },
    },
})); */
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


const VerifySubmit = ({ response, steps, setSteps }) => {
    //const classes = useStyles();

    const [foundElements, setFoundElements] = useState([])
    const [selectedEl, setSelectedEl] = useState([]);
    const [toIdentify, setToIdentify] = useState(false)



    useEffect(() => {
        setFoundElements(response.founded_elements)
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
        setSelectedEl(selectedEl.filter(el => el !== value))
    }


    return (
        <form autoComplete="off">
            <CardHeader
                title="Check inside database"
                subheader="Check explanation..."
            />
            <CardContent>

                <Box sx={{ my: 2 }}>
                    <p>Found in the taxonomy</p>
                    <FormCheck foundElements={foundElements} />
                </Box>

            </CardContent>
            <CardActions>

            </CardActions>
        </ form>
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


{/* */ }

{/* <Box sx={{ my: 4, mx: 5 }}>
    <Typography variant="body1">Identify .... </Typography>
    {selectedEl.map((el, i) => {
        return (
            <IdentifyEl el={el} />
        );
    })}
</Box> */}



export default VerifySubmit
