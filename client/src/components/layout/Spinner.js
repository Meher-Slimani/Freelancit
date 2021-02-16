import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& > * + *": {
      margin: "auto",
    },
  },
}));

const Spinner = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress style={{ color: "#1F7396" }} />
    </div>
  );
};

export default Spinner;
