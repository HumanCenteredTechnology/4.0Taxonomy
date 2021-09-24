import { useState, useEffect } from "react";
import API from "../API.js";

const initialState = {
  results: [],
};

export const useFetch = () => {
  //per il fetch riceve la searchMention come stato da SearchBar
  const [searchMention, setSearchMention] = useState("");
  const [results, setResults] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  //const hasInput = useRef(false);

  const fetch = async (searchMention = "") => {
    try {
      setError(false);
      setLoading(true);
      const fetchResults = await API.fetchResults(searchMention);

      setResults(() => ({
        results: [...fetchResults],
      }));
    } catch (error) {
      setError(true);
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    setResults(initialState);
    console.log("Fetching results for " + searchMention);
    fetch(searchMention);
  }, [searchMention]);

  //only for testing
  useEffect(() => {
    console.log("Done");
    console.log(results);
  }, [results]);

  return { results, loading, error, searchMention, setSearchMention };
};
