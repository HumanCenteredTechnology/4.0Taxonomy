import React, { useState } from 'react'
import { Paper, Autocomplete, TextField, Grid, Box } from '@mui/material'
import TopicChip from '../TopicChip'
import StandardButton from '../controls/StandardButton'


const entities = {
    "verified_entities":
        [
            ["Smart warehouse", "Supply Chain", "Problems", ["Link to Article", "Link to Article"]],
            ["Tableau", "Advanced reporting and self-service business intelligence tools", "Technology", ["Link to Article ", "Link To Article"]],
            ["Smart warehouse", "Supply Chain", "Problems", ["Link to Article", "Link to Article"]],
            ["Tableau", "Advanced reporting and self-service business intelligence tools", "Technology", ["Link to Article ", "Link To Article"]]

        ],
    "unverified_entities":
        [
            ["Computer", "Supply Chain", "Problems", ["Link to Article", "Link to Article"]],
            ["Tableau", "Advanced reporting and self-service business intelligence tools", "Technology", ["Link to Article ", "Link To Article"]]
        ]
}
const VerifySubmit = () => {
    const [vEnt, setVEnt] = useState(entities.verified_entities)
    const [unvEnt, setUnvEnt] = useState(entities.unverified_entities)

    return (
        <Box sx={{
            p: 4,
            m: 5,
        }}>
            <p>Found in the taxonomy</p>
            <Box sx={{ my: 2 }}>
                <Grid container
                    columnSpacing={{ xs: 1, md: 0 }}
                    rowSpacing={{ xs: 2, md: 2 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                    justifyContent="flex-start"
                    direction="row">
                    {entities.verified_entities.map((vE, index) => {
                        return (
                            <Grid item key={index} >
                                <TopicChip
                                    label={vE[0]}
                                    name={vE[2]}
                                    clickable={false}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
            <Box sx={{ my: 4 }}>
                <p>Not found in the taxonomy (click to add)</p>
                <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={unvEnt}
                    getOptionLabel={(option) => option[0]}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label=""
                            placeholder="Click to add"
                        />
                    )}
                />
            </Box>

            <StandardButton
                text="Confirm"
            />

        </ Box>
    )
}

export default VerifySubmit
