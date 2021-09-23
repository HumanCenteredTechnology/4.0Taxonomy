import { useState, useEffect } from "react";
import API from "../API.js";
import { isPersistedState } from "../helper";

const initialState = {
  results: [],
  total_results: 0,
};

export const useFetch = () => {
  const [searchMention, setSearchMention] = useState(""); //
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false); //caricamento API
  const [error, setError] = useState(false); //errore API
  const ress = [];

  const fetchResults = async (searchMention) => {
    try {
      /* setError(false);
      setLoading(true); */

      const results = await API.fetchResults(searchMention); //dalle api caricherà i risultati. da vedere poi

      setState(results);
    } catch (error) {
      setError(true);
    }
    /* setLoading(false); */
  };

  useEffect(() => {
    /*     if (!searchMention) {
      const sessionState = isPersistedState("homeState");

      if (sessionState) {
        console.log("Grabbing from sessionStorage");
        setState(sessionState);
        return;
      }
    } */

    ress = () => {
      fetchResults(searchMention);
    };
    console.log(state);
  }, [searchMention]);
  /*  useEffect(() => {
    if (!searchMention)
      sessionStorage.setItem("homeState", JSON.stringify(state));
  }, [searchMention, state]); */

  return { ress, state, loading, error, searchMention, setSearchMention };
};

/* const SearchBar = ({ getSearchMention }) => {
  const [searchMention, setSearchMention] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    if (name === "search-input") setSearchMention(value);
    console.log(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(searchMention);
    const results = await API.fetchResults(searchMention);
    console.log(results);
  };*/
