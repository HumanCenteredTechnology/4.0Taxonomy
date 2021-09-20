import React, { useState, useEffect } from "react";

//Components
import Header from "../Header";
import SearchBar from "../SearchBar";
import ViewMenuLink from "../ViewMenuLink";
//Hokks
import { useResultsFetch } from "../hooks/useFetch";
//Styles
import { Container } from "@material-ui/core";
import "./HomePage.css";

const dataUrl = "http://localhost:3000/data.json";
const getSearchMention = async (e) => {
  const searchMention = e.target.elements.searchMention.value;
  e.preventDefault(); //impedisce il refresh della pagina
  const api_call = await fetch(dataUrl);
  const data = await api_call.json();
  console.log(data);
};
const HomePage = () => {
  return (
    <>
      <Header />
      <Container className="container" maxWidth="md">
        <SearchBar getSearchMention={getSearchMention} />
        <ViewMenuLink />
      </Container>
    </>
  );
};

export default HomePage;
