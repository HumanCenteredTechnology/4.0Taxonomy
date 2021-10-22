import React, { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
//Components
import SearchBar from "../SearchBar";
import Result from "../Result";
import StandardButton from "../controls/StandardButton/";
import NotFound from "../NotFound";
import TopicChip from "../TopicChip";
//hooks
import { useFetch } from "../../hooks/useFetch";

//Style
//import "./ResultsPage.css";
import { Container, Box, Divider, Grid, Typography, AppBar, Toolbar } from "@material-ui/core";



const ResultsPage = () => {

  const { queryId } = useParams();
  const { results, loading, error, setSearchMention, found } = useFetch(queryId);
  const [problems, setProblems] = useState([]);
  const [technologies, setTechnologies] = useState([]);


  useEffect(() => {

    if (results.related_elements.length !== 0 || results.unrelated_elements.length !== 0) {
      if (results.related_elements[0].at(3) === "Problems") {
        setProblems(results.related_elements.filter(res => res[3] === "Problems"))
        setTechnologies(results.unrelated_elements.filter(res => res[3] === "Technology"))
      }
      if (results.related_elements[0].at(3) === "Technology") {
        setProblems(results.unrelated_elements.filter(res => res[3] === "Problems"))
        setTechnologies(results.related_elements.filter(res => res[3] === "Technology"))
      }
      console.log(problems)
      console.log(technologies)
    }
  }, [results])

  return (
    <Container  >
      <AppBar
        position="static"
        edge="start"
        color="transparent"
        elevation={0}
        sx={{
          shadows: 0,

        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <StandardButton
            variant="text"
            text="Add Article"
            size="small"
            color="inherit"
            component={RouterLink}
            to="/form"
          />
        </Toolbar>
      </AppBar>
      <Box sx={{ marginY: 5 }}>
        <SearchBar setSearchMention={setSearchMention} />
      </Box>
      {!error ?
        <Typography variant="body1">We found a total of {found ? problems.length + technologies.length : "0"} results for "{queryId}"
        </Typography>
        :
        <></>}
      <Box sx={{ marginY: 3 }}>
        <Divider margin={2} variant="middle" />
      </Box>
      <Grid container spacing={3}>
        {found ? <ResultsList problems={problems} technologies={technologies} /> : <NotFound error={error} />}
        {/* <ResultsList problems={problems} technologies={technologies} /> */}
      </Grid>
      {/* <Box sx={{ marginTop: 10, marginX: 5 }}>
        {found ? <><p>topics suggested</p> <TopicsList results={results} /></> : <></>}
      </Box> */}
    </Container>
  );
};


const ResultsList = ({ problems, technologies }) => {

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Box sx={{
          display: 'flex',
          p: 1,
          m: 2,
        }}>
          <Typography variant="h5" >Needs ({problems.length})</Typography>
        </Box>
        {problems.map((r_el, i) => {
          return (
            <Result key={r_el[0]} name={r_el[0]} parent={r_el[1]} category={r_el[3]} articles={r_el[2]} />
          );
        })}
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box sx={{
          display: 'flex',
          p: 1,
          m: 2,
        }}>
          <Typography variant="h5" >Technologies ({technologies.length})</Typography>
        </Box>
        {technologies.map((r_el, i) => {
          return (
            <Result key={r_el[0]} name={r_el[0]} parent={r_el[1]} category={r_el[3]} articles={r_el[2]} />
          );
        })}
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

export default ResultsPage;
