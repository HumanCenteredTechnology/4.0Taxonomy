import React, {useState, useEffect} from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';

import { Box, Grid, Paper, Collapse, Button, Chip, Typography, Divider } from "@mui/material";
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import RemoveDoneOutlinedIcon from '@mui/icons-material/RemoveDoneOutlined';

import CheckboxList from "../CheckboxList";
import { getYearPickerUtilityClass, YearPicker } from "@mui/lab";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { array } from "prop-types";

const Filter = ({filters, fetchedResults, onSelectNeeds, onSelectTech, onSelectDate, onSelectSourceType, needs, tech, dates, sourceTypes, loading}) =>{
    const theme = useTheme()
    const isSmallDevice = useMediaQuery(theme.breakpoints.down('md'));
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

/*     useEffect(()=>{
        isSmallDevice && loading &&
            setOpenFilter(false) 
    },[loading]) */

    const [openFilterNeeds, setOpenFilterNeeds] = useState(true);
    const [openFilterTech, setOpenFilterTech] = useState(true);
    const [openFilterPubblicationDate, setOpenFilterPubblicationDate] = useState(true);
    const [openFilterArticleType, setOpenFilterArticleType] = useState(true);

    const [clearChecked, setClearChecked] = useState(false);




    //const year = new Date().getFullYear()
    //const filterPubblicationDateList = [year, year-1, year-2, "Prec " + (year -3).toString()]
    const filterArticleType = ["Academia", "Industry"]

    const checkedCleared = (checked) =>{
        if (checked.length == 0)
        setClearChecked(false)
    }
   

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
            sx={{ overflow:'hidden',
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
            
            <Divider variant="middle"></Divider>
            <Collapse in={openFilter}>
                <Button variant="text" onClick={()=>setClearChecked(true)} 
                    size="small" style={{fontFamily:"Roboto, Arial", color:"black", fontSize:"0.7rem"}} 
                    endIcon={<RemoveDoneOutlinedIcon size="small" />}>
                    Clear
                </Button>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12}>
                        {/* Filter Need */}
                        <Box paddingX={"0.5em"}>
                            <Button variant="text" size="small" style={{color:"#000000"}} 
                                endIcon={openIconNeed ? <KeyboardArrowDownOutlinedIcon/> : <KeyboardArrowRightOutlinedIcon/>} 
                                onClick={handleFilterNeedsClick} >Need   <b>({Object.keys(needs).length})</b>
                            </Button>
                        </Box>
                        <Collapse in={openFilterNeeds}>
                            <Paper elevation={0} sx={{minHeight:"fit-content", overflow:"hidden"}}>
                                <CheckboxList itemList={Object.keys(needs)} filterCategory={"needs"} 
                                fetchedResults={fetchedResults} setSelected={onSelectNeeds} clearChecked={clearChecked} checkedCleared={checkedCleared}></CheckboxList>
                            </Paper>
                        </Collapse>
                        {/* Filter Tech */}
                        <Box paddingX={"0.5em"}>
                            <Button variant="text" size="small" style={{color:"#000000", backgroundColor:"inherit"}} 
                                endIcon={openIconTech ? <KeyboardArrowDownOutlinedIcon/> : <KeyboardArrowRightOutlinedIcon/>} 
                                onClick={handleFilterTechClick} >Technology <b>({Object.keys(tech).length})</b>
                            </Button>
                        </Box>
                        <Collapse in={openFilterTech}>
                            <Paper elevation={0} sx={{minHeight:"fit-content", overflow:"hidden"}}>
                                <CheckboxList itemList={Object.keys(tech)} filterCategory={"tech"} 
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
                            <Paper elevation={0} sx={{minHeight:"fit-content", overflow:"hidden"}}>
                                <CheckboxList itemList={Object.keys(dates).sort((a, b) => b - a)} filterCategory={"publishing_date"}
                                 fetchedResults={fetchedResults} setSelected={onSelectDate} clearChecked={clearChecked} checkedCleared={checkedCleared}></CheckboxList>
                            </Paper>
                        </Collapse>
                        {/* Filter Article Type */}
                        <Box paddingX={"0.5em"}>
                            <Button variant="text" size="small" style={{color:"#000000", backgroundColor:"inherit"}} 
                                endIcon={openIconArticleType ? <KeyboardArrowDownOutlinedIcon/> : <KeyboardArrowRightOutlinedIcon/>} 
                                onClick={handleFilterArticleType} >Article Type <b>({Object.keys(sourceTypes).length})</b>
                            </Button>
                        </Box>
                        <Collapse in={openFilterArticleType}>
                            <Paper elevation={0} sx={{minHeight:"fit-content", overflow:"hidden"}}>
                                <CheckboxList itemList={Object.keys(sourceTypes)} filterCategory={"source_type"}
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