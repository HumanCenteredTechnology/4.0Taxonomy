import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import API from "../../API.js";
//Styles

import TextField from "@material-ui/core/TextField";
import { Box, styled } from "@material-ui/core";

const SearchBox = styled(TextField)(() => ({
  "& fieldset": {
    borderRadius: "30px",
  },
}));

const SearchBar = ({ setSearchMention }) => {
  /*   const { queryId } = useParams();
    let query = () => {
      if (queryId === "") return "";
      else return queryId;
    } */
  const [state, setState] = useState("");    //da controllare, passa da input non controllato a controllato


  let navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchMention(state);
    navigate("/" + state);
  };
  return (
    <form className="searchBar" onSubmit={handleSubmit}>
      <Box
        sx={{
          margin: "auto",
          width: 500,
          maxWidth: "100%",
          bgcolor: "white",
          borderRadius: 30,
        }}
      >
        <SearchBox
          sx={{
            borderRadius: 40,
          }}
          fullWidth
          className="input"
          name="search-input"
          id="outlined-basic"
          //label="Search"
          placeholder="Search a tech or need"
          value={state}
          variant="outlined"
          onChange={(e) => setState(e.currentTarget.value)}
        />

      </Box>
    </form>
  );
};

export default SearchBar;
