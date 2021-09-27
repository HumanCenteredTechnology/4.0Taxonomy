import React, { useState, useEffect } from "react";

//Hooks
import { useForm } from "../../hooks/useForm";

//Styles
import { Grid, makeStyles, TextField } from "@material-ui/core";
import SubmitButton from "../SubmitButton";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

const initialValues = {
  title: "",
  category: "",
  link: "",
};

const AddArticleForm = () => {
  const { values, setValues, handleChange } = useForm(initialValues);

  const classes = useStyles();

  return (
    <form className={classes.root}>
      <Grid container>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Title"
            name="title"
            value={values.title}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            label="Link"
            name="link"
            value={values.link}
            onChange={handleChange}
          />
          <div>
            <SubmitButton type="submit" text="Submit" />
            <SubmitButton
              text="Reset"
              color="default"
              onClick={() => {
                setValues("");
              }}
            />
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddArticleForm;
