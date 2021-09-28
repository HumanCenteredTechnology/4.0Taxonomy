import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//Components
import SearchBar from "../SearchBar";
import Result from "../Result";

//hooks
import { useFetch } from "../../hooks/useFetch";

//Style
import "./ResultsPage.css";
import NotFound from "../NotFound";

const ResultsPage = () => {

  const { queryId } = useParams();


  const { results, loading, setSearchMention, found } = useFetch(queryId);

  let displayResults
  console.log(results)


  if (found) {
    displayResults = <ResultsList results={results} />

  } else {
    displayResults = <NotFound />
  }
  return (

    <>
      <SearchBar setSearchMention={setSearchMention} />
      <h1>Results</h1>
      {displayResults}
    </>
  );
};


//se la pagina dei risultati sarà "staccata"
const ResultsList = ({ results }) => {
  return (
    <section className="resultsList">
      <p>result</p>
      {results.results.map((result) => {
        return (
          <Result key={result.mention} {...result} /> //l'id serve per la key(richiesta da React), dovrebbe esserci nelle API
        );
      })}
    </section>

  );
};

export default ResultsPage;
