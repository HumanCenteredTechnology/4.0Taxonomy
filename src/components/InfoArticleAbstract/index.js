import React, { useState, useEffect } from "react";
import {Box, Button, Card, Container, Divider, Grid, Link, Paper, Typography} from "@material-ui/core";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const InfoArticleAbstract = ({ article }) => {

    const [articleSourceType, setArticleSourceType] = useState('Other');

    /* Arrow to the article */
    const arrow = (<Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(1.2)' }}>»</Box>);
    
    return (
        <>
            {/* Articolo standard con Link e Abstract : Academy Article*/}           
            {((article.source_type == 'Conference paper' || article.source_type == 'Journal paper')) ?
            (
                <Card sx={{border:'2px solid'}}>
                    <Box sx={{padding: '0.5em', backgroundColor: '#dedede', paddingTop:'0.8em'}}><Typography variant="h5" gutterBottom>Overview</Typography></Box>
                    <Button variant="outlined" size="small" style={{padding: "0.3em", margin: "1em 1em 0em 1em",}}>Abstract</Button>
                    <Box sx={{border:'2px solid grey', borderRadius:'0.5em', padding:'0.5em', my: '1em', mx: '1em', }}>
                        <Typography variant="subtitle1">
                            {article.abstract}
                        </Typography>
                    </Box>
                    <Box sx={{padding: '1em', paddingTop:'1em'}}>
                        <Grid container>
                            <Grid item xs={12} sm={8}><></></Grid>
                            <Grid item xs={12} sm={4}>
                                <Box><Link href={article.url}><Typography variant="h6">Link to the Article <span>{arrow}</span> </Typography></Link></Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            )
            :
                /* Articolo Industriale con il Link all'Industria */
                <Card sx={{border:'2px solid'}}>
                    <Box sx={{padding: '0.5em', backgroundColor: '#dedede', paddingTop:'0.8em'}}><Typography variant="h5" gutterBottom>Overview</Typography></Box>
                    <Divider></Divider>

                    <Button variant="outlined" size="small" style={{padding: "0.3em", margin: "1em 1em 0em 1em"}}>Abstract</Button>
                    <Box sx={{border:'2px solid grey', borderRadius:'0.5em', padding:'0.5em', my: '1em', mx: '1em', }}>
                        <Typography variant="subtitle1">
                            {article.abstract}
                        </Typography>
                    </Box>
                    <Box sx={{padding: '1em', paddingTop:'1em'}}>
                        <Grid container>
                            <Grid item xs={12} sm={8}><></></Grid>
                            <Grid item xs={12} sm={4}>
                                <Box><Link href={article.url}><Typography variant="h6">Link to the Article <span>{arrow}</span> </Typography></Link></Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            }
        </>
    );
  };

  export default InfoArticleAbstract;