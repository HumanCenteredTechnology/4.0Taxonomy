import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Card, Container, makeStyles, AppBar, Toolbar, Box } from "@material-ui/core";

//Components
import AddArticleForm from "../AddArticleForm";
import StandardButton from "../controls/StandardButton";



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
    <Container>
      <AppBar
        position="static"
        edge="start"
        color="transparent"
        elevation={0}
        sx={{
          shadows: 0,

        }}
      >
        <Toolbar>
          <StandardButton
            variant="text"
            text="Go Back"
            size="small"
            color="default"
            component={RouterLink} //se ci fosse un context si potrebbe tornare indietro
            to="/"
          />
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>


      <Card className={classes.pageContent} sx={{ width: "50%" }}>
        <AddArticleForm />
      </Card>

    </ Container>
  );
};

export default FormPage;
