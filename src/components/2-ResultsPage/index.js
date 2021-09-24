import React, { useState, useEffect } from "react";

//Components
import SearchBar from "../SearchBar";
import Result from "../Result";

//hooks
import { useFetch } from "../../hooks/useFetch";

//Style
import "./ResultsPage.css";

const ResultsPage = ({ results }) => {
  /*   const { results, loading } = useFetch(); */
  return (
    <section className="resultsList">
      {results.results.map((result) => {
        return (
          <Result key={result.mention} {...result} /> //l'id serve per la key(richiesta da React), dovrebbe esserci nelle API
        );
      })}
    </section>
  );
};

const ResultsList = () => {
  return (
    <section className="resultsList">
      {/*      {result.map((result) => {
        return (
          <Result key={result.mention} {...result} /> //l'id serve per la key(richiesta da React), dovrebbe esserci nelle API
        );
      })} */}
    </section>
  );
};

export default ResultsPage;
