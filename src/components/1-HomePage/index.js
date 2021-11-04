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
import { Container, AppBar, Toolbar, Typography, Box, Divider } from "@material-ui/core";
import { TrapFocus } from '@mui/material';
import Collapse from '@mui/material/Collapse';


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
        <Box sx={{
          mx: "auto",
          mb: 5,
          flexGrow: 1,
          maxWidth: "800px",
          alignContent: "center",
          bgcolor: '#fafafa',
          boxShadow: 3,
          borderRadius: 10
        }}>


          <Collapse in={menuOpened}>
            <Divider variant="middle" />
            <BrowsableTree isDrawer={false} />
          </Collapse>

        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
