import React from "react";

import { Box, Grid, Paper } from "@mui/material";

import CheckBoxTree from "../CheckBoxTree";

const Filter = () =>{
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={0} sx={{minHeight:200, maxHeight:200, overflow:"auto"}}>
                        <CheckBoxTree isNeeds={true}/>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={0} sx={{minHeight:200, maxHeight:200, overflow:"auto"}}>
                        <CheckBoxTree isNeeds={false}/>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
        
    )
}

export default Filter;