import React from "react";
import Button from "@material-ui/core/Button";

const Result = ({ name, parent, links }) => {
  return (
    <article className="result">
      <h3>{name}</h3>
      <p>{parent}</p>
      <p>{links}</p>

      <ViewResultButton />
    </article>
  );
};

const ViewResultButton = () => {
  return (
    <div className="buttonContainer">
      <Button href="#text-buttons" color="black">
        View
      </Button>
    </div>
  );
};

export default Result;
