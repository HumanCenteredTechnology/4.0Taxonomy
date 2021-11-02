import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
//Components
import StandardButton from "../controls/StandardButton/";
import SearchBar from "../SearchBar";
import ViewMenuButton from "../controls/ViewMenuButton";
import BrowsableTree from "../BrowsableTree/";
import TopNavBar from "../TopNavBar";

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
    <Box>
      <TopNavBar isHome={true} />
      <Container>
        <Box
          sx={{
            margin: "auto",
            my: 5,
          }}>
          <Typography align="center" variant="h2">Planet4 Taxonomy Explorer</Typography>
        </Box>
        <SearchBar />
        <Box
          sx={{
            mx: "auto",
            mt: 10,
            width: "100%",
            textAlign: "center"
          }}>
          <StandardButton
            variant="text"
            size="small"
            color="default"
            onClick={handleOpenMenuClick}
            text={!menuOpened ? "OR EXPLORE THE DATABASE" : "CLOSE VIEW"}>
          </ StandardButton>

        </Box>

        {menuOpened && (
          <BrowsableTree isDrawer={false} />
        )}

      </Container>
    </Box>
  );
};

export default HomePage;
