import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

//Styles
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, styled, TextField } from "@material-ui/core";
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const SearchBox = styled(TextField)(({ theme }) => ({
  "& fieldset": {
    borderRadius: "30px",
  },

}));

const SearchBar = ({ size, maxWidth, setSearchMention }) => {
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
          maxWidth: maxWidth || "60%",
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
