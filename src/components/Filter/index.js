import React, {useState, useEffect} from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Grid, Paper, Collapse, Button, Chip, Typography, Divider } from "@mui/material";

import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';

import CheckBoxTree from "../CheckBoxTree";
import CheckboxList from "../CheckboxList";
import TopicChip from "../TopicChip";
import { getYearPickerUtilityClass, YearPicker } from "@mui/lab";
import { faL } from "@fortawesome/free-solid-svg-icons";

const Filter = ({filterNeedList, filterTechList}) =>{
    const theme = useTheme()
    const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'));
    
    const [openFilter, setOpenFilter] = useState(() => {
        if (isSmallDevice) {
          return false;
        }
        return true;
      });

    /* const [openFilter, setOpenFilter] = useState(true); */
    const [openFilterNeeds, setOpenFilterNeeds] = useState(true);
    const [openFilterTech, setOpenFilterTech] = useState(true);
    const [openFilterPubblicationDate, setOpenFilterPubblicationDate] = useState(true);
    const [openFilterArticleType, setOpenFilterArticleType] = useState(true);
    const [checkedNeeds, setCheckedNeeds] = useState([]);
    const [checkedTech, setCheckedTech] = useState([]);
    const [filtered, setFiltered] = useState({needs: [], tech: []});

    const year = new Date().getFullYear()
    const filterPubblicationDateList = [year, year-1, year-2, "Prec " + (year -3).toString()]
    const filterArticleType = ["Accademic", "Industry"]
   
    const handleFilterClick = () => {
        if(openFilter==true) setOpenFilter(false)
        else setOpenFilter(true) 
    }

    /* Handle Filter Need */
    const handleFilterNeedsClick = () => {
        if(openFilterNeeds==true) setOpenFilterNeeds(false)
        else setOpenFilterNeeds(true)
    }

    /* Handle Filter Tech */
    const handleFilterTechClick = () => {
        if(openFilterTech==true) setOpenFilterTech(false)
        else setOpenFilterTech(true)
    }

    /* Handle Filter Pubblication Date */
    const handleFilterPubblicationDate = () => {
        if(openFilterPubblicationDate==true) setOpenFilterPubblicationDate(false)
        else setOpenFilterPubblicationDate(true)
    }

     /* Handle Filter Article Type */
    const handleFilterArticleType = () =>{
        if(openFilterArticleType==true) setOpenFilterArticleType(false)
        else setOpenFilterArticleType(true)
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
        <Box sx={{ overflowY:'hidden',
                   border: '1px solid grey',
                   borderTopRightRadius: '15px',
                   borderLeft: '0px',
                   margin: "auto",
                   my: 4}}>
            <Grid container spacing={0.5}>
                {/* Parte dei chip selezionati (compaiono in alto) */}
            <Box ><Button color="inherit" onClick={handleFilterClick}><FilterListRoundedIcon /><b>Filter in Research</b></Button></Box>
            <Divider></Divider>
              {/* Versione con il CheckBoxTree: al click delle check qui compaiono i chip selezionati */}
                {filtered.needs.map((el,i)=>{
                    return (
                        <Grid item key={i}>
                            <Chip label={el} onDelete={handleDelete(el)} size="small"/>
                        </Grid>
                    )
                })}
            </Grid>

            <Collapse in={openFilter}>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12}>
                        {/* Filter Need */}
                        <Box paddingX={"0.8em"}>
                            <Button variant="text" style={{color:"#000000"}} endIcon={<ArrowDropDownIcon fontSize="small"/>} onClick={handleFilterNeedsClick} size="small">Need</Button>
                        </Box>
                        <Collapse in={openFilterNeeds}>
                            <Paper elevation={0} sx={{minHeight:"fit-content", maxHeight:1000, overflow:"auto"}}>
                                <CheckboxList itemList={filterNeedList}></CheckboxList>
                            </Paper>
                        </Collapse>
                        {/* Filter Tech */}
                        <Box paddingX={"0.8em"}>
                            <Button variant="text" style={{color:"#000000", backgroundColor:"inherit"}} endIcon={<ArrowDropDownIcon fontSize="small"/>} onClick={handleFilterTechClick} size="small">Technology</Button>
                        </Box>
                        <Collapse in={openFilterTech}>
                            <Paper elevation={0} sx={{minHeight:"fit-content", maxHeight:1500, overflow:"auto"}}>
                                <CheckboxList itemList={filterTechList}></CheckboxList>
                            </Paper>
                        </Collapse>
                        {/* Filter Year */}
                        <Box paddingX={"0.8em"}>
                            <Button variant="text" style={{color:"#000000", backgroundColor:"inherit"}} endIcon={<ArrowDropDownIcon fontSize="small"/>} onClick={handleFilterPubblicationDate} size="small">Publication Date</Button>
                        </Box>
                        <Collapse in={openFilterPubblicationDate}>
                            <Paper elevation={0} sx={{minHeight:"fit-content", maxHeight:1500, overflow:"auto"}}>
                                <CheckboxList itemList={filterPubblicationDateList}></CheckboxList>
                            </Paper>
                        </Collapse>
                        {/* Filter Article Type */}
                        <Box paddingX={"0.8em"}>
                            <Button variant="text" style={{color:"#000000", backgroundColor:"inherit"}} endIcon={<ArrowDropDownIcon fontSize="small"/>} onClick={handleFilterArticleType} size="small">Article Type</Button>
                        </Box>
                        <Collapse in={openFilterArticleType}>
                            <Paper elevation={0} sx={{minHeight:"fit-content", maxHeight:1500, overflow:"auto"}}>
                                <CheckboxList itemList={filterArticleType}></CheckboxList>
                            </Paper>
                        </Collapse>
                    </Grid>
                </Grid>
            </Collapse>
        </Box>
    )
}

export default Filter;