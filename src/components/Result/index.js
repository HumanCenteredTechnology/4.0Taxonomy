import React, { useEffect, useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import TopicChip from "../TopicChip";
import { Card, Tooltip, Link, Box, Divider, Grid, List, ListItem, Typography, ListItemText } from "@material-ui/core";
import { Skeleton } from "@mui/material";

const topic = [["Data Science", "Technology"], ["Databases", "Technology"]]
const wiki = "Velit qui nisi nisi amet adipisicing incididunt dolor. Exercitation cupidatat veniam ut fugiat tempor quis esse sit excepteur. Cupidatat aute in ullamco minim minim Lorem officia deserunt amet labore nostrud quis esse..."

const Result = ({ name, parent, category, articles, loading }) => {


  return (
    <Box sx={{
      justifyContent: 'center',
      p: 1,
      m: 0,
    }}>
      <Card>
        <Box sx={{
          justifyContent: 'center',
          p: 2,
          m: 0,
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
          <Box sx={{ p: 2, my: 0 }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="body1" >Resources:</Typography>
                <Resources articles={articles} />
              </Grid>
              {/*  <Grid item xs={1}>
        <Divider orientation="vertical" />
      </Grid>
      <Grid item xs={5}>

        <Typography variant="body1" >Related technologies</Typography>
        <Grid container
          spacing={1}
          columnspacing={{ xs: 1 }}
          rowspacing={{ xs: 1 }}
          columns={{ xs: 1 }}
          justifycontent="flex-start"
          direction="row">
          {topic.map((topic, i) => {
            return (
              <Grid item key={topic + i}>
                <TopicChip
                  key={topic[0]}
                  label={topic[0]}
                  name={topic[1]}
                  clickable={true}
                  link={topic[2]}
                  size={"small"}
                />
              </Grid>
            )
          })}
        </Grid>
      </Grid> */}
            </Grid>
          </Box>
          :
          <></>
        }

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
  return (
    <ListItemText  >
      <Link href={art[1]} >
        <Typography variant="body2" noWrap >
          {art[0]}
        </Typography>
      </Link>
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
