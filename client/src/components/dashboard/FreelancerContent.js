import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Typography, Paper, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DisplayExperience from "./DisplayExperience";
import DisplayEducation from "./DisplayEducation";
import DeleteAccount from "./DeleteAccount";
import DashboardActions from "./DashboardActions";
import { getFlProjects } from "../../redux/actions/project";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
    justifyContent: "center",
    alignItems: "center",
  },
  aboutMe: {
    maxWidth: "50ch",
    marginTop: "20px",
    background: "white",
    background:
      "linear-gradient(180deg, rgba(31,115,150,0.4), rgba(31,115,150,0.1))",
    padding: "10px 15px",
  },
  glassLogo: {
    background: "white",
    background:
      "linear-gradient(225deg, rgba(31,115,150,0.4), rgba(31,115,150,0.1))",
    borderRadius: "10px",
    width: "500px",
    height: "300px",
    padding: "10px 15px",
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  glassItem: {
    background: "white",
    background:
      "linear-gradient(45deg, rgba(255,255,255,0.7), rgba(255,255,255,0.3))",
    borderRadius: "10px",
    width: "450px",
    height: "auto",
    padding: "10px 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10px",
  },
  paperStyle: { padding: "30px 20px", width: 830, margin: "20px auto" },
}));

const FreelancerContent = ({ profile, user }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFlProjects(user._id));
  }, [dispatch]);

  return (
    <>
      <DashboardActions user={user} />
      <Box>
        {profile.experiences.length > 0 ? (
          <Paper elevation={20} className={classes.paperStyle}>
            <Typography variant="h4" style={{ color: "#1F7396" }}>
              Professional Experiences
            </Typography>
            <DisplayExperience
              experience={profile.experiences}
              dashboard={true}
            />
          </Paper>
        ) : (
          ""
        )}
        {profile.education.length > 0 ? (
          <Paper elevation={20} className={classes.paperStyle}>
            <Typography variant="h4" style={{ color: "#1F7396" }}>
              Academic Cursus
            </Typography>
            <DisplayEducation education={profile.education} dashboard={true} />
          </Paper>
        ) : (
          ""
        )}
      </Box>
      <DeleteAccount />
    </>
  );
};

export default FreelancerContent;
