import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistred, setisRegistred] = useState(false);
  const [token, setToken] = useState('');

  // Funzione di login che riceve username, password e setta il token e lo stato di accesso
  const login = useCallback((username, password) => {
    // Esegui la logica di autenticazione qui
    // Se l'autenticazione ha successo, setta il token e isLoggedIn a true
    // Altrimenti, gestisci l'errore di autenticazione
        if (!isLoggedIn) {
            //setToken(token);
            setIsLoggedIn(true);
        } else {
            console.error('Errore durante il login');
        }
  }, []);

  // Funzione di logout che resetta il token e lo stato di accesso
  const logout = useCallback(() => {
    //setToken('');
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve essere utilizzato all\'interno di un AuthProvider');
  }
  return context;
};
