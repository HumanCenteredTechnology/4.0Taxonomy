import { useState, useEffect } from "react";
import API from "../API.js";


const initialState = {
  related_elements: [],
  topics: [],
  unrelated_elements: []
};

const initialQueries = { word: [] }

export const useFetch = (queryId) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [found, setFound] = useState(false)
  const [options, setOptions] = useState(initialQueries)
  const [queryMatch, setQueryMatch] = useState(initialQueries);

  useEffect(() => {
    const fetch = async () => {
      try {
        setError(false);
        setLoading(true);
        setFound(false)

        const fetchResults = await API.fetchResults(queryId);

        if (fetchResults.related_elements == null) {
          setFound(false)
          console.log("not found")
        } else {
          setResults(() => ({
            related_elements: [...fetchResults.related_elements],
            topics: [...fetchResults.topics],
            unrelated_elements: [...fetchResults.unrelated_elements]
          }));
          setFound(true)
          console.log("found")
        }
      } catch (error) {
        setError(true);
        console.log(error);
      }
      setLoading(false);
    };
    fetch()
  }, [queryId])

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const fetchAutocomplete = await API.fetchAutocomplete(query);
        if (fetchAutocomplete == null) {
          console.log("not found")
          setQueryMatch(initialQueries)
        } else if (fetchAutocomplete.word != null) {
          setQueryMatch(() => ({
            ...fetchAutocomplete
          }))
        }
      } catch (error) {
        console.log(error)
      }
   }
    fetchMatch()
  }, [query])
  
  useEffect(() => {
    if (queryMatch != null) setOptions(queryMatch.word)
  }, [queryMatch])



  return { results, loading, error, query, setQuery, found, options };
};
