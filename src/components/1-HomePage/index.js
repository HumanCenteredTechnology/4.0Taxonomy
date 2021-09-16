import React, { useState, useEffect } from "react";

//Components
import Header from "../Header";
import SearchBar from "../SearchBar";
import ViewMenuLink from "../ViewMenuLink";
//Styles
import { Container } from "@material-ui/core";
import "./HomePage.css";

const HomePage = () => {

  const [state, setState] = useState();           //
  const [loading, setLoading] = useState(false);  //caricamento API
  const [error, setError] = useState(false);      //errore API

  return (
    <>
    
      <Header />
      <Container className="container" maxWidth="md">
          <SearchBar />
          <ViewMenuLink />
      </Container>
    </>
  );
}

export default HomePage;
