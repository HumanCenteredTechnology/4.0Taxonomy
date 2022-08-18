import React, { Fragment, useEffect, useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import { Card, Link, Box, Divider, Grid, List, ListItem, Typography, ListItemText} from "@material-ui/core";
import { CardActions, CardContent, Paper, Skeleton, Stack, Tooltip } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import TopicsList from "../TopicsList";
import { blue } from "@mui/material/colors";
import { element } from "prop-types";
import { color } from "@mui/system";

const Result = ({ elCard }) => {
  const [readMore, setReadMore] = useState(false);

  /* Function di controllo del bottone '...show More' della Card */
  const switchReadMore = (event) =>{
    if (readMore===true) {
      setReadMore(false)
    } else{
      setReadMore(true)
    }
  }

  const entireAbstractText = elCard.abstract;

  /* Pallino di separazione tra gli Authors */
  const shot = (
    <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>•</Box>
  );


  return (
      <Box sx={{ justifyContent: 'center', p: 0, mb: 0.3}}>
      <Card>
        <Box sx={{
            justifyContent: 'center',
            pt: 1,
            pb: 1,
            pl: 1,
            pr: 1,
          }}>
          {/* Titolo Articolo */}
          <Link component={RouterLink} to={"/SingleResult/" + elCard.id + '/' + elCard.title}>
            <Typography  variant="h6" color="textPrimary" >{elCard.title}</Typography>
          </Link>

          {/* Tipologia articolo, data pubblicazione */}
          <Grid container spacing={1} alignContent="center">
            <Grid item>
              <Typography style={{ backgroundColor: "#30dbd0", padding: "2px 3px", fontfamily:"Arial", fontSize: "12px", }}>
                  {elCard.source_type}
              </Typography>
            </Grid>
            <Grid item><Typography variant="body2">{elCard.publishing_date}</Typography></Grid>
            {elCard.journal!='' ? <Grid item><Typography variant="body2">: {elCard.journal}</Typography></Grid> : <></>}
          </Grid>

          {/* Lista degli autori */}
          <Box>
            <Box component="span" sx={{ display: 'inline-block', mx: '2px'}}>Authors:</Box>
              {elCard.authors.map((el, index) => {
                    return(<>
                      <Button variant="text" size="small" startIcon={<AccountCircleIcon />} style={{padding: "0px 0px", margin: "3px 4px",}}>
                        {el}
                      </Button>{index<elCard.authors.length-1 ? <>{shot}</> : <></>}
                    </>); })
              }
          </Box>

          {/* Testo Abstract */}
          <Typography variant="body2" gutterBottom>
              {!readMore ? entireAbstractText.substring(0,350) : entireAbstractText}
              <Link align="center" onClick={switchReadMore} href="#">{!readMore ? "...read more" : "read less"}</Link>
          </Typography>
          
          {/* Elementi della Topics List */}
          <Grid container spacing={0} padding={0}>
            <Grid item>
                <Box sx={{spacing:'0', padding:'0'}}>
                  <TopicsList results={elCard.tax_keywords.needs} category={Object.keys(elCard.tax_keywords)[0]} ></TopicsList>
                  <TopicsList results={elCard.tax_keywords.tech} category={Object.keys(elCard.tax_keywords)[1]}></TopicsList>
                </Box>
            </Grid>
          </Grid>

        </Box>
      </Card>
    </Box>
  );
};

const Resources = ({ articles }) => {
  const [isLong, setIsLong] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [buttonText, setButtonText] = useState('Show More')

  const handleShowMore = () => {
    if (showMore === true) {
      setShowMore(false);
      setButtonText('Show more')
    } else {
      setShowMore(true);
      setButtonText('Show less')
    }

  }

  useEffect(() => {
    if (articles.length > 4) {
      setIsLong(true)
    } else {
      setIsLong(false)
    }
  }, [articles])

  return (

    <Box >
      <List disablePadding dense>
        {isLong ?
          <> {
            articles.slice(0, 4)
              .map((art, i) => {
                return (
                  <Article key={art + i} art={art} />
                )
              })
          }</> : <>
            {
              articles.map((art, i) => {
                return (
                  <Article key={art + i} art={art} />
                )
              })
            } </>
        }
        {showMore ? <>
          {
            articles.slice(4)
              .map((art, i) => {
                return (
                  <Article key={art + i} art={art} />
                )
              })
          }
        </> : <></>}
      </List>
      {isLong ? <Button size="small" onClick={handleShowMore}>{buttonText}</Button> : <> </>}
    </Box>
  )
}

const Article = ({ art }) => {
  let isPdf = false;
  if (art[1].endsWith('pdf')) isPdf = true
  return (
    <ListItemText>
      <Tooltip title={isPdf ? "Opens a pdf in a new window" : "Opens in a new window"} followCursor>
        <Link rel="noopener noreferrer" target="_blank" href={art[1]} >
          <Typography variant="body2" noWrap >
            {art[0]}
          </Typography>
        </Link>
      </Tooltip>
    </ListItemText>
  );
};

const ViewResultButton = () => {
  return (
    <div className="buttonContainer">
      <Button href="#text-buttons">
        View Use Cases
      </Button>
    </div>
  );
};

export default Result;
