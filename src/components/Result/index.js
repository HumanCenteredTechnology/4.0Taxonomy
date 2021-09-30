import React from "react";
import Button from "@material-ui/core/Button";
import TopicChip from "../TopicChip";
import { Card, CardHeader, CardContent, CardActions, Link, Box, Divider } from "@material-ui/core";



const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
const Result = ({ name, parent, category, links }) => {

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardHeader title={name} subheader={category + " / " + parent} />
      <Divider variant="middle" />
      <CardContent>
        {links.map((link, i)=>{
          return (
            <Link key={i} href={link} underline="none"> Link {i} {bull} </Link>
          )
        })}
        {/* <p>{links}</p> */}

        {/*         <TopicChip
          label={parent}
          name={category}
          variant="outlined"
          size="small"
        /> */}
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
