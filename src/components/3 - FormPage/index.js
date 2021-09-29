import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Card, Container, makeStyles } from "@material-ui/core";
//Hooks
import { useForm } from "../../hooks/useForm";
//Components
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
    <Container>
      <StandardButton
        variant="outlined"
        text="Go Back"
        size="small"
        color="default"
        component={RouterLink} //se ci fosse un context si potrebbe tornare indietro
        to="/"
      />

      <Card className={classes.pageContent} sx={{ width: "50%" }}>
        <AddArticleForm />
      </Card>

    </ Container>
  );
};

export default FormPage;
