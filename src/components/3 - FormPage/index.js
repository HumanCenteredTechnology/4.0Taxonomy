import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Card, Container, makeStyles, AppBar, Toolbar, Box } from "@material-ui/core";

//Components
import AddArticleForm from "../AddArticleForm";
import StandardButton from "../controls/StandardButton";
import TopNavBar from "../TopNavBar";



const useStyles = makeStyles((theme) => ({
  pageContent: {
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(16),
      marginRight: theme.spacing(16),
      marginTop: theme.spacing(4),
      padding: theme.spacing(1),
    },
    [theme.breakpoints.between('sm', 'md')]: {
      marginLeft: theme.spacing(8),
      marginRight: theme.spacing(8),
      marginTop: theme.spacing(2),
      padding: theme.spacing(1),
    },
    [theme.breakpoints.between('xs', 'sm')]: {
      margin: theme.spacing(0),
      padding: theme.spacing(1),
    }
  },
}));

const FormPage = () => {
  const classes = useStyles();
  return (
    <Box>
      <TopNavBar isForm={true} />
      <Container>



        <Card className={classes.pageContent} sx={{ width: "50%" }}>
          <AddArticleForm />
        </Card>

      </ Container>
    </Box>
  );
};

export default FormPage;
