import React from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  IconButton,
} from "@material-ui/core";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import { deleteExperience } from "../../redux/actions/profile";

const useStyles = makeStyles({
  table: {
    width: 650,
  },
  font: {
    fontWeight: "bold",
  },
});

const DisplayExperience = ({ experience }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const experienceRows =
    experience &&
    React.Children.toArray(
      experience.map((exp) => (
        <TableRow>
          <TableCell>{exp.company}</TableCell>
          <TableCell>{exp.title}</TableCell>
          <TableCell>
            <Moment format="YYYY/MM/DD">{exp.from}</Moment>
          </TableCell>
          <TableCell>
            {exp.to === null ? (
              "Now"
            ) : (
              <Moment format="YYYY/MM/DD">{exp.to}</Moment>
            )}
          </TableCell>
          <TableCell>{exp.description}</TableCell>
          <TableCell>
            <Button
              startIcon={<DeleteForeverOutlinedIcon />}
              onClick={() => {
                dispatch(deleteExperience(exp._id));
              }}
              variant="contained"
              color="secondary"
            >
              Remove
            </Button>
          </TableCell>
        </TableRow>
      ))
    );
  return (
    <>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <Typography variant="h6" className={classes.font}>
                  Company
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" className={classes.font}>
                  Title
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" className={classes.font}>
                  From
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" className={classes.font}>
                  To
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" className={classes.font}>
                  Description
                </Typography>
              </TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{experienceRows}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DisplayExperience;
