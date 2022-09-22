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
import { useFilter } from "../../hooks/useFilter";

//Style
//import "./ResultsPage.css";
import { Container, Box } from "@material-ui/core";
import { Skeleton, Card, useScrollTrigger, Drawer, Pagination, Collapse, Stack, Typography, Divider, Grid} from "@mui/material";
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
  //results -> fetchedResults
  const { results, fetchLoading, error, setSearchMention, found } = useFetch(queryId);
  const [ displayResults, setDisplayResults] = useState ([...resultsTest.result_list]); //fetchedResults
  const [ loading, setLoading] = useState (false);

  const {filters, filteredResults, onSelectNeeds, onSelectTech, onSelectDate, onSelectSourceType, 
          howManyNeeds, howManyTech, howManyDates, howManySourceTypes, filterLoading
  } = useFilter(resultsTest); //fetchedResults


  const [openDrawer, setOpenDrawer] = useState(false);
  
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 5
  })

  useEffect(()=> {
    fetchLoading ? 
    setLoading(fetchLoading):
    setLoading(filterLoading)
  }, [fetchLoading, filterLoading])

  useEffect(() => {
    setDisplayResults(filteredResults) //da aggiornare con fetchedResults
  }, [filteredResults]) //fetchedResults


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
      {!error ?
      <Container maxWidth={"100vw"}>
        
        <Grid container>
          <Grid item xs sm={2}></Grid>
          <Grid item xs={12} sm={7}>
            {loading ? <Skeleton animation="wave" variant="text" width="20em" /> :
            <><Typography style={{fontSize:"0.9rem"}}>We found a total of {found ? displayResults.length : "0"} results for "{queryId}"</Typography>
            <Divider></Divider></>
            } 
          </Grid>
          <Grid item xs sm={3}></Grid>
        </Grid>
      </Container>
      :<></>
      }
      {/* SERP rendering */}
      <Container maxWidth={"100vw"} style={{backgroundColor: '#f5f5f5'}}>
      <Grid container columnSpacing={{sm: 3, md: 4}}>
            <Grid item xs={12} sm={2}>
              <Filter filterNeedList={resultsTest.filter_topics.needs} //qui dovrebbe aggiornarsi dinamicamente in base a displayResults, che però non ha queste informazioni al momento
                filterTechList={resultsTest.filter_topics.tech} 
                fetchedResults={resultsTest}
                filters = {filters}
                onSelectNeeds = {onSelectNeeds}
                onSelectTech = {onSelectTech}
                onSelectDate = {onSelectDate}
                onSelectSourceType = {onSelectSourceType}
                needs={howManyNeeds}
                tech={howManyTech}
                dates={howManyDates}
                sourceTypes={howManySourceTypes}
                >
                </Filter>
            </Grid>
            <Grid item xs={12} sm={7}>
              {!loading ?/*  found ? */ <ResultsList queryResults={displayResults} loading={loading} /> /* : <NotFound error={error} />  */
               : <ResultsList queryResults={displayResults} loading={loading} />
              }
            </Grid>
            <Grid item xs={12} sm={3}>
              <InfoSnippet snippetType={"Info"} InfoSnippet={resultsTest.info_snippet}></InfoSnippet>
            </Grid>
            </Grid>
      </Container>
    </Box >
  );
};

const ResultsList = ({ queryResults, loading }) => {
  return (
    <Grid container style={{marginTop:"1.5em"}}>
      <Grid item xs={12} sm={12}>
        {loading ? <LoadingSkeleton />
          :
          <>
            {queryResults.map((el, index) => {
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
      {Array.from(Array(3)).map(() => {
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
        <Typography variant="h6" gutterBottom  >
          <Skeleton animation="wave" variant="text" />
        </Typography>
        <Typography variant="body2" color="textSecondary" >
          <Skeleton animation="wave" variant="text"  width="70%"/>
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
          <Skeleton animation="wave" variant="text" width="30%" />
        </Typography>
        {Array.from(Array(3)).map((el, i) => {
          return (
            <Typography key={i} variant="body2" noWrap >
              <Skeleton animation="wave" variant="text" width={`${Math.floor(Math.random() * (8 - 4 + 1)) + 4}0%`} />
            </Typography>
          );
        })}
        <Skeleton animation="wave" variant="rectangular" width="60%" />
      </Box>
    </Card>
  </Box>
)

export default ResultsPage;
