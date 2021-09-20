import React from "react";
import TextField from "@material-ui/core/TextField";
//Styles
import "./SearchBar.css";

const SearchBar = ({ getSearchMention }) => {
  return (
    <form className="searchBar" onSubmit={getSearchMention}>
      <TextField
        className="input"
        name="searchMention"
        id="outlined-basic"
        //label="Search"
        placeholder="Search a tech or need"
        variant="outlined"
      />
    </form>
  );
};

export default SearchBar;
