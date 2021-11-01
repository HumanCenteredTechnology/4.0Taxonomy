import React, { useState, useEffect, } from "react";


//Components
import StandardButton from "../controls/StandardButton";
import TextInput from "../controls/TextInput";
import VerifySubmit from "../VerifySubmit";
//Hooks
import { useForm } from "../../hooks/useForm";
import { FormContext } from '../3 - FormPage';
//Styles
import { CardActions, CardContent, CardHeader, Grid, makeStyles, Box, Modal, Dialog } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {

      margin: theme.spacing(2),
    },
  },
}));



const AddArticleForm = ({ values, errors, handleChange, handleReset, handleSubmit }) => {
  const classes = useStyles();

  return (
    <form className={classes.root} onSubmit={handleSubmit} autoComplete="off">
      <CardHeader
        title="Submit an article"
        subheader="Complete the form and submit your article"
      />
      <CardContent>
        <Grid container spacing={1}>
          <Grid  >
            <Grid item md={10} lg={10} xs={10} xl={12}>
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
          {/* <Box sx={{ width: "200", height: "200", bgcolor: "primary" }}></Box> */}
        </Grid>

      </CardContent>
      <CardActions>
        <StandardButton
          text="Reset"
          color="default"
          onClick={handleReset}
        />
        <Box sx={{ flexGrow: 1 }} />
        <StandardButton
          type="submit"
          text="Submit"
          onClick={handleSubmit}
        />
      </CardActions>


      {/* {response.founded_elements ?
        <Dialog
          fullWidth
          maxWidth="md"
          open={open}
          onClose={handleClose}
          scroll="body"
        >
          <VerifySubmit response={response} handleClose={handleClose} />
        </Dialog>
        : <> </>} */}
    </form>
  );
};

export default AddArticleForm;
