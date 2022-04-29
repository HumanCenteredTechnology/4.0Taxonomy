import React, {useState, useEffect} from "react";

import { Box, Grid, Paper, Collapse, Button, Chip } from "@mui/material";
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from "@mui/material/styles";

import CheckBoxTree from "../CheckBoxTree";
import TopicChip from "../TopicChip";

const Filter = () =>{
    const theme = useTheme()
    const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'));
    const [openFilter, setOpenFilter] = useState(false);
    const [checkedNeeds, setCheckedNeeds] = useState([]);
    const [checkedTech, setCheckedTech] = useState([]);
    const [filtered, setFiltered] = useState({needs: [], tech: []});


    const handleFilterClick = () => {
        if(openFilter==true) setOpenFilter(false)
        else setOpenFilter(true) 
    }
    useEffect(()=>{
        setFiltered(()=>({needs:[...checkedNeeds], tech:[...checkedTech]}));
    }, [checkedNeeds, checkedTech])

    /* useEffect(()=>{
        setCheckedNeeds(filtered.needs)
        setCheckedTech(filtered.tech)
    }, [filtered.needs, filtered.tech]) */
    const handleDelete = (chipToDelete) => () => {
        setFiltered({needs:[(chips) => chips.filter((chip) => chip.label !== chipToDelete.label)]});
    }
    
    return (
        <Box sx={{  marginY: 2, marginX:2  }}>
            <Grid container spacing={0.5}>
            <Button color="inherit" onClick={handleFilterClick}><FilterListRoundedIcon />Filter</Button>
            
                {filtered.needs.map((el,i)=>{
                    return (
                        <Grid item key={i}>
                            <Chip label={el} onDelete={handleDelete(el)} />
                        </Grid>
                    )
                })}
            </Grid>
            <Collapse in={openFilter}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Paper elevation={0} sx={{minHeight:200, maxHeight:200, overflow:"auto"}}>
                            <CheckBoxTree isNeeds={true} checked={checkedNeeds} setChecked={setCheckedNeeds}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper elevation={0} sx={{minHeight:200, maxHeight:200, overflow:"auto"}}>
                            <CheckBoxTree isNeeds={false}  checked={checkedTech} setChecked={setCheckedTech}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Collapse>
        </Box>
    )
}

export default Filter;