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
import "./ResultsPage.css";
import { Container, Box, Divider, Grid } from "@material-ui/core";
//import { Stack } from '@material-ui/core/' da aggiungere quando passo a v5


const ResultsPage = () => {

  const { queryId } = useParams();


  const { results, loading, setSearchMention, found } = useFetch(queryId);

  return (
    <Container >
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

      <h2>{found ? results.related_elements.length : "0"} Results found for "{queryId}"</h2>
      <Divider variant="middle" />
      <Box sx={{ marginTop: 10, marginX: 5 }}>
        {found ? <><p>topics suggested</p> <TopicsList results={results } /></>   : <></>}
      </Box>
      {found ? <ResultsList results={results} /> : <NotFound />}
    </Container>
  );
};


//se la pagina dei risultati sarà "staccata"
const ResultsList = ({ results }) => {
  return (
    <>
      <section className="resultsList">
        {results.related_elements.map((r_el, i) => {
          return (
            <Result key={i} name={r_el[0]} parent={r_el[1]} category={r_el[3]} links={r_el[2]} /> //l'id serve per la key(richiesta da React), dovrebbe esserci nelle API
          );
        })}
      </section>
    </>

  );
};

const TopicsList = ({ results }) => {
  return (
    <Box sx={{ my: 2 }}>
      <Grid container
        columnSpacing={{ xs: 0, md: 2 }}
        rowSpacing={{ xs: 2, md: 2 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        justifyContent="flex-start"
        direction="row">
        {results.topics.map((topic, i) => {
          return (
            <Grid item key={i}>
              <TopicChip
                key={i}
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
