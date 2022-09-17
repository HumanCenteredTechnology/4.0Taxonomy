import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
//Components
import SearchBar from "../SearchBar";
import Result from "../Result";
import NotFound from "../NotFound";
import TopicChip from "../TopicChip";
import TopNavBar from "../TopNavBar";
import Filter from "../Filter";
import InfoSnippet from "../InfoSnippet";

//hooks
import { useFetch } from "../../hooks/useFetch";

//Style
//import "./ResultsPage.css";
import { Container, Box, Grid, } from "@material-ui/core";
import { Skeleton, IconButton, Card, Button, useScrollTrigger, Drawer, Pagination, Collapse, Stack, Typography, Divider} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from "@mui/material/styles";
import BrowsableTree from "../BrowsableTree";


// 10/08/2022 inserimento variabile test letta da JSON 
import jsonEx from "../../SERP results example.json"

const resultsTest = JSON.parse(JSON.stringify(jsonEx))

const ResultsPage = () => {
  const theme = useTheme()
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'));

  const { queryId } = useParams();
  const { results, loading, error, setSearchMention, found } = useFetch(queryId);
  
  /* 'queryResult' dovrà diventare Results quando sarà integrata con le Api */
  const [queryResults, setqueryResult] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 5
  })

  useEffect(() => {

/*     if (results.related_elements.length !== 0 || results.unrelated_elements.length !== 0) {
      if (results.related_elements[0].at(3) === "Problems") {
        setProblems(results.related_elements)
        setTechnologies(results.unrelated_elements)
      }
      if (results.related_elements[0].at(3) === "Technology") {
        setProblems(results.unrelated_elements)
        setTechnologies(results.related_elements)
      }
    } */
    setqueryResult(resultsTest)

  }, [results])

  useEffect(() => {
    setOpenDrawer(false)
  }, [queryId])


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
      <Container>
           {/* {isSmallDevice ? <></> :
            <Slide appear={false} direction="down" in={!trigger}>
              <Box sx={{ marginY: 5, alignContent: "left" }}>
                <SearchBar setSearchMention={setSearchMention} />
              </Box>
            </Slide>
          } */}
        {!error ?
          <Box sx={{marginY: "1", marginX:"10"}}>
            {loading ? <Skeleton animation="wave" variant="text" width="20em" /> :
              <Typography variant="subtiltle1">We found a total of {found ? resultsTest.result_list.length : "0"} results for "{queryId}"</Typography>  /* found ? queryResults.length : "0" */
            }
          </Box>
          :
          <></>
        }
        <Box sx={{ marginY: 2 }}><Divider></Divider></Box>
      </Container>
      <Container maxWidth={"100vw"}>
        <Box sx={{backgroundColor: '#f5f5f5'}} >
          <Grid container spacing={4}>
            <Grid item xs={12} sm={2}>
              <Filter filterNeedList={resultsTest.filter_topics.needs} filterTechList={resultsTest.filter_topics.tech}></Filter>
            </Grid>
            <Grid item xs={12} sm={7}>
              {/* {!loading ? found ? <ResultsList queryResults={resultsTest} loading={loading} /> : <NotFound error={error} /> : <ResultsList queryResults={resultsTest} loading={loading} />} */}
              <ResultsList queryResults={resultsTest} loading={loading} /> 
            </Grid>
            <Grid item xs={12} sm={3}>
              <InfoSnippet snippetType={"Info"} InfoSnippet={resultsTest.info_snippet}></InfoSnippet>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box >
  );
};

const ResultsList = ({ queryResults, loading }) => {
  return (
    <Grid container>
      <Grid item xs={12} sm={12}>
        <Box sx={{display: 'flex', p: 1, m: 1}}>
          {/* <Typography variant="subtitle1" gutterBottom color="primary"> {loading ? <Skeleton animation="wave" width="10em" /> : `Articles`} </Typography> */}
        </Box>
        {loading ? <LoadingSkeleton />
          :
          <>
            {queryResults.result_list.map((el, index) => {
              return (
                <Result key={index} elCard={el}></Result>
              );
            })}
          </>}
      </Grid>
    </Grid>
  );
};

const LoadingSkeleton = () => {
  return (
    <>
      {Array.from(Array(2)).map(() => {
        return (
          <ResultSkeleton />
        );
      })}
    </>
  )
}

const ResultSkeleton = () => (
  <Box sx={{
    justifyContent: 'center',
    p: 1,
    m: 0,
  }}>
    <Card>
      <Box sx={{
        justifyContent: 'center',
        p: 2,
        m: 0,
      }}>
        <Typography variant="body2" color="textSecondary" >
          <Skeleton animation="wave" variant="text" />
        </Typography>
        <Typography variant="h6" gutterBottom  >
          <Skeleton animation="wave" variant="text" />
        </Typography>
        <Typography variant="body2">
          <Skeleton animation="wave" variant="text" />
        </Typography>
        <Typography variant="body2">
          <Skeleton animation="wave" variant="text" width="50%" />
        </Typography>
      </Box>
      <Box sx={{ p: 2, my: 0 }}>
        <Typography variant="body1" >
          <Skeleton animation="wave" variant="text" width="20%" />
        </Typography>
        {Array.from(Array(5)).map((el, i) => {
          return (
            <Typography key={i} variant="body2" noWrap >
              <Skeleton animation="wave" variant="text" width={`${Math.floor(Math.random() * (8 - 4 + 1)) + 4}0%`} />
            </Typography>
          );
        })}
        <Skeleton animation="wave" variant="rectangular" width="20%" />
      </Box>
    </Card>
  </Box>
)

export default ResultsPage;
