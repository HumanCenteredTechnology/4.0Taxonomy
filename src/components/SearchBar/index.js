import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import API from "../../API.js";
//Styles
import "./SearchBar.css";
import { Input } from "@material-ui/core";

const SearchBar = ({ setSearchMention }) => {
  /* const [searchMention, setSearchMention] = useState(""); */
  const [state, setState] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    if (name === "search-input") setState(value); //stato interno (potrebbe diventare setSearchMention per aiutare la ricerca in futuro)
    console.log(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(state);
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
        onChange={handleChange}
      />
    </form>
  );
};

export default SearchBar;
