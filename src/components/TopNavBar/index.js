import React, { useState } from 'react'
import { useFetch } from '../../hooks/useFetch';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import { Box, AppBar, Toolbar, IconButton, Button, Tooltip, useScrollTrigger, Typography } from '@mui/material';
import { CssBaseline } from '@mui/material';
import Fade from '@mui/material/Fade';
import { HomeRounded } from '@mui/icons-material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

import StandardButton from '../controls/StandardButton';
import SearchBar from "../SearchBar";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from "@mui/material/styles";
import Logo from '../../images/PLANET4_logo_4_BLACK.png';

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



const TopNavBar = ({ isHome, isResults, isForm, children, openDrawer, setOpenDrawer }) => {
    const theme = useTheme()
    const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumDevice = useMediaQuery(theme.breakpoints.up('sm'));
    const { queryId } = useParams();
    const { setSearchMention } = useFetch(queryId);

    const handleClickMenu = () => {
        if (openDrawer) setOpenDrawer(false)
        else setOpenDrawer(true)
        console.log("drawer: " + openDrawer)
    }

    return (
        <CssBaseline>
            <ElevationScroll children={children} hidden={isSmallDevice} isResults={isResults} isHome={isHome}>
                <AppBar

                    position={isHome ? "static" : "sticky"}
                    edge="start"
                    color="inherit"
                >
                    <Toolbar >
                        {isResults &&
                            <Tooltip title="Open database" arrow>
                                <IconButton aria-label="open database" component="button" onClick={handleClickMenu}>
                                    <MenuRoundedIcon />
                                </IconButton>
                            </Tooltip>
                        }
                        <Box sx={{ flexGrow: 1, maxWidth: "100px" }} />

                        {!isHome &&
                            <Tooltip title="Go to Homepage" arrow>
                                <Box>
                                    <IconButton disableFocusRipple sx={{ marginRight: 2 }} aria-label="home"
                                        component={RouterLink} to="/">
                                        <img width="20" src={Logo} class="custom-logo" alt="Planet4" />
                                        <Typography variant="body1" color="default">Taxonomy</Typography>
                                    </IconButton>

                                </Box>
                            </Tooltip>

                        }
                        <Box sx={{ flexGrow: 1, maxWidth: "100px" }} />
                        {isSmallDevice ? <Box sx={{ flexGrow: 1, maxWidth: "5px" }} /> : <Box sx={{ flexShrink: 1, }} />}

                        {isResults ? isSmallDevice ?
                            <SearchBar size={"small"} maxWidth={"100%"} />
                            : <SearchBar size={"small"} width={"27em"} maxWidth={"34em"} />
                            : <></>}
                        {isSmallDevice ? <Box sx={{ flexGrow: 1, maxWidth: "5px" }} /> : <Box sx={{ flexGrow: 1, }} />}

                        {/* {!isForm ? !isSmallDevice ?
                            <StandardButton
                                variant="text"
                                text="Add Article"
                                size="small"
                                color="inherit"
                                component={RouterLink}
                                to="/form"
                            />
                            : <></> : <></>
                        } */}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
        </CssBaseline>
    )
}

export default TopNavBar;