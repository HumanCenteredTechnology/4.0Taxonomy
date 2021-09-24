import React, { useState, useEffect } from "react";
import { Paper, makeStyles } from "@material-ui/core";
import AddArticleForm from "../AddArticleForm";

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
      <Paper className={classes.pageContent}>
        <AddArticleForm />
      </Paper>
    </>
  );
};

export default FormPage;
