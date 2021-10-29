import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import API from "../../API";

//Styles
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, styled, Divider } from "@material-ui/core";
import { Autocomplete, TextField } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { useFetch } from "../../hooks/useFetch";

const SearchBox = styled(TextField)(({ theme }) => ({
  "& fieldset": {
    borderRadius: "30px",
  },

}));

const initialQueries = ["s", "as"]


const SearchBar = ({ size, maxWidth, setSearchMention }) => {
  const { queryId } = useParams();
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState(initialQueries)
  const { queryMatch, setQueryMatch } = useFetch(initialQueries);

  useEffect(() => {
    setQuery(queryId)
  }, [queryId])

  useEffect(() => {
    const fetchMatch = async () => {
      const fetchAutocomplete = await API.fetchAutocomplete(query);
      if (fetchAutocomplete == null) {
        console.log("not found")
      } else {
        setQueryMatch(() => ({
          word: [...fetchAutocomplete.word]
        }))
        console.log(queryMatch)
      }

    }


    fetchMatch()

  }, [query])

  useEffect(() => {
    //setOptions(queryMatch)
  }, [queryMatch])

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    if (query === "" || query === undefined) return;
    setSearchMention(query);
    navigate("/" + query);
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
        options={options}
        getOptionLabel={option => option}
        onInputChange={(e) => setQuery(e.currentTarget.value)}
        onChange={(e) => handleSubmit(e)}
        clearIcon={<ClearRoundedIcon fontSize="medium" />}
        filterOptions={(options, state) => options}
        renderInput={(params) => (
          <SearchBox
            {...params}
            size={size || "large"}
            label="Search a tech or need"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              type: 'search',
              endAdornment: (
                <InputAdornment position="end">
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <SearchRoundedIcon />
                </InputAdornment>
              )
            }}
          />
        )}
      >

      </Autocomplete>
    </Box>

  );
};

export default SearchBar;
{/* <form className="searchBar" onSubmit={handleSubmit}>
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
          value={query}
          variant="outlined"
          onChange={(e) => setQuery(e.currentTarget.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </form> */}