import React from "react";

//Routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Components
import HomePage from "./components/1-HomePage";
import ResultsPage from "./components/2-ResultsPage";
import FormPage from "./components/3 - FormPage";
import SingleResult from "./components/4 - SingleResult";
import Footer from "./components/Footer";

//Styles
import { CssBaseline, Box } from "@mui/material";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import RobotoRegular from './fonts/Roboto-Regular.ttf'
import Volte from './fonts/Volte.otf'

const theme = responsiveFontSizes(createTheme({
  root: {
    background: "#757ce8",
  },
  palette: {
    secondary: { main: "#2d7e32" },
    background: { paper: "#ffff" },
  },
  typography: {
    fontFamily: 'Roboto, Arial',
  },
}));

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "85vh" }} >
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:queryId" element={<ResultsPage />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/SingleResult/:articleId/:articleTitleId"  element={<SingleResult />} />
          </Routes>
        </Router>
      </Box>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
