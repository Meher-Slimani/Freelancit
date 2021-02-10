import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { AppBar, Toolbar, Box, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import AddCircleoutlineOutlibnedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import { logout } from "../../redux/actions/auth";

const NavBar2 = () => {
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, loading } = auth;
  const dispatch = useDispatch();

  const guestLinks = (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      style={{ width: "200px" }}
      mr="20px"
    >
      <Link to="/login" className="text-link">
        <Button color="inherit">
          <LockOpenIcon />
          Sign In
        </Button>
      </Link>
      <Link to="/register" className="text-link">
        <Button color="inherit">
          <AddCircleoutlineOutlibnedIcon />
          Sign Up
        </Button>
      </Link>
    </Box>
  );

  const authLinks = (
    <Box>
      <Link
        onClick={(e) => {
          dispatch(logout());
        }}
        to="/"
        className="text-link"
      >
        <Button color="inherit">
          <ExitToAppOutlinedIcon />
          Sign Out
        </Button>
      </Link>
    </Box>
  );
  return (
    <>
      <CssBaseline />
      <AppBar>
        <Box display="flex" justifyContent="space-between">
          <Toolbar>
            <Typography variant="h6">Freelancit</Typography>
          </Toolbar>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mr="20px"
          >
            <Button color="inherit">
              <PeopleAltOutlinedIcon /> Freelancers
            </Button>
            <Button color="inherit">
              <WorkOutlineOutlinedIcon />
              Projects
            </Button>
            {!loading && <>{!isAuthenticated ? guestLinks : authLinks}</>}
          </Box>
        </Box>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
    </>
  );
};

export default NavBar2;
