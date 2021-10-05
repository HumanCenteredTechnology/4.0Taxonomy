import React from "react";
import Button from "@material-ui/core/Button";
import TopicChip from "../TopicChip";
import { Card, CardHeader, CardContent, CardActions, Link, Box, Divider, Grid } from "@material-ui/core";



const Result = ({ name, parent, category, articles }) => {

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardHeader title={name} subheader={category + " / " + parent} />
      <Divider variant="middle" />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item >
            <p>Resources</p>
            <Box padding={1} overflow="hidden" textOverflow="ellipsis">
              <ul>
                {articles.map((article, i) => {
                  return (
                    <li> <Link key={i} href={article[1]} underline="none"> {article[0]} </Link> </li>
                  )
                })}
              </ul>
            </Box>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item>
            <p>Related technologies</p>
            <Box sx={{ my: 2 }}>
              <Grid container
                columnSpacing={{ xs: 0, md: 2 }}
                rowSpacing={{ xs: 2, md: 2 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                justifyContent="flex-start"
                direction="row">
                {/* {articles.topics.map((topic, i) => {
                  return (
                    <Grid item key={i}>
                      <TopicChip
                        key={i}
                        label={topic[0]}
                        name={topic[1]}
                        clickable={true}
                        link={topic[2]}
                      />
                    </Grid>
                  )
                })} */}
              </Grid>
            </Box>
          </Grid>
        </Grid>

      </CardContent>
      <CardActions>
        {/* <ViewResultButton /> */}
      </CardActions>



    </Card>
  );
};

const ViewResultButton = () => {
  return (
    <div className="buttonContainer">
      <Button href="#text-buttons">
        View
      </Button>
    </div>
  );
};

export default Result;
