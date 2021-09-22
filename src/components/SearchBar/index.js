import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import API from "../../API.js";
//Styles
import "./SearchBar.css";
import { Input } from "@material-ui/core";

const SearchBar = ({ getSearchMention }) => {
  const [searchMention, setSearchMention] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    if (name === "search-input") setSearchMention(value);
    console.log(value);
    /* const { value } = e.target;
    setSearchMention(value);
    console.log(searchMention); */
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(searchMention);
    const results = await API.fetchResults(searchMention);
    console.log(results);

    /*    setError(false);
    try {
      const results = await API.fetchResults(searchTerm);
      console.log(results);
    } catch (error) {
      setError(true);
    } */
    /*     e.preventDefault();
    fetch("http://localhost:5000/", {
      method: "POST",
    });*/
  };

  /*   useEffect(() => {
    handleSubmit("");
    fetch("/hello").then((resp) =>
      resp.json().then((data) => {
        console.log(data);
      })
    );
  }, []); */

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
};

export default SearchBar;
