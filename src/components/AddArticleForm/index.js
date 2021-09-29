import React, { useState, useEffect } from "react";


//Components
import StandardButton from "../controls/StandardButton";
import TextInput from "../controls/TextInput";
import VerifySubmit from "../VerifySubmit";
//Hooks
import { useForm } from "../../hooks/useForm";
//Styles
import { CardActions, CardContent, CardHeader, Grid, makeStyles, Box, Modal } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {

      margin: theme.spacing(2),
    },
  },
}));



const AddArticleForm = () => {
  const { values, errors, handleChange, handleReset, submit, response } = useForm();
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
    handleOpen()
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <form className={classes.root} onSubmit={handleSubmit} autoComplete="off">
      <CardHeader
        title="Submit an article"
        subheader="Complete the form and submit your article"
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

      {response.verified_entities ?
        <Modal
          open={open}
          onClose={handleClose}
        >
          <VerifySubmit response={response} handleClose={handleClose} />
        </Modal>
        : <> </>
      /* la condizione così fa schifo, deve essere scritta meglio*/}
    </form>
  );
};

export default AddArticleForm;
