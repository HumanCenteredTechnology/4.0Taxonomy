import React, { useState, useEffect } from "react";

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

const apiUrl = "http://localhost:5000/";
/* const getSearchMention = async (e) => {
  const searchMention = e.target.elements.searchMention.value;
  e.preventDefault(); //impedisce il refresh della pagina
  const api_call = await fetch(`${apiUrl}${searchMention}`);
  const data = await api_call.json();
  console.log(data);
}; */

const HomePage = () => {
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
        <SearchBar />
        <ViewMenuButton onClick={handleOpenMenuClick} />
      </Container>
      <h3>{}</h3>
    </>
  );
};

export default HomePage;
