import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import API from "../../API";
//Components
import StandardButton from "../controls/StandardButton/";
import SearchBar from "../SearchBar";
import ViewMenuButton from "../controls/ViewMenuButton";
import BrowsableTree from "../BrowsableTree/";
import TopNavBar from "../TopNavBar";
import CheckBoxTree from "../CheckBoxTree";

//Hooks
import { useFetch } from "../../hooks/useFetch";
//Styles
import { Container, AppBar, Toolbar, Typography, Box, Divider } from "@material-ui/core";
import { TrapFocus } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';
import Logo from '../../images/PLANET4_logo_PLANET4.png';


const HomePage = () => {
  const { setSearchMention } = useFetch();
  //per l'apertura del menu dal bottone
  const [menuOpened, setMenuOpened] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const theme = useTheme()
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogin = async () => {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'app/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    setToken(data.token);
  };

  const handleLogout = async () => {
    const response = await fetch('/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'app/json' },
      body: JSON.stringify({ username })
    });

    const data = await response.json();
    console.log(data.message);
    setToken('');
  };


  const handleAddArticleClick = () => {
    if (token) {
      navigate('/form');
    } else {
      // L'utente non è autenticato, esegui azioni alternative (mostra un messaggio, reindirizza altrove, ecc.)
      console.log('Utente non autenticato. Effettua il login per accedere alla pagina.');
    }
  };

  const handleOpenMenuClick = () => {
    if (!menuOpened) setMenuOpened(true);
    else setMenuOpened(false);
  };

  /*const handleLogoutClick = async () => {
    try {
      // Effettua la richiesta POST al backend per il logout
      await axios.post('/');
      //Reindirizza alla pagina di login dopo il logout
      navigate('/');
    } 
   catch (error) {
      setError(error.response.data.error);
      console.log(error);
   }
  };

    const handleLoginClick = async () => {
    try {
      const response = await axios.post('/', { username, password });
      console.log(response.data.message);
      //Dopo il login torno sull'homepage
      navigate('/');
    } catch (error) {
      setError(error.response.data.error);
    }
  };*/

  return (
    <Box>
      <TopNavBar isHome={true} />
      <Container>

      <h1><input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} /> </h1>
       <h2><input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /> </h2>
        <StandardButton
            style={{ borderRadius: 50 }}
            variant="outlined"
            size="small"
            color="default"
            onClick={isLoggedIn ? handleLogout : handleLogin}
            text={!isLoggedIn ? "LOG IN" : "LOG OUT"}>
        </StandardButton>

        <Box
          sx={{
            margin: "auto",
            mt: 0,
            mb: 5,
            alignContent: 'center',
            textAlign: 'center'
          }}>
          <img width="300" src={Logo} class="custom-logo" alt="Planet4" />
          <Typography variant="h4">Taxonomy Explorer</Typography>
        </Box>


        {isSmallDevice ?
          <SearchBar maxWidth={"80%"} />
          :
          <SearchBar />}

            <Box
              sx={{
                mx: "auto",
                mt: 3,
                mb: 5,
                width: "100%",
                textAlign: "center"
              }}>
              <StandardButton
                style={{ borderRadius: 50 }}
                variant="outlined"
                size="small"
                color="default"
                onClick={handleAddArticleClick}
                text="ADD ARTICLE">
              </StandardButton>
              <StandardButton
                style={{ borderRadius: 50 }}
                variant="outlined"
                size="small"
                color="default"
                onClick={handleOpenMenuClick}
                text={!menuOpened ? "OR BROWSE THE TOPICS" : "CLOSE VIEW"}>
              </StandardButton>

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
                <BrowsableTree isDrawer={false} />
              </Collapse>
            </Box>

            <Container maxWidth={"xl"} style={{ backgroundColor: '#f5f5f5' }}>
              <Box sx={{
                mx: "auto",
                mt: 5,
                mb: 5,
                py: 5,
                flexGrow: 1,
                maxWidth: "1200px"
              }}>
                <Typography variant="h5">Explore a database entirely dedicated to Industry 4.0</Typography>
                <Typography variant="body">By using this tool you can identify which are the technologies that have been demonstrated to be usable for addressing similar industrial and business challenges.
                  The Planet4 Taxonomy Explorer is a search engine that simplifies the addressing of I4.0 challenges and the selection of I4.0 enabling technologies by means of proved applications, use cases and real I4.0 project descriptions.
                </Typography>

              </Box>
            </Container>
          
        
      </Container>  
      </Box>
  );
};

export default HomePage;
