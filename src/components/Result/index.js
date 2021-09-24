import React from "react";
import Button from "@material-ui/core/Button";

const Result = ({ mention, category, link }) => {
  return (
    <article className="result">
      <h3>{mention}</h3>
      <p>{category}</p>
      <p>{link}</p>

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
