import React, { useState, useEffect } from "react";

import API from "../../API.js";
//Styles
import "./SearchBar.css";
import TextField from "@material-ui/core/TextField";

const SearchBar = ({ setSearchMention }) => {
  const [state, setState] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchMention(state);
  };
  return (
    <form className="searchBar" onSubmit={handleSubmit}>
      <TextField
        className="input"
        name="search-input"
        id="outlined-basic"
        //label="Search"
        placeholder="Search a tech or need"
        value={state}
        variant="outlined"
        onChange={(e) => setState(e.currentTarget.value)}
      />
    </form>
  );
};

export default SearchBar;
