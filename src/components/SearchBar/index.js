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

const SearchBox = styled(TextField)(({ theme }) => ({
  "& fieldset": {
    borderRadius: "30px",
  },
  "& .MuiOutlinedInput-root": {
    '&:hover fieldset': {
      border: `${1}px solid`,
      borderColor: `${theme.palette.grey[400]}`,
      boxShadow: `${theme.shadows[4]}`,
    },
    "&.Mui-focused fieldset": {
      border: `${1}px solid`,
      borderColor: `${theme.palette.grey[400]}`,
      width: "100%",
      boxShadow: `${theme.shadows[4]}`,
      transition: "width 200ms ease- out"
    }
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
    console.log(value)
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
      }}
    >
      <Autocomplete
        freeSolo
        disableListWrap
        options={options}
        getOptionLabel={option => option}
        onInputChange={(e) => setQuery(e.currentTarget.value)}
        onChange={(e, value) => handleSubmit(e, value)}
        clearIcon={<ClearRoundedIcon fontSize="medium" />}
        PaperComponent={({ children }) => (
          <Paper style={{ background: "yellow", height: "120%" }}>{children}</Paper>
        )}
        renderInput={(params) => (
          <SearchBox
            {...params}
            size={size || "large"}
            label="Search a tech or need"
            variant="outlined"
            InputLabelProps={{
              ...params.InputLabelProps,
            }}
            InputProps={{
              ...params.InputProps,
              type: 'search',
              /* endAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <SearchRoundedIcon />
                  </IconButton>
                </InputAdornment>
              ), */

            }}
          />
        )}
      >
      </Autocomplete>
    </Box>

  );
};

export default SearchBar;
