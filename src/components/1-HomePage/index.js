import React, { useState, useEffect } from "react";

//Components
import Header from "../Header";
import SearchBar from "../SearchBar";
import ViewMenuButton from "../ViewMenuButton";
import Menu from "../Menu";
//Hooks
import { useFetch } from "../../hooks/useFetch";
//Styles
import { Container } from "@material-ui/core";
import "./HomePage.css";

const HomePage = () => {
  const { ress, state, loading, error, searchMention, setSearchMention } =
    useFetch();
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
      <h3>{}</h3>
    </>
  );
};

export default HomePage;
