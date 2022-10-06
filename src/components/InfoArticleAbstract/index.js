import React, { useState, useEffect } from "react";
import {Box, Button, Card, Container, Divider, Grid, Link, Paper, Typography, Tooltip} from "@material-ui/core";
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';

const InfoArticleAbstract = ({ article }) => {

    const [articleSourceType, setArticleSourceType] = useState('Other');

    //da fare: cambiare la key 'url' a 'link'

    /* Arrow to the article */
    const arrow = (<Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(1.2)' }}>»</Box>);
    
    return (
        <>
            {/* Articolo standard con Link e Abstract : Academy Article*/}           
            {((article.source_type == 'Conference paper' || article.source_type == 'Journal paper')) ?
            (
                <Card sx={{border:'2px solid', marginBottom:"20px"}}>
                    <Box sx={{padding: '0.5em', backgroundColor: '#dedede', paddingTop:'0.8em'}}><Typography variant="h6" gutterBottom>Overview</Typography></Box>
                    {/* Button trasformarlo in Typography */}
                    <Typography  variant="button" style={{padding: "0.3em", margin: "2em 1em 1em 0em",}}>Abstract</Typography>
                    <Box sx={{border:'2px solid grey', borderRadius:'0.5em', padding:'0.7em', my: '1em', mx: '1em', }}>
                        { (article.abstract !== null)
                        ? <Typography variant="subtitle1" style={{fontSize:"0.9em"}}>{article.abstract}</Typography>
                        : <NoAbstract/>
                        }
                    </Box>
                    <Box sx={{padding: '1em', paddingTop:'1em'}}>
                        <Grid container>
                            <Grid item xs={12} sm={8}><></></Grid>
                            <Grid item xs={12} sm={4}>
                                <Box>
                                    <Tooltip title="Opens a new page">
                                        <Link target="_blank" rel="noreferrer" href={article.link}><Typography variant="h6">Link to the Article <span>{arrow}</span> </Typography></Link>
                                    </Tooltip>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            )
            :
                /* Articolo Industriale con il Link all'Industria */
                <Card sx={{border:'2px solid', marginBottom:"20px"}}>
                    <Box sx={{padding: '0.5em', backgroundColor: '#dedede', paddingTop:'0.8em', marginBottom: "1em"}}><Typography variant="h6" gutterBottom>Overview</Typography></Box>
                   

                    <Typography variant="button" style={{padding: "0.3em", margin: "2em 1em 1em 1em",}}>Abstract</Typography>
                    <Box sx={{border:'2px solid grey', borderRadius:'0.5em', padding:'0.5em', my: '1em', mx: '1em', }}>
                        { (article.abstract !== null)
                        ? <Typography variant="subtitle1">{article.abstract}</Typography>
                        : <NoAbstract/>
                        }
                    </Box>
                    <Box sx={{padding: '1em', paddingTop:'1em'}}>
                        <Grid container>
                            <Grid item xs={12} sm={8}><></></Grid>
                            <Grid item xs={12} sm={4}>
                                <Box>
                                    <Tooltip title="Opens a new page">
                                        <Link target="_blank" rel="noreferrer" href={article.link}><Typography variant="h6">Link to the Article <span>{arrow}</span> </Typography></Link>
                                    </Tooltip>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            }
        </>
    );
  };

  const NoAbstract = () => {
    return (
        <Box sx={{padding: '1em', backgroundColor: '#dedede', paddingTop:'1em', paddingLeft:'1em'}}>
            <FeedOutlinedIcon fontSize="large"></FeedOutlinedIcon>
            <Typography variant="h5">Abstract not available</Typography>
        </Box>
    );
  };

  export default InfoArticleAbstract;