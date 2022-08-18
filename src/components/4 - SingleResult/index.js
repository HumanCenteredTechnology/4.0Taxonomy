import React, { useState, useEffect } from "react"; 
import { useParams } from 'react-router-dom';
import { useFetch } from "../../hooks/useFetch";

import {Box, Container, Divider} from "@material-ui/core";
import TopNavBar from "../TopNavBar";
import InfoSnippet from "../InfoSnippet";
import InfoArticleAbstract from "../InfoArticleAbstract";

// 10/08/2022 inserimento variabile test letta da JSON 
import jsonEx from "../../SERP results example.json"
import { Title } from "@mui/icons-material";
import { Grid } from "@mui/material";
import InfoArticle from "../InfoArticle";

const SingleResult = () => {
    const { articleId, articleTitleId } = useParams();

    /* Quando il back-end sarà ultimato è qui che devo reperire le informazioni del singolo articolo, con un Id + titolo (anche solo Id)*/
    const resultsTest = JSON.parse(JSON.stringify(jsonEx))
    const [article] = jsonEx.filter(el => el.title === articleTitleId && el.id === articleId)
 
    return (
        <Box>
            <TopNavBar isResults={true}  />
            <Box sx={{ marginY: 1 }}><Divider margin={5} variant="left"></Divider></Box>
            <Box sx={{backgroundColor: '#f5f5f5'}}>
                <Container>
                    <Grid container spacing={0.5}>
                        <Grid item xs={12} sm={9}>
                        <Container><InfoArticle article={article}></InfoArticle></Container>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Box sx={{border:'1px solid grey'}}>ShortInfoArticle</Box>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <InfoArticleAbstract article={article}></InfoArticleAbstract>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <InfoSnippet  snippetType={'Keywords'} article={article}></InfoSnippet>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}

export default SingleResult;