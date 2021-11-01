import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import API from "../../API";

//Styles
import { styled, alpha } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Divider } from "@material-ui/core";
import { Autocomplete, TextField, IconButton, Paper } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { useFetch } from "../../hooks/useFetch";

const SearchBox = styled(Autocomplete)(({ theme }) => ({
  "& fieldset": {
    borderRadius: "30px",
  },
  "& .MuiOutlinedInput-root": {

    '&:hover fieldset': {
      border: `${0}px solid`,
      borderColor: `${theme.palette.grey[400]}`,
      boxShadow: `${theme.shadows[4]}`,
    },
    "&.Mui-focused fieldset": {
      border: `${0}px solid`,
      borderColor: `${theme.palette.grey[400]}`,
      width: "100%",
      boxShadow: `${theme.shadows[4]}`,
      transition: "width 200ms ease- out"
    },
  },
  "& .MuiInputLabel-root": {
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    whiteSpace: "nowrap",
    width: 1
  }
}));




const SearchBar = ({ size, maxWidth }) => {
  const { queryId } = useParams();
  const { setQuery, options, setSearchMention } = useFetch();

  useEffect(() => {
    setQuery(queryId)
  }, [queryId])

  let navigate = useNavigate();

  const handleSubmit = (e, value) => {
    if (value === "" || value === undefined) return;
    setSearchMention(value);
    navigate("/" + value);
  };
  const searchQueryMatches = (input) => {
  }

  return (
    <Box
      sx={{
        margin: "auto",
        maxWidth: maxWidth || "60%",
        bgcolor: "white",
        borderRadius: 30,
        flexGrow: 1
      }}
    >
      <SearchBox
        freeSolo
        id="search-bar"
        options={options}
        getOptionLabel={option => option}
        onInputChange={(e) => setQuery(e.currentTarget.value)}
        onChange={(e, value) => handleSubmit(e, value)}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <InputAdornment position="start">
              <SearchRoundedIcon />
            </InputAdornment>
            {option}
          </li>
        )}
        PaperComponent={({ children }) => (
          <Paper elevation={4} sx={{ marginTop: "3px", background: "white" }}>{children}</Paper>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            size={size || "large"}
            placeholder="Search a tech or need"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              type: 'text',
              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <SearchRoundedIcon />
                  </InputAdornment>
                </>
              ),
            }}
          />
        )}
      >
      </SearchBox>
    </Box>

  );
};

export default SearchBar;
