import React from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, AppBar, Toolbar, IconButton } from '@mui/material';
import { HomeRounded } from '@mui/icons-material';
import StandardButton from '../controls/StandardButton';

const TopNavBar = ({ isHome, isForm }) => {
    return (
        <AppBar
            position="static"
            edge="start"
            color="transparent"
            elevation={0}
            sx={{
                shadows: 0,
            }}
        >
            <Toolbar>
                {!isHome ? <IconButton aria-label="home" component={RouterLink} to="/">
                    <HomeRounded />
                </IconButton>
                    : <></>}
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
    )
}

export default TopNavBar;