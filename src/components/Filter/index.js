import React, {useState, useEffect} from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';

import { Box, Grid, Paper, Collapse, Button, Chip, Typography, Divider } from "@mui/material";
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';



import CheckboxList from "../CheckboxList";
import { getYearPickerUtilityClass, YearPicker } from "@mui/lab";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { array } from "prop-types";

const Filter = ({filterNeedList, filterTechList, filters, fetchedResults, onSelectNeeds, onSelectTech, onSelectDate, onSelectSourceType, dates}) =>{
    const theme = useTheme()
    const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'));
    const [openIconNeed, setOpenIconNeed] = useState(true);
    const [openIconTech, setOpenIconTech] = useState(true);
    const [openIconDate, setOpenIconDate] = useState(true);
    const [openIconArticleType, setOpenIconArticleType] = useState(true);
    
    const [openFilter, setOpenFilter] = useState(true);

    useEffect(() => {
        if (isSmallDevice) {
            setOpenFilter(false);
        } else {
            setOpenFilter(true);
        }
    }, [isSmallDevice])  


    const [openFilterNeeds, setOpenFilterNeeds] = useState(true);
    const [openFilterTech, setOpenFilterTech] = useState(true);
    const [openFilterPubblicationDate, setOpenFilterPubblicationDate] = useState(true);
    const [openFilterArticleType, setOpenFilterArticleType] = useState(true);
    const [checkedNeeds, setCheckedNeeds] = useState([]);
    const [checkedTech, setCheckedTech] = useState([]);

    const [clearChecked, setClearChecked] = useState(false);




    //const year = new Date().getFullYear()
    //const filterPubblicationDateList = [year, year-1, year-2, "Prec " + (year -3).toString()]
    const filterArticleType = ["Academia", "Industry"]

    const checkedCleared = (checked) =>{
        if (checked.length == 0)
        setClearChecked(false)
    }
   
    useEffect (()=>{
        
    },[dates])

    const handleFilterClick = () => {
        if(openFilter==true) setOpenFilter(false)
        else setOpenFilter(true) 
    }

    /* Handle Filter Need */
    const handleFilterNeedsClick = () => {
        setOpenIconNeed(!openIconNeed);
        if(openFilterNeeds==true) setOpenFilterNeeds(false)
        else setOpenFilterNeeds(true)
    }

    /* Handle Filter Tech */
    const handleFilterTechClick = () => {
        setOpenIconTech(!openIconTech);
        if(openFilterTech==true) setOpenFilterTech(false)
        else setOpenFilterTech(true)
    }

    /* Handle Filter Pubblication Date */
    const handleFilterPubblicationDate = () => {
        setOpenIconDate(!openIconDate);
        if(openFilterPubblicationDate==true) setOpenFilterPubblicationDate(false)
        else setOpenFilterPubblicationDate(true)
    }

     /* Handle Filter Article Type */
    const handleFilterArticleType = () =>{
        setOpenIconArticleType(!openIconArticleType);
        if(openFilterArticleType==true) setOpenFilterArticleType(false)
        else setOpenFilterArticleType(true)
    }


  
    const marginVerticalY =  ((!isSmallDevice) ? "1.5em" : "0em")

    return (
        <Box paddingY={0.5}
            sx={{ overflowY:'hidden',
                  border: '1px solid grey',
                  borderTopRightRadius: '16px',
                  my: marginVerticalY }}>
                {/* Parte dei chip selezionati (compaiono in alto) */}
            { (isSmallDevice) ?
                <Box paddingLeft={0.5}><Button color="inherit" onClick={handleFilterClick}><FilterListRoundedIcon /><b>Filter in Research</b></Button></Box>
                :
                <Box paddingLeft={0.5}>
                    <Grid container spacing={1} direction="row" pa>
                        <Grid item><FilterListRoundedIcon fontSize="small"></FilterListRoundedIcon></Grid>
                        <Grid item><Typography variant='subtitle2'><b>Filter in Research</b></Typography></Grid>
                    </Grid>
                </Box>
            }
             <Button variant="text" onClick={()=>setClearChecked(true)}>Clear Filters</Button>
            <Divider variant="middle"></Divider>
            <Collapse in={openFilter}>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12}>
                        {/* Filter Need */}
                        <Box paddingX={"0.5em"}>
                            <Button variant="text" size="small" style={{color:"#000000"}} 
                                endIcon={openIconNeed ? <KeyboardArrowDownOutlinedIcon/> : <KeyboardArrowRightOutlinedIcon/>} 
                                onClick={handleFilterNeedsClick} >Need   <b>({Object.keys(filterNeedList).length})</b>
                            </Button>
                        </Box>
                        <Collapse in={openFilterNeeds}>
                            <Paper elevation={0} sx={{minHeight:"fit-content", maxHeight:1000, overflow:"auto"}}>
                                <CheckboxList itemList={filterNeedList} filterCategory={"needs"} 
                                fetchedResults={fetchedResults} setSelected={onSelectNeeds} clearChecked={clearChecked} checkedCleared={checkedCleared}></CheckboxList>
                            </Paper>
                        </Collapse>
                        {/* Filter Tech */}
                        <Box paddingX={"0.5em"}>
                            <Button variant="text" size="small" style={{color:"#000000", backgroundColor:"inherit"}} 
                                endIcon={openIconTech ? <KeyboardArrowDownOutlinedIcon/> : <KeyboardArrowRightOutlinedIcon/>} 
                                onClick={handleFilterTechClick} >Technology <b>({Object.keys(filterTechList).length})</b>
                            </Button>
                        </Box>
                        <Collapse in={openFilterTech}>
                            <Paper elevation={0} sx={{minHeight:"fit-content", maxHeight:2000, overflow:"auto"}}>
                                <CheckboxList itemList={filterTechList} filterCategory={"tech"} 
                                fetchedResults={fetchedResults} setSelected={onSelectTech} clearChecked={clearChecked} checkedCleared={checkedCleared}></CheckboxList>
                            </Paper>
                        </Collapse>
                        {/* Filter Year */}
                        <Box paddingX={"0.5em"}>
                            <Button variant="text" size="small" style={{color:"#000000", backgroundColor:"inherit"}} 
                                endIcon={openIconDate ? <KeyboardArrowDownOutlinedIcon/> : <KeyboardArrowRightOutlinedIcon/>} 
                                onClick={handleFilterPubblicationDate} >Date <b>({Object.keys(dates).length})</b> 
                            </Button>
                        </Box>
                        <Collapse in={openFilterPubblicationDate}>
                            <Paper elevation={0} sx={{minHeight:"fit-content", maxHeight:1500, overflow:"auto"}}>
                                <CheckboxList itemList={Object.keys(dates).sort((a, b) => b - a)} filterCategory={"publishing_date"}
                                 fetchedResults={fetchedResults} setSelected={onSelectDate} clearChecked={clearChecked} checkedCleared={checkedCleared}></CheckboxList>
                            </Paper>
                        </Collapse>
                        {/* Filter Article Type */}
                        <Box paddingX={"0.5em"}>
                            <Button variant="text" size="small" style={{color:"#000000", backgroundColor:"inherit"}} 
                                endIcon={openIconArticleType ? <KeyboardArrowDownOutlinedIcon/> : <KeyboardArrowRightOutlinedIcon/>} 
                                onClick={handleFilterArticleType} >Article Type <b>({filterArticleType.length})</b>
                            </Button>
                        </Box>
                        <Collapse in={openFilterArticleType}>
                            <Paper elevation={0} sx={{minHeight:"fit-content", maxHeight:1500, overflow:"auto"}}>
                                <CheckboxList itemList={filterArticleType} filterCategory={"source_type"}
                                 fetchedResults={fetchedResults} setSelected={onSelectSourceType} clearChecked={clearChecked} checkedCleared={checkedCleared}></CheckboxList>
                            </Paper>
                        </Collapse>
                    </Grid>
                </Grid>
            </Collapse>
        </Box>
    )
}

export default Filter;