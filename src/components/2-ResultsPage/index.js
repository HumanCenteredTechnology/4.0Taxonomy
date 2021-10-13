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
import { Container, Box, Divider, Grid, Typography } from "@material-ui/core";



const ResultsPage = () => {

  const { queryId } = useParams();
  const { results, loading, setSearchMention, found } = useFetch(queryId);
  const [problems, setProblems] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [listState, setListState] = useState(0);
  

  useEffect(() => {
    const prob = results.unrelated_elements.filter(res => res[3] === "Problems")
    const tech = results.related_elements.filter(res => res[3] === "Technology")
    //prob.push(results.unrelated_elements.filter(res => res[3] === "Problems"))
    //tech.push(results.unrelated_elements.filter(res => res[3] === "Technology"))
    if (prob.length !== 0 && tech.length !== 0) setListState(0)
    else if (prob.length > 0 && tech.length == 0) setListState(1)
    else if (tech.length > 0 && prob.length == 0) setListState(2)
    setProblems(prob)
    setTechnologies(tech)
  }, [results])
  
  return (
    <Container  >
      <StandardButton
        variant="outlined"
        text="Add Article"
        size="small"
        color="default"
        component={RouterLink}
        to="/form"
      />
      <Box sx={{ marginY: 5 }}>
        <SearchBar setSearchMention={setSearchMention} />
      </Box>
      <h3>We found a total of {found ? results.related_elements.length + results.unrelated_elements.length: "0"} results for "{queryId}"</h3>
      <Box sx={{ marginY: 3 }}>
        <Divider margin={2} variant="middle" />
      </Box>
      <Grid container spacing={3}>
        {found ? <ResultsList problems={problems} technologies={technologies} listState={listState} /> : <NotFound />}
      </Grid>
      {/* <Box sx={{ marginTop: 10, marginX: 5 }}>
        {found ? <><p>topics suggested</p> <TopicsList results={results} /></> : <></>}
      </Box> */}
    </Container>
  );
};


const ResultsList = ({ problems, technologies, listState }) => {
  if (listState == 1) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            p: 1,
            m: 2,
          }}>
            <Typography variant="h4" >Needs</Typography>
          </Box>
          {technologies.map((r_el, i) => {
            return (
              <Result key={r_el[0]} name={r_el[0]} parent={r_el[1]} category={r_el[3]} articles={r_el[2]} />
            );
          })}
        </Grid>
      </Grid>
    );
  } 
  if (listState == 2) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            p: 1,
            m: 2,
          }}>
            <Typography variant="h4" >Technologies</Typography>
          </Box>
          {technologies.map((r_el, i) => {
            return (
              <Result key={r_el[0]} name={r_el[0]} parent={r_el[1]} category={r_el[3]} articles={r_el[2]} />
            );
          })}
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 1,
          m: 2,
        }}>
          <Typography variant="h4" >Needs</Typography>
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
          justifyContent: 'center',
          p: 1,
          m: 2,
        }}>
          <Typography variant="h4" >Technologies</Typography>
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
