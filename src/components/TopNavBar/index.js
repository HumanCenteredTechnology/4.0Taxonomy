import React from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, AppBar, Toolbar, IconButton } from '@mui/material';
import { HomeRounded } from '@mui/icons-material';
import StandardButton from '../controls/StandardButton';

export const TopNavBar = ({ homeIcon }) => {
    let navigate = useNavigate();
    const homeButtonClick = () => {
        navigate('/')
    }
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
                {homeIcon ? <IconButton aria-label="home" onClick={homeButtonClick}>
                    <HomeRounded />
                </IconButton>
                    : <></>}
                <Box sx={{ flexGrow: 1 }} />
                <StandardButton
                    variant="text"
                    text="Add Article"
                    size="small"
                    color="inherit"
                    component={RouterLink}
                    to="/form"
                />
            </Toolbar>
        </AppBar>
    )
}
