import React, { useState, useEffect } from "react";

//Hooks
import { useForm } from "../../hooks/useForm";

//Styles
import { Grid, makeStyles, TextField } from "@material-ui/core";
import StandardButton from "../StandardButton";
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
    console.log(values);
    return Object.values(temp).every((x) => x == "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("test");
    }
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit} autoComplete="off">
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
            <StandardButton
              type="submit"
              text="Submit"
              onClick={handleSubmit}
            />
            <StandardButton
              text="Reset"
              color="default"
              onClick={() => {
                setValues(initialValues);
              }}
            />
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddArticleForm;
