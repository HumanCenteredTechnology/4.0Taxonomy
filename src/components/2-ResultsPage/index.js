import React, { useState, useEffect } from "react";

//Components
import SearchBar from "../SearchBar";
import Result from "../Result";

//hooks
import { useFetch } from "../../hooks/useFetch";

//Style
import "./ResultsPage.css";

const ResultsPage = () => {
  return (
    <div>
      <ResultsList />
    </div>
  );
};

const ResultsList = () => {
  const { results } = useFetch();
  const [state, setState] = useState(null);
  useEffect(() => {
    console.log(results);
  }, [results]);
  return (
    <section className="resultsList">
      {/* <p>{state.results[0].mention}</p> */}
      {/*      {result.map((result) => {
        return (
          <Result key={result.mention} {...result} /> //l'id serve per la key(richiesta da React), dovrebbe esserci nelle API
        );
      })} */}
    </section>
  );
};

export default ResultsPage;
