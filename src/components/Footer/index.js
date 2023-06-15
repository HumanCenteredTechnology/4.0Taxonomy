import React, {useState, useEffect} from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Grid, Stack, Tooltip } from '@mui/material';
import Logo from '../../images/PLANET4_logo_PLANETA_BLACK.png'
import EuLogo from '../../images/EN Co-Funded by the EU_POS.png'

const useStyles = makeStyles((theme) => ({
    rootFooter: {
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    rootBox: {
        [theme.breakpoints.down('md')]: {
            justifyContent: 'center'
        }
    },
    footerNav: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginRight: 'auto',
        marginLeft: theme.spacing(3),
        marginBottom: theme.spacing(0),

        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginLeft: 'auto',
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(2),
        }
    },
    footerLink: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.down('md')]: {
            marginBottom: theme.spacing(2),
        }
    },
}));

export default function Footer(props) {
    const theme = useTheme()
    const isSmallDevice = useMediaQuery(theme.breakpoints.down('md'));

    const [stackDirection, setStackdirection] = useState('row');

    useEffect(()=>{
        isSmallDevice ?
            setStackdirection('column')
            : setStackdirection('row')
    },[isSmallDevice])

    const classes = useStyles();

    const content = {
        'brand': { image: Logo, width: 160 },
        'eu_logo': { image: EuLogo, width: 180 },
        'project_number' : '621639-EPP-1-2020-1-IT-EPPKA2-KA',
        'disclaimer' : "The European Commission's support for the production of this publication does not constitute an endorsement of the contents, which reflect the views only of the authors, and the Commission cannot be held responsible for any use which may be made of the information contained therein.",
        'copy': '© 2022 Planet4 All rights reserved.',
        'link1': 'Add article',
        'link2': 'Second Link',
        'link3': 'Third Link',
        'link4': 'Fourth Link',
        ...props.content
    };

    let brand;
    let eu_logo;

    if (content.brand.image) {
        brand = <img src={content.brand.image} alt="" width={content.brand.width} />;
    } else {
        brand = content.brand.text || '';
    }
    if (content.eu_logo.image) {
        eu_logo = <img src={content.eu_logo.image} alt="" width={content.eu_logo.width} />;
    } else {
        eu_logo = content.eu_logo.text || '';
    }


    return (
        <footer className={classes.rootFooter}>
            <Container maxWidth="xl">
                <Box py={5} display="flex" flexWrap="wrap" alignItems="center" className={classes.rootBox}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={5}>
                            <Box sx={{height:"0%"}}/>
                            <Stack direction={stackDirection} spacing={3} justifyContent="space-evenly" alignItems="center">
                                <Tooltip title="Opens Planet4 website" followCursor>
                                    <Link href="https://www.planet4project.eu/" color="inherit" underline="none">
                                        {brand}
                                    </Link>
                                </Tooltip>
                                <Typography color="textSecondary" component="p" variant="caption" gutterBottom={false}>{content['copy']}</Typography>
                            </Stack>
                        </Grid>
                        

                        <Grid item xs={12} md={2}/>
                        {/* <Box component="nav" className={classes.footerNav}>
                            <Link href="form" variant="body1" color="textPrimary" className={classes.footerLink}>{content['link1']}</Link>
                            <Link href="#" variant="body1" color="textPrimary" className={classes.footerLink}>{content['link2']}</Link>
                            <Link href="#" variant="body1" color="textPrimary" className={classes.footerLink}>{content['link3']}</Link>
                            <Link href="#" variant="body1" color="textPrimary" className={classes.footerLink}>{content['link4']}</Link>
                        </Box> */}
                        <Grid item xs={12} md={5}>
                            <Stack 
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={1}>
                                <>{eu_logo}</>
                                <Typography color="textSecondary" component="p" variant="caption" gutterBottom={false}>Project Number: {content['project_number']}</Typography>
                            </Stack>
                                <Typography color="textSecondary" component="p" variant="caption" gutterBottom={false}>{content['disclaimer']}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </footer>
    );
}
