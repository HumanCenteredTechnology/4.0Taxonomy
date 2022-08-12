import React, { useEffect, useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import TopicChip from "../TopicChip";
import { Card, Link, Box, Divider, Grid, List, ListItem, Typography, ListItemText } from "@material-ui/core";
import { CardActions, CardContent, Skeleton, Tooltip } from "@mui/material";

import TopicsList from "../TopicsList";
import { blue } from "@mui/material/colors";
import { element } from "prop-types";

const topic = [["Data Science", "Technology"], ["Databases", "Technology"]]
const wiki = "Velit qui nisi nisi amet adipisicing incididunt dolor. Exercitation cupidatat veniam ut fugiat tempor quis esse sit excepteur. Cupidatat aute in ullamco minim minim Lorem officia deserunt amet labore nostrud quis esse..."

const Result = ({ elCard }) => {
  const [readMore, setReadMore] = useState(false);

  /* Function di controllo del bottone '...show More' della Card */
  const switchReadMore = (event) =>{
    if (readMore===true) {
      setReadMore(false)
    } else{
      setReadMore(true)
    }
    console.log(elCard.tax_keywords[0])
  }

  const entireAbstractText = elCard.abstract;

  return (
      <Box sx={{ justifyContent: 'center', p: 0, mb: 2}}>
      <Card>
        <Box sx={{
            justifyContent: 'center',
            pt: 1,
            pb: 1,
            pl: 1,
            pr: 1,
          }}>
          <Box sx={{mb: 1}}>
            <Link
              component={RouterLink}
              to={"/" + elCard.url}>
              <Typography  variant="h6" color="textSecondary" >{elCard.title}</Typography>
            </Link>
                       
            <Typography  variant="subtitle2"><Button variant="contained" size="small" disabled>Author:</Button>{elCard.authors}</Typography>
            <Typography variant="body2" gutterBottom>
               {! readMore ? entireAbstractText.substring(0,400) : entireAbstractText}
               <Link align="center" onClick={switchReadMore} href="#">...read more or less</Link>
            </Typography>
            
          </Box>
          {/* <Divider variant="middle" /> */}
        
          {/* Elementi della Topics List */}
          <Grid container spacing={5}>
            <Grid item>
                <Box sx={{}}>
                  {/* <TopicsList results={elCard.tax_keywords.needs}></TopicsList> */}
                  
                </Box>
            </Grid>
            <Grid item>
              {Array.isArray(['1','2','3']) ?
                <Box sx={{}}>
                  <TopicsList results={['1','2','3']}></TopicsList>
                </Box>
                :
                <></>
              }
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
