import React from "react";

//Routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Components
import HomePage from "./components/1-HomePage";
import ResultsPage from "./components/2-ResultsPage";
import NotFound from "./components/NotFound";

//Styles
//import { GlobalStyle } from './GlobalStyle';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:queryId" element={<ResultsPage />} />
        <Route path="/*" element={<NotFound default />} />
      </Routes>
    </Router>
  );
};

export default App;
