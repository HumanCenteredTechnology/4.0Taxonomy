import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { Grid, Typography } from "@material-ui/core";

import BookmarksIcon from '@mui/icons-material/Bookmarks';
import TopicsList from "../TopicsList";


const InfoSnippet = ({snippetType, article}) => {
const wiki = "Velit qui nisi nisi amet adipisicing incididunt dolor. Exercitation cupidatat veniam ut fugiat tempor quis esse sit excepteur. Cupidatat aute in ullamco minim minim Lorem officia deserunt amet labore nostrud quis esse..."

/* Pallino */
const shot = (<Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>•</Box>);

return (
    <Box flex={1} p={1} 
        sx={{   overflowY:'hidden',
                border: '1px solid grey',
                borderTopLeftRadius: '15px',
                margin: "auto",
                display:{xs:"none", sm:"block"}
            }}>

        {/* Snippet di Info nella pagina di tutti i risultati 'ResultPage' */}    
        {snippetType == "Info" &&
            <Box>
                <Grid container>
                    <Grid item xs={12} sm={3}><CollectionsBookmarkIcon fontSize="medium"></CollectionsBookmarkIcon></Grid>
                    <Grid item xs={12} sm={9}><Typography variant='h5'>Info</Typography></Grid>
                </Grid>
                {/* wiki: From back-end and is related to user research */}
                <Typography>{wiki}</Typography>
            </Box>
        }

        {/* Snippet delle Keywords nella pagina del singolo risultato (articolo) Singleresult con TopicList*/}
        {snippetType == "Keywords" &&
            <Box>
                <Grid container>
                    <Grid item xs={12} sm={3}><BookmarksIcon fontSize="medium"></BookmarksIcon></Grid>
                    <Grid item xs={12} sm={9}><Typography variant='h5'>Keywords</Typography></Grid>
                </Grid>

                <Typography style={{color: "#29bf40"}} variant="h6">{shot}Industry keys</Typography>
                <TopicsList results={article.tax_keywords.needs} category={Object.keys(article.tax_keywords)[0]} ></TopicsList>
                <Typography style={{color: '#395bdf'}} variant="h6">{shot}Technology keys</Typography>
                <TopicsList results={article.tax_keywords.tech} category={Object.keys(article.tax_keywords)[1]}></TopicsList>
            </Box>
        }       

    </Box>
)

}

export default InfoSnippet;