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
//import { Stack } from '@material-ui/core/' da aggiungere quando passo a v5


const ResultsPage = () => {

  const { queryId } = useParams();


  const { results, loading, setSearchMention, found } = useFetch(queryId);

  let displayResults



  return (

    <>
      <StandardButton
        variant="outlined"
        text="Add Article"
        size="small"
        color="default"
        component={RouterLink}
        to="/form"
      />
      {found ? <TopicsList results={results} /> : <></>}
      <SearchBar setSearchMention={setSearchMention} />
      <h1>Results</h1>
      {found ? <ResultsList results={results} /> : <NotFound />}
    </>
  );
};


//se la pagina dei risultati sarà "staccata"
const ResultsList = ({ results }) => {
  return (
    <>
      <section className="resultsList">
        {results.related_elements.map((r_el) => {
          return (
            <Result key={r_el[0]} name={r_el[0]} parent={r_el[1]} links={r_el[2]} /> //l'id serve per la key(richiesta da React), dovrebbe esserci nelle API
          );
        })}
      </section>
    </>

  );
};

const TopicsList = ({ results }) => {
  return (
    <div>
      {results.topics.map((topic) => {
        return (
          <TopicChip
            key={topic[0]}
            label={topic[0]}
            name={topic[1]}
          />
        )
      })}
    </div>
  )
}

export default ResultsPage;
