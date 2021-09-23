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

/* const SearchBar = ({ getSearchMention }) => {
  const [searchMention, setSearchMention] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    if (name === "search-input") setSearchMention(value);
    console.log(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(searchMention);
    const results = await API.fetchResults(searchMention);
    console.log(results);
  };

  return (
    <form className="searchBar" onSubmit={handleSubmit}>
      <TextField
        className="input"
        name="search-input"
        id="outlined-basic"
        //label="Search"
        placeholder="Search a tech or need"
        value={searchMention}
        variant="outlined"
        onChange={handleChange}
      />
    </form>
  );
}; */

export default SearchBar;
