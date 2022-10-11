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
import ResultsInfiniteScroll from "../ResultsInfiniteScroll";


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
  const { fetchedResults, fetchLoading, error, setSearchMention, found } = useFetch(queryId);
  const [ displayResults, setDisplayResults] = useState ([...fetchedResults.result_list]); //fetchedResults
  const [ loading, setLoading] = useState (false);

  const {filters, filteredResults, onSelectNeeds, onSelectTech, onSelectDate, onSelectSourceType, 
          howManyNeeds, howManyTech, howManyDates, howManySourceTypes, filterLoading
  } = useFilter(fetchedResults); //fetchedResults


  const [openDrawer, setOpenDrawer] = useState(false);

  //result list pagination
  const [hasMore, setHasMore] = useState(true)
  const resultsPerPage = 10
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(10)

/*   // infinite scroll logic
  const fakeFetchMore = () => {
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      const nextResults = displayResults.concat(paginate(filteredResults, page));
      setDisplayResults(nextResults);
    }, 500);
  }; */

  useEffect(() => {
    if (displayResults.length >= filteredResults.length) {
      setHasMore(false);
    }
  }, [displayResults.length]);

  const handlePageChange = (e, value) => {
    setPage(value);
  }
  
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
    setPage(1)
    setLastPage(parseInt(filteredResults.length/resultsPerPage))
    setDisplayResults(filteredResults.slice(0, resultsPerPage))
    console.log(fetchedResults._info_snippet)
  }, [filteredResults]) //fetchedResults

  useEffect(()=>{
    setDisplayResults(()=>paginate(filteredResults, page));
    goToTop()
  }, [page])
  
  const paginate = (results, page) => {
    let start
    page === 1 ? 
      start = 0
      :
      start = resultsPerPage * page;
    //page++
    return results.slice(start, start + resultsPerPage);
  }

  const goToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};
/*   useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);
 */

 /*  const loadMoreResults = () => {
    setDisplayResults(()=>paginate(filteredResults, page))
    //page++
    console.log(page)
    console.log(displayResults)
    //setDisplayResults(filteredResults.slice(0, currentOffset))
    
  }; */

  

 /*  const handleScroll = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const currentHeight = Math.ceil(
      e.target.documentElement.scrollTop + window.innerHeight
    );
    if (currentHeight + 1 >= scrollHeight) {
      if (!loading) loadMoreResults();
    }
  }; */

/*   useEffect(() => {
    console.log(fetchedResults)
  }, [fetchedResults]) //fetchedResults */


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
      <Container maxWidth={"xl"}>
        
        <Grid container>
          <Grid item xs sm={2}></Grid>
          <Grid item xs={12} sm={7}>
            {loading ? <Skeleton animation="wave" variant="text" width="20em" /> :
            <><Typography style={{fontSize:"0.9rem"}}>We found a total of {found ? fetchedResults.result_list.length : "0"} results for "{queryId}"</Typography>
            <Divider></Divider></>
            } 
          </Grid>
          <Grid item xs sm={3}></Grid>
        </Grid>
      </Container>
      :<></>
      }
      {/* SERP rendering */}
      <Container maxWidth={"xl"} style={{backgroundColor: '#f5f5f5'}}>
      <Grid container columnSpacing={{sm: 3, md: 4}}>
            <Grid item sm={12} md={2}>
              <Filter 
                fetchedResults={resultsTest} //fetchedResults
                filters = {filters}
                onSelectNeeds = {onSelectNeeds}
                onSelectTech = {onSelectTech}
                onSelectDate = {onSelectDate}
                onSelectSourceType = {onSelectSourceType}
                needs={howManyNeeds}
                tech={howManyTech}
                dates={howManyDates}
                sourceTypes={howManySourceTypes}
                loading={loading}
                >
                </Filter>
            </Grid>
            <Grid item sm={12} md={7}>
                {!loading ?  found ?  
                <>
                  <ResultsList results={displayResults} loading={loading}/> 
                  <Box display="flex" justifyContent="center" marginY={2} alignContent="center" textAlign="center">
                    <Pagination count={lastPage} page={page} onChange={handlePageChange}/>
                  </Box>
                </>
                : <NotFound error={error} />  
                : <ResultsList results={displayResults} loading={loading} />
                }
              </Grid>
              <Grid item sm={12} md={3}>
                {fetchedResults._info_snippet !== undefined && <InfoSnippet snippetType={"Info"} InfoSnippet={fetchedResults._info_snippet} loading={loading}/>}
              </Grid>
            </Grid>
      </Container>
    </Box >
  );
};


const ResultsList = ({ results, loading}) => {
  return (
    <Grid container style={{marginTop:"1.5em"}}>
      <Grid item xs={12} sm={12}>
        {loading ? <LoadingSkeleton />
          :
          <>
            {results.map((el, index) => {
              return (
                <Result key={`${el.id}_${index}_List`} elCard={el}></Result>
              );
            })}
          </>
          }
      </Grid>
    </Grid>
  );
};

{/* <ResultsInfiniteScroll
            dataLength={results.length}
            hasMore={hasMore}
            next={fakeFetchMore}
            loader={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                loading...
              </div>
            }
            height={window.visualViewport.height}
            elementHeight={700} // 새로 추가
            rowRenderer={({ key, index, style, parent }) => {
              const res = results[index]
              return (
                <Result key={`${res.id}_${index}_List`} elCard={res} />
              )
            }}
            children={results}
            />
 */}
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
