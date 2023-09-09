import React, {useEffect} from "react";
import { AuthProvider } from "./hooks/useAuth";

//Routing
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
//Components
import HomePage from "./components/1-HomePage";
import ResultsPage from "./components/2-ResultsPage";
import FormPage from "./components/3 - FormPage";
import SingleResult from "./components/4 - SingleResult";
import Login from "./components/Login";
import Footer from "./components/Footer";

//Styles
import { CssBaseline, Box } from "@mui/material";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import VerifySubmit from "./components/VerifySubmit";

const theme = responsiveFontSizes(createTheme({
  root: {
    background: "#757ce8",
  },
  palette: {
    secondary: { main: "#2d7e32" },
    background: { paper: "#ffff" },
  },

  /* typography: {
    h1: {
      fontFamily: 'Volte, sans-serif',
      fontWeight: 400,
    },
    h2: {
      fontFamily: 'Volte, sans-serif',
      fontWeight: 400,
    },
    h3: {
      fontFamily: 'Volte, sans-serif',
      fontWeight: 400,
    },
    h4: {
      fontFamily: 'Volte, sans-serif',
      fontWeight: 400,
    },
    h5: {
      fontFamily: 'Volte, sans-serif',
      fontWeight: 400,
    },
    h6: {
      fontFamily: 'Volte, sans-serif',
      fontWeight: 400,
    },
    subtitle1: {
      fontFamily: 'Volte, sans-serif',
      fontWeight: 400,
    },
    subtitle2: {
      fontFamily: 'Volte, sans-serif',
      fontWeight: 400,
    },
    body1: {
      fontFamily: 'Volte, sans-serif',
      fontWeight: 400,
    },
    body2: {
      fontFamily: 'Volte, sans-serif',
      fontWeight: 400,
    },
    button: {
      
    },
  }, */

 
}));

const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>
};

const App = () => {
  return (
    <AuthProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "80vh" }} >
        <Router>
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/:queryId" element={<ResultsPage />} />
              <Route path="/form" element={<FormPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/SingleResult/:articleId" element={<SingleResult />} />
            </Routes>
          </ScrollToTop>
        </Router>
      </Box>
      <Footer />
    </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
