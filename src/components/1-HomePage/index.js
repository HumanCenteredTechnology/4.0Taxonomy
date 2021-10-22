import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
//Components
import StandardButton from "../controls/StandardButton/";
import SearchBar from "../SearchBar";
import ViewMenuButton from "../controls/ViewMenuButton";
import BrowsableTree from "../BrowsableTree/";
import { TopNavBar } from "../TopNavBar";

//Hooks
import { useFetch } from "../../hooks/useFetch";
//Styles
import { Container, AppBar, Toolbar, Typography, Box } from "@material-ui/core";
import { TrapFocus } from '@mui/material';


const HomePage = () => {
  const { setSearchMention } = useFetch();
  //per l'apertura del menu dal bottone
  const [menuOpened, setMenuOpened] = useState(false);

  const handleOpenMenuClick = () => {
    if (!menuOpened) setMenuOpened(true);
    else setMenuOpened(false);
  };

  return (
    <Container>
      <TopNavBar homeIcon={false} />
      <Box
        sx={{
          margin: "auto",
          my: 5,
          width: 500,
          maxWidth: "100%"
        }}>
        <Typography align="center" variant="h1">Search4.0</Typography>
      </Box>
      <SearchBar setSearchMention={setSearchMention} />
      <Box
        sx={{
          mx: "auto",
          my: 5,
          width: 250,
          alignContent: "center"
        }}>
        <StandardButton
          variant="text"
          size="small"
          color="default"
          onClick={handleOpenMenuClick}
          text="OR EXPLORE THE DATABASE">
        </ StandardButton>
      </Box>

      {menuOpened && (
        <BrowsableTree />
      )}

    </Container>
  );
};

export default HomePage;
