import React, { useState, useEffect, useContext } from 'react'
import { useForm } from '../../hooks/useForm';
import { FormContext } from '../3 - FormPage';
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



const VerifySubmit = () => {
    //const classes = useStyles();
    const { handleChange, convertToEventParams } = useForm();
    const { foundEl, setFoundEl } = useContext(FormContext);
    const [selectedEl, setSelectedEl] = useState([]);
    const [isEl, setIsEl] = useState(false);

    useEffect(() => {
        console.log(foundEl)
    })

    const renderForm = (el) => {
        console.log(el)
        return (
            <FormControlLabel name={Object.entries(el)[0]} label={Object.entries(el)[0]} onChange={handleChange} control={<Checkbox />} />
        )

    }

    return (
        <>
            <CardHeader
                title="Check inside database"
                subheader="Check explanation..."
            />
            <CardContent>
                <Box sx={{ my: 2 }}>
                    <p>Found in the taxonomy</p>
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
                                {/* {foundEl.needs.map(el => renderForm(el))} */}
                            </FormGroup>
                            <FormLabel>Technologies</FormLabel>
                            <FormGroup>
                                {foundEl.tech.map(el => renderForm(el))}
                            </FormGroup>
                        </ FormControl>
                    </Box>

                </Box>
            </CardContent>
            <CardActions>
            </CardActions>
        </>
    )
}









export default VerifySubmit
