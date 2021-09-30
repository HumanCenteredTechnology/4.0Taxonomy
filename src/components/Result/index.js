import React from "react";
import Button from "@material-ui/core/Button";
import TopicChip from "../TopicChip";
import { Card, CardHeader, CardContent, CardActions, Link } from "@material-ui/core";

const Result = ({ name, parent, category, links }) => {

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardHeader title={name} subheader={category + " / " + parent} />
      <CardContent>
        {links.map((link, i)=>{
          return (
            <Link href={link} underline="none"> Link {i} </Link>
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

      <ViewResultButton />
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
