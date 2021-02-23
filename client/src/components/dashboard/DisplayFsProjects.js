import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import { deleteProject, getAllProjects } from "../../redux/actions/project";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  glassItem: {
    background:
      "linear-gradient(to right bottom, rgba(255, 255, 255,0.2), rgba(255, 255, 255,0.05))",
    borderRadius: "10px",
    width: "700px",
    height: "auto",
    padding: "20px 15px",
    margin: "30px 0",
    boxShadow: "2px 8px 20px -6px #000000",
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
  },
}));

const DisplayFsProjects = ({
  project: { _id, title, description, publishedAt },
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <Box className={classes.glassItem}>
      <Box
        display="flex"
        flex="3"
        flexDirection="column"
        alignItems="flex-start"
      >
        <Typography
          variant="h4"
          display="block"
          style={{ color: "white", marginBottom: "10px" }}
        >
          {title}
        </Typography>
        <Box
          textOverflow="ellipsis"
          overflow="hidden"
          component="div"
          maxWidth="650px"
          whiteSpace="nowrap"
          style={{ color: "white", fontSize: "18px" }}
        >
          {description}
        </Box>
        <Box mt="20px">
          <Typography variant="subtitle2" style={{ color: "white" }}>
            Posted on: {moment(publishedAt).format("DD/MM/YYYY")}
          </Typography>
        </Box>
        <Box
          mt="26px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Link to={`/project/${_id}/candidates`} className="text-link">
            <Button variant="contained" color="primary">
              Show Candidates
            </Button>
          </Link>
          <Link to={`/project/${_id}`} className="text-link">
            <Button
              variant="contained"
              style={{
                backgroundColor: "#FFB400",
                color: "#040723",
              }}
            >
              More Details
            </Button>
          </Link>
          <Box>
            <Button
              startIcon={<DeleteForeverOutlinedIcon />}
              variant="contained"
              color="secondary"
              onClick={() => {
                dispatch(deleteProject(_id));
              }}
            >
              Delete Project
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DisplayFsProjects;
