import React, { useState, useEffect } from "react";
import API from "../../API.js";

//Components
import StandardButton from "../controls/StandardButton";
import TextInput from "../controls/TextInput";
//Hooks
import { useForm } from "../../hooks/useForm";
//Styles
import { CardActions, CardContent, CardHeader, Grid, makeStyles, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {

      margin: theme.spacing(2),
    },
  },
}));



const AddArticleForm = () => {
  const { values, errors, handleChange, handleReset, submit } = useForm();
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    submit();

  };



  return (
    <form className={classes.root} onSubmit={handleSubmit} autoComplete="off">
      <CardHeader
        title="Submit an article"
        subheader="Complete the form"
      />
      <CardContent>
        <Grid container spacing={1}>
          <Grid  >
            <Grid item md={5} xs={10} xl={4}>
              <TextInput
                variant="outlined"
                label="Title"
                name="title"
                value={values.title}
                onChange={handleChange}
                error={errors.title}
              />
              <TextInput
                variant="outlined"
                label="Abstract"
                name="abstract"
                value={values.abstract}
                onChange={handleChange}
                error={errors.abstract}
              />
              <TextInput
                variant="outlined"
                label="Body"
                name="body"
                value={values.body}
                onChange={handleChange}
                error={errors.body}
              />
            </Grid>
          </Grid>
          <Box sx={{ width: "200", height: "200", bgcolor: "primary" }}></Box>
        </Grid>

      </CardContent>
      <CardActions>
        <StandardButton
          type="submit"
          text="Submit"
          onClick={handleSubmit}
        />
        <StandardButton
          text="Reset"
          color="default"
          onClick={handleReset}
        />
      </CardActions>
    </form>
  );
};

export default AddArticleForm;
