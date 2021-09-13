import React from "react";

//Components
import Header from "../Header";
import SearchBar from "../SearchBar";
import ViewMenuLink from "../ViewMenuLink";
//Styles
import { Container } from "@material-ui/core";

const HomePage = () => {
  return (
    <div className="HomePage">
      <Header />
      <Container
        maxWidth="md"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          heigth: "100vh",
        }}
      >
        <SearchBar />
        <ViewMenuLink />
      </Container>
    </div>
  );
}

export default HomePage;
