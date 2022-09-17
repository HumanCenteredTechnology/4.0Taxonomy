import React, { useEffect, useState } from "react";
import { Box, Button, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Paper } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import { Divider, Grid, Typography } from "@material-ui/core";

import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import RemoveTwoToneIcon from '@mui/icons-material/RemoveTwoTone';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { PrecisionManufacturingSharp, EngineeringSharp }  from '@mui/icons-material';

import TopicsList from "../TopicsList";
import { ExpandLess, ExpandMore, MailRounded, StarBorder } from "@mui/icons-material";
import { fontSize } from "@mui/system";

const InfoSnippet = ({snippetType, InfoSnippet, article}) => {
/* InfoSnippet: From back-end, is related to user research */

/* Pallino */
const shot = (<Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>•</Box>);

return (
    <Box flex={1} paddingY={0.5}
        sx={{   overflowY:'hidden',
                border: '1px solid grey',
                borderTopLeftRadius: '15px',
                margin: "auto",
                paddingX: "0.5em",
                bgcolor: "white",
                display:{xs:"none", sm:"block"}
            }}>

        {/* Snippet di Info nella pagina con l'intero resultset degli articoli: 'ResultPage' */}    
        {snippetType == "Info" &&
            <Box>
                <Grid container spacing={1} direction="row">
                    <Grid item><CollectionsBookmarkIcon fontSize="small"></CollectionsBookmarkIcon></Grid>
                    <Grid item><Typography variant='subtitle2'><b>{InfoSnippet.snippet_title}</b></Typography></Grid>
                </Grid>
                <Divider></Divider>
                <Box paddingY={"1rem"}><Typography variant='subtitle2' align="left">{InfoSnippet.snippet_description}</Typography></Box>
                <Divider></Divider>
                {/* Industry and Technology Keys */}
                { !(InfoSnippet.related_topics.needs == "") ?
                    <Box marginY={"1em"}>
                        <Grid container spacing={1} direction="row" >
                            <Grid item><EngineeringSharp fontSize="medium" style={{color: "#29bf40"}}/></Grid>
                            <Grid item><Typography style={{color: "#29bf40"}} variant="subtitle1">Industry keys</Typography></Grid>
                        </Grid>
                        <TopicsList results={InfoSnippet.related_topics.needs} category={Object.keys(InfoSnippet.related_topics)[0]} ></TopicsList>
                    </Box>    
                    : <></>
                }    
                { !(InfoSnippet.related_topics.tech == "") ?    
                    <Box marginY={"1em"}>    
                        <Grid container spacing={1} direction="row">
                            <Grid item><PrecisionManufacturingSharp fontSize="medium" style={{color: '#395bdf'}}></PrecisionManufacturingSharp></Grid>
                            <Grid item><Typography style={{color: '#395bdf'}} variant="subtitle1">Technology keys</Typography></Grid>
                        </Grid>
                        <TopicsList results={InfoSnippet.related_topics.tech} category={Object.keys(InfoSnippet.related_topics)[1]}></TopicsList>
                    </Box>
                    : <></>
                }
                <Divider></Divider>
                {/* Topics Hierarchy */}
                <Grid container spacing={1} justifyContent="left" marginLeft="3px">
                    <Grid item><DeviceHubIcon fontSize="medium"></DeviceHubIcon></Grid>
                    <Grid item><Typography variant='subtitle1'>Topics Hierarchy</Typography></Grid>
                </Grid>
                <HierarchyList InfoSnippet={InfoSnippet}></HierarchyList>
            </Box>
        }

        {/* Snippet delle Keywords nella pagina del singolo risultato (articolo) 'SingleResultPage' con TopicList*/}
        {snippetType == "Keywords" &&
            <Box>
                <Grid container spacing={1} direction="row">
                    <Grid item xs={12} sm={2}><BookmarksIcon fontSize="medium"></BookmarksIcon></Grid>
                    <Grid item xs={12} sm={10}><Typography variant='h5'>Keywords</Typography></Grid>
                </Grid>
                <Divider></Divider>

                <Box marginTop={'1em'}>
                    <Grid container spacing={1} direction="row">
                        <Grid item><EngineeringSharp fontSize="medium" style={{color: "#29bf40"}}/></Grid>
                        <Grid item><Typography style={{color: "#29bf40"}} variant="subtitle1">Industry keys</Typography></Grid>
                    </Grid>
                    <TopicsList results={article.tax_keywords.needs} category={Object.keys(article.tax_keywords)[0]} ></TopicsList>
                    <Grid container spacing={1} direction="row">
                        <Grid item><PrecisionManufacturingSharp fontSize="medium" style={{color: '#395bdf'}}></PrecisionManufacturingSharp></Grid>
                        <Grid item><Typography style={{color: '#395bdf'}} variant="subtitle1">Technology keys</Typography></Grid>
                    </Grid>
                    <TopicsList results={article.tax_keywords.tech} category={Object.keys(article.tax_keywords)[1]}></TopicsList>
                </Box>
            </Box>
        }       

    </Box>
)
}

const hierachy = (<Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>∟</Box>);

const CustomList = styled(List)(({ theme }) => ({
    width: 260,
  }));

const HierarchyList = ({InfoSnippet}) => (
    <CustomList>
        <ListItemButton>
        <RemoveTwoToneIcon fontSize="small"/> <Typography variant="subtitle2">{InfoSnippet.parent_topic}</Typography>
            
        </ListItemButton>
        <List component="div" disablePadding={true}>
            <ListItemButton sx={{ paddingLeft: 5}} style={{marginLeft:"1em"}}>
            <RemoveTwoToneIcon fontSize="small"/><Typography variant="subtitle2">{InfoSnippet.snippet_title}</Typography>                      
            </ListItemButton>
            <List component="div" disablePadding={true} style={{marginLeft:"2em"}}>
                {InfoSnippet.children_topics.map((el, index) => {
                            return (
                            <ListItemButton sx={{ pl: 5 }}>
                                <FiberManualRecordIcon fontSize="small" /><Typography variant="subtitle2">{el}</Typography>
                            </ListItemButton>    
                            );
                })}
            </List>
        </List>
    </CustomList>
)

export default InfoSnippet;