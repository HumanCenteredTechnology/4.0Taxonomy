import React from "react";
import { Button as MuiButton, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  label: {
    textTransform: "none",
  },
}));

const StandardButton = ({ text, size, color, variant, onClick, ...other }) => {
  const classes = useStyles();

  return (
    <MuiButton
      variant={variant || "contained"}
      size={size || "large"}
      color={color || "primary"}
      onClick={onClick}
      {...other}
      classes={{ root: classes.root, label: classes.label }}
    >
      <Typography variant="b1">{text}</Typography>
    </MuiButton>
  );
};
export default StandardButton;
