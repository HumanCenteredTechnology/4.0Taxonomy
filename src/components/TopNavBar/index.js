import React, { useState } from 'react'
import { useFetch } from '../../hooks/useFetch';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import { Box, AppBar, Toolbar, IconButton, useScrollTrigger } from '@mui/material';
import { CssBaseline } from '@mui/material';
import Fade from '@mui/material/Fade';
import { HomeRounded } from '@mui/icons-material';
import StandardButton from '../controls/StandardButton';
import SearchBar from "../SearchBar";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from "@mui/material/styles";
import PropTypes from 'prop-types';

const ElevationScroll = ({ children, isSmallDevice, isHome }) => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    })

    if (children.type === AppBar) {
        if (isSmallDevice || !isHome) {
            return React.cloneElement(children, {
                elevation: trigger ? 4 : 0
            });
        } else return React.cloneElement(children, {
            elevation: 0
        });
    }

    if (children.type === SearchBar) {
        return (
            <Fade in={trigger}>
                <Box sx={{ flexGrow: 1 }}>
                    {children}
                </Box>
            </Fade>
        );
    }


}


const TopNavBar = ({ isHome, isResults, isForm, children }) => {
    const theme = useTheme()
    const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'));
    const { queryId } = useParams();
    const { setSearchMention } = useFetch(queryId);

    return (
        <CssBaseline>
            <ElevationScroll children={children} hidden={isSmallDevice} isResults={isResults} isHome={isHome}>
                <AppBar
                    position={isHome ? "static" : "sticky"}
                    edge="start"
                    color="inherit"
                >
                    <Toolbar variant="dense">
                        {!isHome ? <IconButton aria-label="home" component={RouterLink} to="/">
                            <HomeRounded />
                        </IconButton>
                            : <></>}
                        {isSmallDevice ? <Box sx={{ flexGrow: 1 }} /> : <></>}

                        {isResults ? isSmallDevice ?
                            <SearchBar setSearchMention={setSearchMention} size={"small"} maxWidth={"100%"} />
                            : <ElevationScroll children={children}><SearchBar setSearchMention={setSearchMention} size={"small"} maxWidth={"80%"} /></ElevationScroll>
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
            </ElevationScroll>
        </CssBaseline>
    )
}

export default TopNavBar;