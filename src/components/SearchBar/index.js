import React from 'react';
import TextField from '@material-ui/core/TextField';
//Styles
import './SearchBar.css';

const SearchBar = () => {
    return (
        <div className="searchBar">
            <TextField className="input"
                id="outlined-basic"
                label="Search"
                variant="outlined"
            />
        </div>
    )
}

export default SearchBar;