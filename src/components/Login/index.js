import React, {  useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import API from "../../API";

//Components
import StandardButton from "../controls/StandardButton/";

//Hooks
import { useFetch } from "../../hooks/useFetch";
import { useAuth } from "../../hooks/useAuth";
//Styles
import { Container, AppBar, Toolbar, Typography, Box, Divider, TextField, Button } from "@material-ui/core";
import { TrapFocus } from '@mui/material';



const Login = () => {

  const { isLoggedIn, login, logout } = useAuth(); // Ottieni lo stato di accesso e la funzione di login dal contesto di autenticazione
  const [isRegistred, setisRegistred] = useState('');
  //const [isLoggedIn, setisLoggedIn] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  
  const schema = yup.object().shape({
    username: yup.string().required('Username obbligatorio'),
    password: yup.string().required('Password obbligatoria'),
  });

  const handleRegister = async () => {
    try {
      await schema.validate({ username, password }, { abortEarly: false });

      const response = await API.register(username, password, token);

      if (response.ok) {
        console.log('Registrazione avvenuta con successo');

        //setisRegistred(true);
        navigate('/');
      } else {
        console.error('Errore durante la registrazione');
      }
    } catch (validationErrors) {
      const errorMessages = validationErrors.inner.map(error => error.message);
      setErrorMessages(errorMessages);
    }
  };

  const handleLogin = async () => {
    setErrorMessages([]); // Inizializza l'array degli errori
   // setisLoggedIn(false);
  
    try {
      await schema.validate({ username, password }, { abortEarly: false });
  
      try {
        // Effettua la chiamata API di login e ricevi la risposta dal server
        const response = await API.login(username, password, token);
  
        if (response.ok) {
          // Imposta il token nello stato
          const newToken = response.data.token;
          setToken(newToken);
          //setisLoggedIn(true);
          
          // Esegui la funzione di login dal contesto di autenticazione
          login(username, password);

          // Esegue il redirect dopo il login
          navigate('/');
        } else {
          console.error('Errore durante il login', response.error);
        }
      } catch (loginError) {
        console.error('Errore durante la chiamata di login:', loginError);
      }
    } catch (validationErrors) {
      const errorMessages = validationErrors.inner.map(error => error.message);
      console.error('Errori di validazione:', errorMessages);
      setErrorMessages(errorMessages); // Aggiorna l'array degli errori
    }
  };
  

  const handleLogout = async () => {
    try {
      // Effettua la chiamata API di logout con il token
      await API.logout(username, token);

      logout(); // Chiama la funzione di logout dal contesto di autenticazione

      // Esegue il redirect dopo il logout
      setToken('');
      navigate('/');
    } catch (error) {
      console.error('Errore durante il logout:', error);
    }
  };

  return (
    <Container maxWidth="md">
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>Registrazione</h1>
      {errorMessages.length > 0 && (
        <ul>
          {errorMessages.map((errorMessage, index) => (
            <li key={index}>{errorMessage}</li>
          ))}
        </ul>
      )}
      {isLoggedIn ? (

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <TextField label="Username" onChange={(e) => setUsername(e.target.value)} />
          <Button variant="contained" color="primary" onClick={handleLogout}>Logout</Button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField label="Username" onChange={(e) => setUsername(e.target.value)} />
          <TextField type="password" label="Password" onChange={(e) => setPassword(e.target.value)} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
            <Button variant="contained" color="primary" onClick={handleRegister}>Registrati</Button>
          </div>
        </div>
      )}
    </div>
  </Container>
  );
};

export default Login;
