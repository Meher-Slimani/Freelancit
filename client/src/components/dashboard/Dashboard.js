import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { CLEAR_PROFILE } from "../../redux/actions/types";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentProfile } from "../../redux/actions/profile";
import { Typography, Box, Button } from "@material-ui/core";
import Spinner from "../layout/Spinner";
import FreelancerContent from "./FreelancerContent";
import FreelanceSeekerContent from "./FreelanceSeekerContent";
import TopSection from "./TopSection";

const Dashboard = () => {
  const auth = useSelector((state) => state.auth);
  const userProfile = useSelector((state) => state.profile);
  const { profile, loading } = userProfile;
  const { user } = auth;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: CLEAR_PROFILE,
    });
    dispatch(getCurrentProfile());
  }, [dispatch]);
  return loading && profile === null ? (
    <Spinner />
  ) : user && user.role === "Freelance Seeker" && profile === null ? (
    <>
      <TopSection user={user} /> <FreelanceSeekerContent user={user} />
    </>
  ) : profile !== null ? (
    <>
      <TopSection user={user} />
      <FreelancerContent profile={profile} user={user} />
    </>
  ) : (
    <>
      <TopSection user={user} />
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
  );
};

export default Dashboard;
