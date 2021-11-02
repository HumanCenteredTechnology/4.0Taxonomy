import React from "react";

//Routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Components
import HomePage from "./components/1-HomePage";
import ResultsPage from "./components/2-ResultsPage";
import FormPage from "./components/3 - FormPage";

//Styles
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';

const theme = responsiveFontSizes(createTheme({
  root: {
    background: "#757ce8",
  },
  palette: {
    secondary: { main: "#2d7e32" },
    background: { paper: "#ffff" },
  },
}));

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:queryId" element={<ResultsPage />} />
          <Route path="/form" element={<FormPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
