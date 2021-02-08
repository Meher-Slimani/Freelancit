import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  CssBaseline,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import PeopleIcon from "@material-ui/icons/People";
import WorkIcon from "@material-ui/icons/Work";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: "250px",
    flexShrink: 0,
  },
  drawerPaper: {
    width: "250px",
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Layout = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          <Box
            display="flex"
            justifyContent="space-between"
            style={{ width: "100%" }}
          >
            <Box>
              <Typography variant="h6">Freelancit</Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              style={{ width: "220px" }}
            >
              <Button color="inherit">
                <LockOpenIcon />
                Sign In
              </Button>
              <Button color="inherit">
                <ExitToAppIcon />
                Sign Up
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {[
              { text: "Home", icon: <HomeIcon /> },
              { text: "About Us", icon: <InfoIcon /> },
              { text: "Contact", icon: <PermContactCalendarIcon /> },
            ].map((obj, index) => (
              <ListItem button key={index}>
                <ListItemIcon>{obj.icon}</ListItemIcon>
                <ListItemText primary={obj.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {[
              { text: "Freelancers", icon: <PeopleIcon /> },
              { text: "Projects", icon: <WorkIcon /> },
            ].map((obj, index) => (
              <ListItem button key={index}>
                <ListItemIcon>{obj.icon}</ListItemIcon>
                <ListItemText primary={obj.text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default Layout;
