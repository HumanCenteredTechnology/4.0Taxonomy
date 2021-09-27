import React, { useState, useEffect } from "react";
import API from "../../API.js";

//Components
import StandardButton from "../controls/StandardButton";
import TextInput from "../controls/TextInput";
//Hooks
import { useForm } from "../../hooks/useForm";
//Styles
import { CardActions, CardContent, CardHeader, Grid, makeStyles, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {

      margin: theme.spacing(2),
    },
  },
}));

const initialValues = {
  title: "",
  link: "",
};

const AddArticleForm = () => {
  const { values, setValues, errors, setErrors, handleChange } =
    useForm(initialValues);

  const classes = useStyles();

  const validate = () => {
    let temp = {};
    temp.title = values.title ? "" : "Please enter a title";

    temp.link = values.link ? "" : "Please enter a valid link";
    setErrors({ ...temp });

    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      API.submitArticle(values);
      console.log("submitting...");
    }
  };

  const handleReset = () => {
    setErrors({});
    setValues(initialValues);
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit} autoComplete="off">
      <CardHeader
        title="Submit an article"
        subheader="Complete the form"
      />
      <CardContent>
        <Grid container spacing={3} >
          <Grid item md={6} xs={10} xl={3}>
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
              label="Link"
              name="link"
              value={values.link}
              onChange={handleChange}
              error={errors.link}
            />
          </Grid>
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
