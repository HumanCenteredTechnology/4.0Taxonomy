import { useState, useEffect } from "react";
import API from "../API.js";


const initialState = {
  related_elements: [],
  topics: [],
};

export const useFetch = (queryId) => {
  //per il fetch riceve la searchMention come stato da SearchBar
  const [searchMention, setSearchMention] = useState("");
  const [results, setResults] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [found, setFound] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      try {
        setError(false);
        setLoading(true);
        setFound(false)

        const fetchResults = await API.fetchResults(queryId);

        if (fetchResults.related_elements.length === 0 && fetchResults.topics.length === 0) {
          setFound(false)
          console.log("not found")
        } else {
          setResults(() => ({
            related_elements: [...fetchResults.related_elements],
            topics: [...fetchResults.topics]
          }));
          setFound(true)
          console.log("found")
        }

        //da aggiustare: mette found lo stesso(forse fa fetch 2 volte)
      } catch (error) {
        setError(true);
        console.log(error);
      }
      setLoading(false);
    };
    fetch()
  }, [queryId])


  return { results, loading, error, searchMention, setSearchMention, found };
};
