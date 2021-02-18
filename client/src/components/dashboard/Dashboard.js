import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteAccount, getCurrentProfile } from "../../redux/actions/profile";
import DashboardActions from "./DashboardActions";
import {
  Badge,
  Avatar,
  Grid,
  Typography,
  Paper,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Spinner from "../layout/Spinner";
import DisplayExperience from "./DisplayExperience";
import DisplayEducation from "./DisplayEducation";
import FitnessCenterOutlinedIcon from "@material-ui/icons/FitnessCenterOutlined";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const GlobalCss = withStyles({
  "@global": {
    ".MuiAvatar-root": {
      height: 200,
      width: 200,
    },
    ".MuiBadge-dot": {
      height: 15,
      minWidth: 15,
      borderRadius: "50%",
    },
  },
})(() => null);

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

const Dashboard = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const auth = useSelector((state) => state.auth);
  const userProfile = useSelector((state) => state.profile);
  const { profile, loading } = userProfile;
  const { user } = auth;
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      {/* <Box onSc></Box> */}
      <Grid
        container
        display="flex"
        justify="center"
        alignItems="center"
        direction="column"
      >
        <Grid item className={classes.root}>
          <GlobalCss />
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
          >
            <Avatar alt="Remy Sharp" src={user && user.avatar && user.avatar} />
          </StyledBadge>
        </Grid>
        <Grid item>
          <Typography variant="h3" style={{ color: "#1F7396" }}>
            {user && user.firstName && user.firstName}{" "}
            {user && user.lastName && user.lastName}
          </Typography>
        </Grid>
        <Grid item>
          <Box mt="15px">
            <Rating name="read-only" value={5} readOnly />
          </Box>
        </Grid>
      </Grid>
      {profile !== null ? (
        <>
          <DashboardActions />
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
                <DisplayEducation
                  education={profile.education}
                  dashboard={true}
                />
              </Paper>
            ) : (
              ""
            )}
          </Box>
          <Box display="flex" justifyContent="center" my="50px">
            <Button
              size="large"
              startIcon={<HighlightOffOutlinedIcon />}
              color="secondary"
              variant="contained"
              onClick={handleClickOpen}
            >
              Delete Account
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"You want to delete your account?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  The Action you are engaging can not be undone. Confirm to
                  proceed.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Disagree
                </Button>
                <Button
                  onClick={() => {
                    dispatch(deleteAccount());
                    handleClose();
                  }}
                  color="primary"
                  autoFocus
                >
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </>
      ) : (
        <>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            mt="10px"
          >
            <Typography component="p" style={{ color: "white" }}>
              You have not set up a profile yet. Please create one
            </Typography>
            <Link to="/create-profile" className="text-link">
              <Box mt="20px">
                <Button
                  style={{ backgroundColor: "#1F7396", color: "white" }}
                  variant="contained"
                >
                  Create Profile
                </Button>
              </Box>
            </Link>
          </Box>
        </>
      )}
    </>
  );
};

export default Dashboard;
