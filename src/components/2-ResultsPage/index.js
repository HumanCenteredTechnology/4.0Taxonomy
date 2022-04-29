import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
//Components
import SearchBar from "../SearchBar";
import Result from "../Result";
import NotFound from "../NotFound";
import TopicChip from "../TopicChip";
import TopNavBar from "../TopNavBar";
//hooks
import { useFetch } from "../../hooks/useFetch";

//Style
//import "./ResultsPage.css";
import { Container, Box, Divider, Grid, Typography, AppBar, Toolbar } from "@material-ui/core";
import { Skeleton, IconButton, Card, Button, useScrollTrigger, Slide, Drawer, Pagination, Collapse } from "@mui/material";
import { HomeRounded } from "@mui/icons-material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from "@mui/material/styles";
import BrowsableTree from "../BrowsableTree";
import Filter from "../Filter";




const ResultsPage = () => {
  const theme = useTheme()
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'));

  const { queryId } = useParams();
  const { results, loading, error, setSearchMention, found } = useFetch(queryId);
  const [problems, setProblems] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);



  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 5
  })


  useEffect(() => {

    if (results.related_elements.length !== 0 || results.unrelated_elements.length !== 0) {
      if (results.related_elements[0].at(3) === "Problems") {
        setProblems(results.related_elements)
        setTechnologies(results.unrelated_elements)
      }
      if (results.related_elements[0].at(3) === "Technology") {
        setProblems(results.unrelated_elements)
        setTechnologies(results.related_elements)
      }
    }
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
      <Container  >
          {/*  {isSmallDevice ? <></> :
            <Slide appear={false} direction="down" in={!trigger}>
              <Box sx={{ marginY: 5, alignContent: "left" }}>
                <SearchBar setSearchMention={setSearchMention} />
              </Box>
            </Slide>
          } */}
          {!error ?
            <Box sx={{ marginY: 2, marginX:2 }}>
              {loading ? <Skeleton animation="wave" variant="text" width="20em" /> :
                <Typography variant="body1">We found a total of {found ? problems.length + technologies.length : "0"} results for "{queryId}"
                </Typography>}
            </Box>
            :
            <></>}
          <Box sx={{ marginY: 0 }}>
            <Divider margin={2} variant="middle" />
          </Box>
          {!isSmallDevice ? <Filter /> : <></>}
        </Container>
        <Box sx={{backgroundColor: '#fafafa'}}>
          <Container >
          <Grid >
            {!loading ? found ? <ResultsList problems={problems} technologies={technologies} loading={loading} /> : <NotFound error={error} /> : <ResultsList problems={problems} technologies={technologies} loading={loading} />}
          </Grid>
        </Container>
      </Box>
    </Box >
  );
};


const ResultsList = ({ problems, technologies, loading }) => {

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Box sx={{
          display: 'flex',
          p: 0,
          m: 0,
        }}>
          <Typography variant="h5" gutterBottom > {loading ? <Skeleton animation="wave" width="10em" /> : `Business Needs (${problems.length})`} </Typography>
        </Box>
        {loading ? <LoadingSkeleton />
          :
          <>
            {problems.map((el, i) => {
              return (
                <Result key={el[0]} name={el[0]} parent={el[1]} category={el[3]} articles={el[2]} />
              );
            })}
          </>}
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box sx={{
          display: 'flex',
          p: 0,
          m: 0,
        }}>
          <Typography variant="h5" gutterBottom>{loading ? <Skeleton animation="wave" width="10em" /> : `Enabling Technologies (${technologies.length})`}</Typography>
        </Box>
        {loading ? <LoadingSkeleton />
          :
          <>
            {technologies.map((el, i) => {
              return (
                <Result key={el[0]} name={el[0]} parent={el[1]} category={el[3]} articles={el[2]} />
              );
            })}
          </>}
      </Grid>
    </Grid>
  );
};

const TopicsList = ({ results }) => {
  return (
    <Box sx={{ my: 2 }}>
      <Grid container
        spacing={1}
        columnspacing={{ xs: 0, md: 2 }}
        rowspacing={{ xs: 2, md: 2 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        justifycontent="flex-start"
        direction="row">
        {results.topics.map((topic, i) => {
          return (
            <Grid item>
              <TopicChip
                key={topic[0]}
                label={topic[0]}
                name={topic[1]}
                clickable={true}
                link={topic[2]}
              />
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

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
