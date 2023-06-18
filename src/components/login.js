import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import API from "../../API";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    try {
      // Effettua la richiesta POST al backend per il logout
      await axios.post('/api/logout');
      //Reindirizza alla pagina di login dopo il logout
      navigate('/login');
    } 
   catch (error) {
      setError(error.response.data.error);
      console.log(error);
   }
  };

    const handleLoginClick = async () => {
    try {
      const response = await axios.post('/api/login', { username, password });
      console.log(response.data.message);
      //Dopo il login torno sull'homepage
      navigate('/');
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
    </div>
  );
};

export default Login;
