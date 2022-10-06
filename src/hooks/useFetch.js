import { useState, useEffect } from "react";
import API from "../API.js";



const initialState = {
  filter_topics: {},
  result_list: [],
  _info_snippet: {}
};

const initialQueries = { word: [] }

export const useFetch = (queryId) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(initialState);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState(false);
  const [found, setFound] = useState(false)
  const [options, setOptions] = useState(initialQueries)
  const [queryMatch, setQueryMatch] = useState(initialQueries);

  useEffect(() => {
    const fetch = async () => {
      try {
        setError(false);
        setFetchLoading(true);
        setFound(false)
        const fetchResults = await API.fetchResults(queryId);
        if (fetchResults.result_list == null) {
          setFound(false)
          //console.log("not found")
        } else {
          setResults(() => ({
            filter_topics: fetchResults.filter_topics,
            result_list: [...fetchResults.result_list],
            _info_snippet: fetchResults._info_snippet
          }));
          setFound(true)
          //console.log("found")
        }
      } catch (error) {
        setError(true);
        console.log(error);
      }
      setFetchLoading(false);
    };
    fetch()
    //console.log(results)
    
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

  

  return {fetchedResults : results , fetchLoading, error, query, setQuery, found, options };
};
