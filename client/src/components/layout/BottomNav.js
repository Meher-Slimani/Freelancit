import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#424242",
  },
  iconAction: {
    color: "white",
  },
});

const BottomNav = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        label="Home"
        icon={<HomeIcon />}
        className={classes.iconAction}
      />
      <BottomNavigationAction
        label="About Us"
        icon={<InfoIcon />}
        className={classes.iconAction}
      />
      <BottomNavigationAction
        label="Contact"
        icon={<PermContactCalendarIcon />}
        className={classes.iconAction}
      />
    </BottomNavigation>
  );
};

export default BottomNav;
