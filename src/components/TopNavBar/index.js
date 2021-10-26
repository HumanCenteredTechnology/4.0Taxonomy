import React from 'react'
import { useFetch } from '../../hooks/useFetch';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import { Box, AppBar, Toolbar, IconButton, useScrollTrigger } from '@mui/material';
import { CssBaseline } from '@mui/material';
import { HomeRounded } from '@mui/icons-material';
import StandardButton from '../controls/StandardButton';
import SearchBar from "../SearchBar";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from "@mui/material/styles";

const ElevationScroll = ({ children }) => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    })

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0
    });
}


const TopNavBar = ({ isHome, isForm, children }) => {
    const theme = useTheme()
    const hidden = useMediaQuery(theme.breakpoints.down('sm'));
    const { queryId } = useParams();

    const { setSearchMention } = useFetch(queryId);
    return (
        <CssBaseline>
            <ElevationScroll children={children}>
                <AppBar
                    position="sticky"
                    edge="start"
                    color="inherit"
                >
                    <Toolbar variant="dense">
                        {!isHome ? <IconButton aria-label="home" component={RouterLink} to="/">
                            <HomeRounded />
                        </IconButton>
                            : <></>}
                        <Box sx={{ flexGrow: 1 }} />

                        {hidden ? !isHome & !isForm ? <SearchBar setSearchMention={setSearchMention} size={"small"} /> : <></> : <></>}
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