import React, { useState, useEffect } from "react"; 
import { useParams } from 'react-router-dom';
import { useResult } from "../../hooks/useResult";
import useMediaQuery from '@mui/material/useMediaQuery';

import {Box, Container, Divider} from "@material-ui/core";
import TopNavBar from "../TopNavBar";
import InfoSnippet from "../InfoSnippet";
import InfoArticleAbstract from "../InfoArticleAbstract";
import BrowsableTree from "../BrowsableTree";

// 10/08/2022 inserimento variabile test letta da JSON 
import jsonEx from "../../SERP results example.json"
import { Title } from "@mui/icons-material";
import { Drawer, Grid } from "@mui/material";
import InfoArticle from "../InfoArticle";
import { useTheme } from "@mui/material/styles";

const SingleResult = () => {
    const theme = useTheme()
    const { articleId } = useParams();
    const { article } = useResult(articleId)
    const [displayArticle, setDisplayArticle] = useState(article)

    const [openDrawer, setOpenDrawer] = useState(false);
    const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(()=>{
        setDisplayArticle(article)
        console.log(displayArticle)
    }, [article])

    /* Quando il back-end sarà ultimato è qui che devo reperire le informazioni del singolo articolo, con un Id + titolo (anche solo Id)*/
    
    //const [article] = jsonEx.result_list.filter(el => el.title === articleTitleId && el.id === articleId)
    
 
    return (
        <Box>
            <TopNavBar isResults={true} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
            <Drawer
                sx={{
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box', width: 300
                },
                }}
                anchor="left"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}>
                <BrowsableTree isDrawer={true} setOpenDrawer={setOpenDrawer} />
            </Drawer>
            <Box sx={{ marginY: 1 }}><Divider margin={5} variant="left"></Divider></Box>
            <Box sx={{backgroundColor: '#f5f5f5'}}>
                <Container>
                    <Grid container spacing={0.5}>
                        <Grid item xs={12} sm={8}>
                            <Container><InfoArticle article={article}></InfoArticle></Container>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box sx={{border:'0px solid grey'}}></Box>  {/* Eventually ShortInfoSnippet (Reads, citations, ecc)*/}
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            {isSmallDevice 
                            ? <InfoArticleAbstract article={article}></InfoArticleAbstract>
                            : <Container><InfoArticleAbstract article={article}></InfoArticleAbstract></Container>
                            }
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <InfoSnippet  snippetType={'Keywords'} article={article}></InfoSnippet>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}

export default SingleResult;