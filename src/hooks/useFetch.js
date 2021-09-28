import { useState, useEffect } from "react";
import API from "../API.js";


const initialState = {
  results: [],
};

export const useFetch = (queryId) => {
  //per il fetch riceve la searchMention come stato da SearchBar
  const [searchMention, setSearchMention] = useState("");
  const [results, setResults] = useState({ initialState });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [found, setFound] = useState(false)
  //const hasInput = useRef(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setError(false);
        setLoading(true);
        setFound(false)
        const fetchResults = await API.fetchResults(queryId);

        setResults(() => ({
          results: [...fetchResults],
        }));


        if (results !== initialState.results) {
          setFound(true)
          console.log("not found")
        } else {
          setFound(false)
        }
        if (found === true) console.log("found")
      } catch (error) {
        setError(true);
        console.log(error);
      }
      setLoading(false);
    };
    fetch()

    console.log(results)
  }, [queryId])

  return { results, loading, error, searchMention, setSearchMention, found };
};
