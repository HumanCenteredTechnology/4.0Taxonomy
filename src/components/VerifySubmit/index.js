import React, { useState, useEffect } from 'react'
import { Paper, Autocomplete, TextField, Grid, Box, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import TopicChip from '../TopicChip'
import StandardButton from '../controls/StandardButton'

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


const VerifySubmit = ({ response, handleClose }) => {
    const [state, setState] = useState();

    const [foundElements, setFoundElements] = useState(initialResponse.founded_elements)
    const [notFoundElements, setNotFoundElements] = useState(initialResponse.not_founded_elements)


    useEffect(() => {
        setFoundElements(response.founded_elements)
        setNotFoundElements(response.not_founded_elements)

    }, [response])
    //qui prende i valori dall'autocomplete e li mette nello stato
    const handleChange = (e, val) => {
        setState(val)
        console.log(state)

    }
    return (
        <>
            <DialogTitle>Confirm submission</DialogTitle>
            <DialogContent>
                <p>Found in the taxonomy</p>
                <Box sx={{ my: 2 }}>
                    <Grid container
                        columnSpacing={{ xs: 0.5, md: 0 }}
                        rowSpacing={{ xs: 1, md: 1 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                        justifyContent="flex-start"
                        direction="row">
                        {foundElements.map((fEl, index) => {
                            return (
                                <Grid item key={index} >
                                    <TopicChip
                                        label={fEl[0]}
                                        name={fEl[1]}
                                        clickable={false}
                                        size="small"
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
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <StandardButton
                    text="Cancel"
                    color="default"
                    onClick={() => { handleClose() }}
                />
                <StandardButton
                    text="Confirm"
                />

            </DialogActions>

        </>
    )
}

export default VerifySubmit
