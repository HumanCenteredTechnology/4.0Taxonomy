import React from 'react'
import { useFetch } from '../../hooks/useFetch';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import { Box, AppBar, Toolbar, IconButton } from '@mui/material';
import { CssBaseline } from '@mui/material';
import { HomeRounded } from '@mui/icons-material';
import StandardButton from '../controls/StandardButton';
import SearchBar from "../SearchBar";


const TopNavBar = ({ isHome, isForm }) => {
    const { queryId } = useParams();

    const { setSearchMention } = useFetch(queryId);
    return (
        <CssBaseline>
            <AppBar
                position="sticky"
                edge="start"
                color="inherit"
                elevation={1}
                sx={{
                    width: "100%",
                    shadows: 1,
                }}
            >
                <Toolbar>
                    {!isHome ? <IconButton aria-label="home" component={RouterLink} to="/">
                        <HomeRounded />
                    </IconButton>
                        : <></>}
                    <Box sx={{ flexGrow: 1 }} />
                    {!isHome & !isForm ? <SearchBar setSearchMention={setSearchMention} size={"small"} /> : <></>}
                    <Box sx={{ flexGrow: 1 }} />
                    {!isForm ?
                        <StandardButton
                            variant="text"
                            text="Add Article"
                            size="small"
                            color="inherit"
                            component={RouterLink}
                            to="/form"
                        />
                        : <></>
                    }

                </Toolbar>
            </AppBar>
        </CssBaseline>
    )
}

export default TopNavBar;