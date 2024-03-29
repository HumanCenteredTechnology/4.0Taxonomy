import React, { useEffect, useState } from "react";
import { Skeleton, Box, Button, Collapse, Grid, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Paper, Typography } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import { Divider } from "@material-ui/core";

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

const InfoSnippet = ({snippetType, InfoSnippet, article, loading}) => {
/* InfoSnippet: From back-end, is related to user research */

/* Pallino */
const shot = (<Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>•</Box>);

return (
    <Box sx={{  
                marginTop:"1.5em",
                overflowY:'hidden',
                border: '1px solid grey',
                borderTopLeftRadius: '16px',
                paddingX: "0.5em",
                paddingY: "0.3em", 
                bgcolor: "white",
                display:{xs:"none", sm:"block"}
            }}>
    {loading ? <SnippetSkeleton/> :
        <>
        {/* Snippet di Info nella pagina con l'intero resultset degli articoli: 'ResultPage' */}    
        {snippetType == "Info" &&
            <Box>
                <Grid container spacing={1} direction="row">
                    <Grid item><CollectionsBookmarkIcon fontSize="small"></CollectionsBookmarkIcon></Grid>
                    <Grid item><Typography variant='body1'><b>{InfoSnippet.snippet_title !== undefined ? InfoSnippet.snippet_title : "notitle"}</b></Typography></Grid>
                </Grid>
                {/* NOW AS LINK BUT SHOULD BE A TYPOGRAPHY! */}
                <Box paddingY={"1em"}><Link  target="_blank" rel="noreferrer" underline="hover" href={InfoSnippet.snippet_description}><Typography variant='subtitle2' align="left">See on Wikipedia</Typography></Link></Box>
                <Divider></Divider>
                {/* Industry and Technology Keys - NOT AVAILABLE! */}
                {/* { !(InfoSnippet.related_topics.needs == "") ?
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
                } */}
                <Divider></Divider>
                {/* Topics Hierarchy */}
                <Grid container spacing={1} justifyContent="left" paddingLeft={'0.1em'}>
                    <Grid item><DeviceHubIcon fontSize="medium"></DeviceHubIcon></Grid>
                    <Grid item><Typography variant='subtitle2'><b>Topic's Area</b></Typography></Grid>
                </Grid>
                <HierarchyList InfoSnippet={InfoSnippet}></HierarchyList>
            </Box>
        }
        

        {/* Snippet delle Keywords nella pagina del singolo risultato (articolo) 'SingleResultPage' con TopicList*/}
        {snippetType == "Keywords" &&
            <Box>
                {(article.tax_keywords.needs == "" && article.tax_keywords.tech == "") ? 
                    <Typography variant="text">No Keywords for this article</Typography>
                    :
                    <>
                    <Grid container spacing={1} direction="row">
                        <Grid item xs={12} sm={2}><BookmarksIcon fontSize="medium"></BookmarksIcon></Grid>
                        <Grid item xs={12} sm={10}><Typography variant='h6'>Keywords</Typography></Grid>
                    </Grid>
                    <Divider></Divider>
                    {/* Industry and Technology Keys */}
                    { !(article.tax_keywords.needs == "") ?
                        <Box marginY={'1em'} padding={1}>
                            <Grid container spacing={1} direction="row">
                                <Grid item><EngineeringSharp fontSize="medium" style={{color: "#29bf40"}}/></Grid>
                                <Grid item><Typography style={{color: "#29bf40"}} variant="subtitle1">Industry keys</Typography></Grid>
                            </Grid>
                            <TopicsList results={article.tax_keywords.needs} category={Object.keys(article.tax_keywords)[0]} ></TopicsList>
                        </Box>
                    : <></>
                    }
                    { !(article.tax_keywords.tech == "") ?
                        <Box marginY={"1em"} padding={1}>
                            <Grid container spacing={1} direction="row">
                                <Grid item><PrecisionManufacturingSharp fontSize="medium" style={{color: '#395bdf'}}></PrecisionManufacturingSharp></Grid>
                                <Grid item><Typography style={{color: '#395bdf'}} variant="subtitle1">Technology keys</Typography></Grid>
                            </Grid>
                            <TopicsList results={article.tax_keywords.tech} category={Object.keys(article.tax_keywords)[1]}></TopicsList>
                        </Box>
                    : <></>
                    }
                    </>
                }
            </Box>
        }  
        </>     
    }
    </Box>
)
}

const hierachy = (<Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>∟</Box>);

const CustomList = styled(List)(({ theme }) => ({
    width: 260,
  }));

const HierarchyList = ({InfoSnippet}) => (
    <CustomList dense>
        {InfoSnippet.parent_topic === " " ?
            <ListItem>
                <RemoveTwoToneIcon fontSize="small"/> <Typography variant="subtitle2"><b>{InfoSnippet.snippet_title}</b></Typography>
            </ListItem>
            :
            <>
            <ListItem>
                <RemoveTwoToneIcon fontSize="small"/> <Typography variant="subtitle2">{InfoSnippet.parent_topic}</Typography>       
            </ListItem>
        <List dense component="div" disablePadding={true}>
            <ListItem sx={{ paddingLeft: 2}} style={{marginLeft:"1em"}}>
            <RemoveTwoToneIcon fontSize="small"/><Typography variant="subtitle2"><b>{InfoSnippet.snippet_title}</b></Typography>                      
            </ListItem>
             <List dense component="div" disablePadding={true} style={{marginLeft:"2.2em"}}>
                {!InfoSnippet.children_topics === undefined && 
                    InfoSnippet.children_topics.map((el, index) => {
                            return (
                            <ListItem sx={{ pl: 2 }}>
                                <FiberManualRecordIcon fontSize="small" /><Typography variant="subtitle2">{el}</Typography>
                            </ListItem>    
                            );
                })}
            </List> 
        </List>
        </>
        } 
    </CustomList>
)

/*  */

const SnippetSkeleton = ()=>(
    <Box>
        <Grid container spacing={1} direction="row">
            <Grid item><CollectionsBookmarkIcon fontSize="small"></CollectionsBookmarkIcon></Grid>
            <Grid item><Typography variant='body1'> <Skeleton animation="wave" variant="text" width={"12em"}/></Typography></Grid>
        </Grid>
                {/* NOW AS LINK BUT SHOULD BE A TYPOGRAPHY! */}
                <Box paddingY={"1em"}>
                    {Array.from(Array(3)).map((el, i) => {
                        return (
                        <Typography key={i} variant="body2" noWrap >
                        <Skeleton animation="wave" variant="text" width={`${Math.floor(Math.random() * (8 - 4 + 1)) + 4}0%`} />
                        </Typography>
                        );
                    })}
                </Box>
                <Divider></Divider>
                {/* Industry and Technology Keys - NOT AVAILABLE! */}
                {/* { !(InfoSnippet.related_topics.needs == "") ?
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
                } */}
                
            </Box>
)

export default InfoSnippet;