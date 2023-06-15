import React, { useState, useEffect } from "react";

import { Container, Box, Grid, Typography, Button, } from "@material-ui/core";
//import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { BorderAll } from "@mui/icons-material";

const InfoArticle = ({article}) => {

    /* Pallino di separazione tra gli Authors */
    const shot = (<Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>•</Box>);

    return(
        <Box>
            {/* Tipo articolo, Journal di publicazione, Titolo */}
            <Grid container spacing={0.5} alignContent="center">
                <Grid item> 
                    <Box marginRight={1}>
                        <Typography style={{ backgroundColor: "#30dbd0", padding: "2px 3px", fontfamily:"Arial", fontSize: "12px", }}>
                            {article.source_type!== null ? article.source_type : "Industry"}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item><Typography variant="body2">{article.publishing_date !== null ? article.publishing_date : null}</Typography></Grid>
                {article.journal!== null ? <>
                    <Grid item><Typography variant="body2">{shot}</Typography></Grid>
                    <Grid item><Typography variant="body2">{article.journal}</Typography></Grid></>
                    : <></>}
            </Grid>
            <Box sx={{marginTop: "1em", marginBottom:"1em"}}>
                <Typography  variant="h5" color="textPrimary" >{article.title}</Typography>
            </Box>

            {/* Lista degli autori */}
            <Box>
                <Box component="span" sx={{ display: 'inline-block', mx: '2px', fontSize: "0.9em"}}>Authors:</Box>
                { Array.isArray(article.authors) ?
                article.authors.map((el, index) => {
                    return(<>
                        <Button variant="text" size="small" startIcon={<AccountCircleIcon />} style={{padding: "0px 0px", margin: "3px 4px", pointerEvents:"none"}}>
                        {el}
                        </Button>{index<article.authors.length-1 ? <>{shot}</> : <></>}
                    </>); })
                : "Not available"
                }
            </Box>    

            <Typography variant="body2">{article.doi != null ? <>DOI:{article.doi}</> : null}</Typography>
        </Box>
    );
}

export default InfoArticle;