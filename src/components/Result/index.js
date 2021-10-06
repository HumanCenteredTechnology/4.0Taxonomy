import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TopicChip from "../TopicChip";
import { Card, CardHeader, CardContent, CardActions, Link, Box, Divider, Grid, List, ListItem, Typography, ListItemText } from "@material-ui/core";


const topic = [["Data Science", "Technology"], ["Databases", "Technology"]]

const Result = ({ name, parent, category, articles }) => {

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
      <Typography sx={{ fontSize: 14 }} color="textSecondary" >
        {parent}
      </Typography>
      <Typography variant="h5"  >
        {name}
      </Typography>
      </Box>
      
      {/* <Divider variant="middle" /> */}
      <Box>
        <Grid container spacing={1}>
          {/* <Grid item xs={6}>
            <Typography variant="body1" >Resources:</Typography>
            <Resources articles={articles} />
          </Grid>
          <Grid item xs={1}>
            <Divider orientation="vertical" />
          </Grid> */}
          <Grid item xs={5}>
            
            <Box sx={{ p:2, my: 0 }}>
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
                        key={i}
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
            </Box>
          </Grid>
        </Grid>

      </Box>
      <CardActions>
        <ViewResultButton /> 
      </CardActions>



    </Card>
    </Box>
  );
};

const Resources = ({ articles }) => {
  const [isLong, setIsLong] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    if (showMore === true)
      setShowMore(false);
    else setShowMore(true);

  }

  useEffect(() => {
    if (articles.length > 4) {
      setIsLong(true)
    } else {
      setIsLong(false)
    }
  }, [articles])
  return (
    <Box component="div" >
      <List>
        {isLong ?
          <> {
            articles.slice(0, 4)
              .map((article, i) => {
                return (
                  <ListItemText  > <Link key={article + i} href={article[1]} >
                    <Typography variant="body2" noWrap >
                      {article[0]}
                    </Typography>
                  </Link> </ListItemText>
                )
              })
          }</> : <>
            {
              articles.map((article, i) => {
                return (
                  <ListItemText > <Link key={article + i} href={article[1]} >
                    <Typography variant="body2" noWrap>
                      {article[0]}
                    </Typography>
                  </Link> </ListItemText>
                )
              })
            } </>}
        {showMore ? <>
          {
            articles.slice(4)
              .map((article, i) => {
                return (
                  <ListItemText > <Link key={article + i} href={article[1]} >
                    <Typography variant="body2" noWrap>
                      {article[0]}
                    </Typography>
                  </Link> </ListItemText>
                )
              })
          }
        </> : <></>}
      </List>
      {isLong ? <Button variant="text" onClick={handleShowMore}>Show more</Button> : <> </>}


    </Box>
  )
}

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
