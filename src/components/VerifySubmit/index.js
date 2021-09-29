import React, { useState, useEffect } from 'react'
import { Paper, Autocomplete, TextField, Grid, Box } from '@mui/material'
import TopicChip from '../TopicChip'
import StandardButton from '../controls/StandardButton'

const initialResponse = {
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


const VerifySubmit = ({ response, handleClose }) => {
    const [state, setState] = useState();

    const [vEnt, setVEnt] = useState(initialResponse.verified_entities)
    const [unvEnt, setUnvEnt] = useState(initialResponse.unverified_entities)


    useEffect(() => {
        setVEnt(response.verified_entities)
        setUnvEnt(response.unverified_entities)

    }, [response])
    //qui prende i valori dall'autocomplete e li mette nello stato
    const handleChange = (e, val) => {
        setState(val)
        console.log(state)

    }
    return (
        <Paper sx={{
            p: 4,
            m: 8,
        }}>
            <p>Found in the taxonomy</p>
            <Box sx={{ my: 2 }}>
                <Grid container
                    columnSpacing={{ xs: 1, md: 0 }}
                    rowSpacing={{ xs: 2, md: 2 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                    justifyContent="flex-start"
                    direction="row">
                    {vEnt.map((vE, index) => {
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
                    onChange={handleChange}
                />
            </Box>
            <StandardButton
                text="Confirm"
            />
            <StandardButton
                text="Cancel"
                color="default"
                onClick={() => { handleClose() }}
            />
        </ Paper>
    )
}

export default VerifySubmit
