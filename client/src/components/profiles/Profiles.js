import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Box, Grid } from "@material-ui/core";
import { getAllProfiles } from "../../redux/actions/profile";
import ProfileItem from "./ProfileItem";
import Spinner from "../layout/Spinner";

const Profiles = () => {
  const profile = useSelector((state) => state.profile);
  const { profiles, loading } = profile;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProfiles());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Grid container display="flex" justify="center">
          {profiles.length > 0 && !loading ? (
            React.Children.toArray(
              profiles.map((profile) => <ProfileItem profile={profile} />)
            )
          ) : (
            <Typography variant="h2">No users</Typography>
          )}
        </Grid>
      )}
    </>
  );
};

export default Profiles;
