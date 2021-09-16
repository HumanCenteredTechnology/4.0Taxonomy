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

const HomePage = () => {
  return (
    <>
      <Header />
      <Container className="container" maxWidth="md">
        <SearchBar />
        <ViewMenuLink />
      </Container>
    </>
  );
};

export default HomePage;
