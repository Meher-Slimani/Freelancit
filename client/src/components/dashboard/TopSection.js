import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Badge, Avatar, Grid, Typography, Box } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

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
}));

const TopSection = ({ user }) => {
  const classes = useStyles();
  return (
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
          <Avatar alt="Remy Sharp" src={user && user.avatar} />
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
  );
};

export default TopSection;
