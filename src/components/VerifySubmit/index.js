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

    const { values, handleCheckboxChange, convertToEventParams } = useContext(FormContext)
    const [selectedEl, setSelectedEl] = useState([]);
    const [isEl, setIsEl] = useState(false);



    const renderForm = (el, branch) => {
        //console.log(Object.values(el))

        let name = Object.keys(el);
        let value = Object.values(el)
        //console.log(name + value + branch)
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
                                {values.needs.map(el => renderForm(el, "needs"))}
                            </FormGroup>
                            <FormLabel>Technologies</FormLabel>
                            <FormGroup>
                                {values.tech.map(el => renderForm(el, "tech"))}
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
