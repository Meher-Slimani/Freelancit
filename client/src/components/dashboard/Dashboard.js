import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentProfile } from "../../redux/actions/profile";
import {
  Badge,
  Avatar,
  Grid,
  Typography,
  Paper,
  Box,
  Button,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Spinner from "../layout/Spinner";
import FitnessCenterOutlinedIcon from "@material-ui/icons/FitnessCenterOutlined";

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
    // "& > *": {
    //   margin: theme.spacing(1),
    // },
    // justifyContent: "center",
    // alignItems: "center",
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
}));

const Dashboard = () => {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const userProfile = useSelector((state) => state.profile);
  const { profile, loading } = userProfile;
  const { user } = auth;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
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
          <Typography variant="h3" color="primary">
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
        <>has</>
      ) : (
        <>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            mt="10px"
          >
            <Typography component="p" mX="10px">
              You have not set up a profile yet. Please create one
            </Typography>
            <Link to="/create-profile" className="text-link">
              <Box mt="10px">
                <Button color="primary" variant="contained">
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
