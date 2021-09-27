import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Card, makeStyles } from "@material-ui/core";

import AddArticleForm from "../AddArticleForm";
import StandardButton from "../controls/StandardButton";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(8),
    padding: theme.spacing(1),
  },
}));

const FormPage = () => {
  const classes = useStyles();

  return (
    <>
      <StandardButton
        variant="outlined"
        text="Go Back"
        size="small"
        color="default"
        component={RouterLink}
        to="/"
      />
      <Card className={classes.pageContent} sx={{ width: "50%" }} elevation="3">
        <AddArticleForm />
      </Card>
    </>
  );
};

export default FormPage;
