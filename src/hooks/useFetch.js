import { useState, useEffect, useRef } from "react";
import API from "../API.js";
const initialState = [
  {
    results: {
      category: "",
      link: "",
      mention: "",
    },
  },
];

export const useFetch = () => {
  //per il fetch riceve la searchMention come stato da SearchBar
  const [searchMention, setSearchMention] = useState("");
  const [results, setResults] = useState(initialState);
  //const hasInput = useRef(false);

  const fetch = async (searchMention = "") => {
    try {
      const results = await API.fetchResults(searchMention); //dovrebbe esserci anche un controllo sulla risposto (se undefined)

      //setState(...results);
      setResults(() => ({
        results: [...results],
      }));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetch(searchMention);
    console.log("Fetching results for " + searchMention);
  }, [searchMention]);

  useEffect(() => {
    console.log("Done");
    console.log(results);
  }, [results]);

  return { results, searchMention, setSearchMention };
};
