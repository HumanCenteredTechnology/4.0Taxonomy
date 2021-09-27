import React from "react";

//Routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Components
import HomePage from "./components/1-HomePage";
import ResultsPage from "./components/2-ResultsPage";
import NotFound from "./components/NotFound";
import FormPage from "./components/3 - FormPage";

//Styles
import {
  makeStyles,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from "@material-ui/core"; //creare un tema principale che utilizzeranno tutte le pagine

const theme = createTheme({
  root: {
    background: "#757ce8",
  },
  palette: {
    background: { paper: "#ffff" },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/result/:queryId" element={<ResultsPage />} />
          <Route path="/*" element={<NotFound default />} />
          <Route path="/form" element={<FormPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
