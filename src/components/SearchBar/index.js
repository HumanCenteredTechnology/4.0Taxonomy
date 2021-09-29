import React, { useState, useEffect } from "react";

import API from "../../API.js";
//Styles
import "./SearchBar.css";
import TextField from "@material-ui/core/TextField";
import { Box, styled, Grid } from "@material-ui/core";

const SearchBox = styled(TextField)(() => ({
  "& fieldset": {
    borderRadius: "30px",
  },
}));

const SearchBar = ({ setSearchMention }) => {
  const [state, setState] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchMention(state);
  };
  return (
    <Grid>
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
    </Grid>

  );
};

export default SearchBar;
