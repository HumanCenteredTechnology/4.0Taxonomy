import React, { useState, useEffect } from "react";

//Components
import Header from "../Header";
import SearchBar from "../SearchBar";
import ViewMenuButton from "../ViewMenuButton";
import Menu from "../Menu";
import ResultsPage from "../2-ResultsPage";
//Hooks
import { useFetch } from "../../hooks/useFetch";
//Styles
import { Container } from "@material-ui/core";
import "./HomePage.css";

/* const initialState = {
  results: [{ category: "", link: "", mention: "" }],
}; */

const HomePage = () => {
  const { fetchResults, searchMention, setSearchMention } = useFetch();
  //per l'apertura del menu dal bottone
  const [menuOpened, setMenuOpened] = useState(null);
  const handleCloseMenu = () => {
    setMenuOpened(null);
  };
  const handleOpenMenuClick = (e) => {
    setMenuOpened(e.currentTarget);
    console.log("cliccato");
  };

  useEffect(() => {
    console.log(fetchResults);
  }, [fetchResults]);

  return (
    <>
      <Header />
      <Container className="container" maxWidth="md">
        <SearchBar setSearchMention={setSearchMention} />
        <ViewMenuButton onClick={handleOpenMenuClick} />
      </Container>

      <ResultsPage></ResultsPage>
    </>
  );
};

export default HomePage;
