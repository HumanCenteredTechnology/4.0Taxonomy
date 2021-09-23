import React, { useState, useEffect } from "react";
import API from "../../API.js";
//Components
import Header from "../Header";
import SearchBar from "../SearchBar";
import ViewMenuButton from "../ViewMenuButton";
import Menu from "../Menu";
//Hooks
import { useResultsFetch } from "../../hooks/useFetch";
//Styles
import { Container } from "@material-ui/core";
import "./HomePage.css";

/* const initialState = {
  results: [{ category: "", link: "", mention: "" }],
}; */
const initialState = [
  {
    results: {
      category: "",
      link: "",
      mention: "",
    },
  },
];

const HomePage = () => {
  //per il fetch riceve la searchMention come stato da SearchBar
  const [searchMention, setSearchMention] = useState("");
  const [state, setState] = useState(initialState);

  const fetch = async (searchMention = "") => {
    try {
      const results = await API.fetchResults(searchMention); //dovrebbe esserci anche un controllo sulla risposto (se undefined)
      //setState(...results);
      setState(() => ({
        results: [...results],
      }));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetch(searchMention);
    console.log(searchMention);
    console.log("Fetching Results" + searchMention);
  }, [searchMention]);

  useEffect(() => {
    console.log("Done");
    console.log(state);
  }, [state]);

  //per l'apertura del menu dal bottone
  const [menuOpened, setMenuOpened] = useState(null);
  const handleCloseMenu = () => {
    setMenuOpened(null);
  };
  const handleOpenMenuClick = (e) => {
    setMenuOpened(e.currentTarget);
    console.log("cliccato");
  };

  return (
    <>
      <Header />
      <Container className="container" maxWidth="md">
        <SearchBar setSearchMention={setSearchMention} />
        <ViewMenuButton onClick={handleOpenMenuClick} />
      </Container>
      <h3></h3>
      <h3></h3>
      <h3></h3>
    </>
  );
};

export default HomePage;
