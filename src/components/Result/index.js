import React, { useEffect, useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import TopicChip from "../TopicChip";
import { Card, Link, Box, Divider, Grid, List, ListItem, Typography, ListItemText } from "@material-ui/core";
import { CardActions, CardContent, Skeleton, Tooltip } from "@mui/material";

const topic = [["Data Science", "Technology"], ["Databases", "Technology"]]
const wiki = "Velit qui nisi nisi amet adipisicing incididunt dolor. Exercitation cupidatat veniam ut fugiat tempor quis esse sit excepteur. Cupidatat aute in ullamco minim minim Lorem officia deserunt amet labore nostrud quis esse..."

const Result = ({ name, parent, category, articles, loading }) => {


  return (
    <Box sx={{
      justifyContent: 'center',
      p: 0,
      mb: 2,
    }}>
      <Card>
      <Box sx={{
          justifyContent: 'center',
          pt: 1,
          pb: 1,
          pl: 2,
          pr: 2,
        }}>
        <Box sx={{
          mb: 1
        }}>
          <Link
            component={RouterLink}
            to={"/" + parent}>
            <Typography variant="body2" color="textSecondary" >
              {parent}
            </Typography>
          </Link>
          <Link
            component={RouterLink}
            to={"/" + name}>
            <Typography variant="h6" gutterBottom  >
              {name}
            </Typography>
          </Link>
          <Typography variant="body2">
            {wiki} <Link href="#">Read more</Link>
          </Typography>
        </Box>
        {/* <Divider variant="middle" /> */}
        
          {Array.isArray(articles) ?
            <Box sx={{}}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="body1" >Sources:</Typography>
                  <Resources articles={articles} />
                </Grid>
              </Grid>
            </Box>
            :
            <></>
          }
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
      <List disablePadding>
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
        <Link href={art[1]} >
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
