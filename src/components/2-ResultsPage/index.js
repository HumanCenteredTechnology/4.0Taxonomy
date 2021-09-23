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

const ResultsList = ({}) => {
  const { fetchResults, searchMention, setSearchMention } = useFetch();
  const [state, setState] = useState(null);
  useEffect(() => {
    setState(fetchResults);
    console.log(setState);
  }, [fetchResults]);
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

//mostra tutti i risultati

export default ResultsPage;
//export default ResultsFetch;
