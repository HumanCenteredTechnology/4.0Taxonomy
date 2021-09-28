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

      <TopicsList />

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
        {results.results.map((result) => {
          return (
            <Result key={result.mention} {...result} /> //l'id serve per la key(richiesta da React), dovrebbe esserci nelle API
          );
        })}
      </section>
    </>

  );
};

const TopicsList = ({ topics }) => {
  return (
    <div>
      <TopicChip
        name="Problems" /*  topics[].category */
        label="Predictive maintenance" /* topics[].name*/
      />
    </div>
  )
}

export default ResultsPage;
