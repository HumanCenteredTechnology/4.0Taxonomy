import React, { useState } from "react";
import "./ViewMenuButton.css";
import Button from "@material-ui/core/Button";

const ViewMenuButton = ({ callback }) => {
  return (
    <div className="viewMenuWrapper" type="button" onClick={callback}>
      <Button size="medium" color="default">
        or view the menu
      </Button>
      <img className="viewMenuIcon" src="" />
    </div>
  );
};
export default ViewMenuButton;

//viewMenuIcon: an arrow pointing down
