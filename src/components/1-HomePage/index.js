import React, { useState, useEffect } from "react";
import API from "../../API.js";
import { Link as RouterLink } from "react-router-dom";
//Components
import Header from "../Header";
import StandardButton from "../controls/StandardButton/";
import SearchBar from "../SearchBar";
import ViewMenuButton from "../controls/ViewMenuButton";
import Menu from "../Menu";
import ResultsPage from "../2-ResultsPage";
//Hooks
import { useFetch } from "../../hooks/useFetch";
//Styles
import { Container, Pagination } from "@material-ui/core";
import "./HomePage.css";

const HomePage = () => {
  const { setSearchMention } = useFetch();
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
      <StandardButton
        variant="outlined"
        text="Add Article"
        size="small"
        color="default"
        component={RouterLink}
        to="/form"
      />

      <Header />
      <Container className="container" maxWidth="md">
        <SearchBar setSearchMention={setSearchMention} />
        <ViewMenuButton onClick={handleOpenMenuClick} />
      </Container>
      {/* <ResultsPage results={results} /> */}
    </>
  );
};

export default HomePage;
