import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

//Styles

import { Box, styled, TextField } from "@material-ui/core";
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const SearchBox = styled(TextField)(({ theme }) => ({
  "& fieldset": {
    borderRadius: "30px",
    [theme.breakpoints.down('md')]: {
      maxWidth: "300",
    },
  },

}));

const SearchBar = ({ size, setSearchMention }) => {
  const { queryId } = useParams();
  const [state, setState] = useState("");    //da controllare, passa da input non controllato a controllato

  useEffect(() => {
    setState(queryId)
  }, [queryId])

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state === "" || state === undefined) return;
    setSearchMention(state);
    navigate("/" + state);
  };
  return (
    <form className="searchBar" onSubmit={handleSubmit}>
      <Box
        sx={{
          margin: "auto",
          width: 500,
          maxWidth: "80%",
          bgcolor: "white",
          borderRadius: 30,
        }}
      >
        <SearchBox
          fullWidth
          size={size || "large"}
          className="input"
          name="search-input"
          id="outlined-basic"
          //label="Search"
          placeholder="Search a tech or need"
          value={state}
          variant="outlined"
          onChange={(e) => setState(e.currentTarget.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </form>
  );
};

export default SearchBar;
