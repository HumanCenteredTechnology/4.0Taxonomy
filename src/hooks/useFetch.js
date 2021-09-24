import { useState, useEffect } from "react";
import API from "../API.js";
const initialState = {
  results: [],
};

const ss = {
  results: [
    {
      category: "",
      link: "",
      mention: "",
    },
  ],
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
      const fetchResults = await API.fetchResults(searchMention); //dovrebbe esserci anche un controllo sulla risposto (se undefined)

      //setState(...results);
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

  useEffect(() => {
    console.log("Done");
    console.log(results);
  }, [results]);

  return { results, loading, error, searchMention, setSearchMention };
};
