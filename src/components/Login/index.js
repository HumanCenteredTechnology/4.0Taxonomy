import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import API from "../../API";

//Components
import StandardButton from "../controls/StandardButton/";

//Hooks
import { useFetch } from "../../hooks/useFetch";
//Styles
import { Container, AppBar, Toolbar, Typography, Box, Divider } from "@material-ui/core";
import { TrapFocus } from '@mui/material';


const LoginPage = () => {

  const [isLoggedIn, setisLoggedIn] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setisLoggedIn(false)
    try {
      // Effettua la chiamata API di login e ricevi il token dal server
      const response = await API.login(username, password);
      const newToken = response.data.token;
      
      // Esegui il redirect o altre azioni dopo il login
      navigate('/');
    }
    catch (error) {
      console.error('Errore durante il login:', error);
    }
  };

  const handleLogout = async () => {
    setisLoggedIn(true)
    try {
      // Effettua la chiamata API di login e ricevi il token dal server
      await API.logout(username);
      
      // Esegui il redirect o altre azioni dopo il login
      navigate('/');
    }
    catch (error) {
      console.error('Errore durante il logout:', error);
    }
  };
  
    return (
      
<div>
       <h1><input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} /> </h1>
       <h1><input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /> </h1>
      
      <StandardButton
            style={{ borderRadius: 50 }}
            variant="outlined"
            size="small"
            color="default"
            onClick={handleLogin}
            text="LOG IN">
        </StandardButton>
        <StandardButton
            style={{ borderRadius: 50 }}
            variant="outlined"
            size="small"
            color="default"
            onClick={handleLogout}
            text="LOG OUT">
        </StandardButton>
    </div>
  );
};

export default LoginPage;