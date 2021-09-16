import { useState, useEffect } from "react";

const initialState = {
  results: [],
  total_results: 0,
};

export const useFetch = () => {
  /*   const [state, setState] = useState(initialState); //
  const [loading, setLoading] = useState(false); //caricamento API
  const [error, setError] = useState(false); //errore API

   const fetchResults = async (searchTerm = "") => {
    try {
      setError(false);
      setLoading(true);

      const results = await API.fetchResults(searchTerm); //dalle api caricherà i risultati. da vedere poi

      setState((prev) => ({
        ...results,
      }));
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {});

  return { state, loading, error }; */
};
