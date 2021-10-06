import React from "react";
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
//import { Stack } from '@material-ui/core/' da aggiungere quando passo a v5

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(1)' }}
  >
    |
  </Box>
);

const ResultsPage = () => {

  const { queryId } = useParams();


  const { results, loading, setSearchMention, found } = useFetch(queryId);

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

      <h2>{found ? results.related_elements.length : "0"} Results found for "{queryId}"</h2>
      <Box sx={{ marginY: 5 }}>
        <Divider margin={2} variant="middle" />
      </Box>

      {found ? <ResultsList results={results} /> : <NotFound />}
      <Box sx={{ marginTop: 10, marginX: 5 }}>
        {found ? <><p>topics suggested</p> <TopicsList results={results} /></> : <></>}
      </Box>
    </Container>
  );
};

//inserire un "Argomenti correlati" in fondo che utilizza i topics della ricerca, 
//cliccandoci apre una nuova pagina risultati con l'argomento selezionato come queryId

const ResultsList = ({ results }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 1,
          m: 2,
        }}>
          <Typography variant="h4" >Needs</Typography>
        </Box>

        {results.related_elements.map((r_el, i) => {
          return (
            <Result key={r_el + i} name={r_el[0]} parent={r_el[1]} category={r_el[3]} articles={r_el[2]} /> //l'id serve per la key(richiesta da React), dovrebbe esserci nelle API
          );
        })}
      </Grid>
      <Grid item xs={6}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 1,
          m: 2,
        }}>
          <Typography variant="h4" >Technologies</Typography>
        </Box>
        {results.related_elements.map((r_el, i) => {
          return (
            <Result key={r_el + i} name={r_el[0]} parent={r_el[1]} category={r_el[3]} articles={r_el[2]} /> //l'id serve per la key(richiesta da React), dovrebbe esserci nelle API
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
            <Grid item key={topic + i}>
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
