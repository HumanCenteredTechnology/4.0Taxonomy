import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Paper, makeStyles } from "@material-ui/core";
import AddArticleForm from "../AddArticleForm";
import StandardButton from "../controls/StandardButton";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
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
      <Paper className={classes.pageContent} elevation="3">
        <AddArticleForm />
      </Paper>
    </>
  );
};

export default FormPage;
