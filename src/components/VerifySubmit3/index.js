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


const VerifySubmit3 = () => {



    return (
        <form autoComplete="off">
            <CardHeader
                title="Check inside database"
                subheader="Check explanation..."
            />
            <CardContent>

                <Box sx={{ my: 2 }}>
                    <p>Found in the taxonomy</p>

                </Box>

            </CardContent>
            <CardActions>

            </CardActions>
        </ form>
    )
}

export default VerifySubmit3;