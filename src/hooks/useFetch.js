<<<<<<< Updated upstream
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
=======
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
  const [state, setState] = useState(initialState);
  const hasInput = useRef(false);

  const fetch = async (searchMention = "") => {
    try {
      const results = await API.fetchResults(searchMention); //dovrebbe esserci anche un controllo sulla risposto (se undefined)
      //setState(...results);
      setState(() => ({
        results: [...results],
      }));
>>>>>>> Stashed changes
    } catch (error) {
      console.log(error);
    }
<<<<<<< Updated upstream
    /* setLoading(false); */
=======
>>>>>>> Stashed changes
  };
  useEffect(() => {
    fetch(searchMention);
    console.log(searchMention);
    console.log("Fetching Results" + searchMention);
  }, [searchMention]);

  useEffect(() => {
<<<<<<< Updated upstream
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
=======
    console.log("Done");
  }, [state]);

  return { state, searchMention, setSearchMention };
>>>>>>> Stashed changes
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
