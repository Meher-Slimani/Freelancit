import React, { useEffect } from "react";
import { Grid, Button, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProfiles } from "../../redux/actions/profile";
import { getCandidates } from "../../redux/actions/project";
import Candidate from "./Candidate";

const Candidates = ({ match }) => {
  const projectState = useSelector((state) => state.project);
  const profileState = useSelector((state) => state.profile);
  const { candidates } = projectState;
  const { profiles } = profileState;
  const candidateProfiles = profiles.filter((profile) =>
    candidates.some((candidate) => candidate.user === profile.user._id)
  );
  console.log(candidateProfiles);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProfiles());
    dispatch(getCandidates(match.params.projectId));
  }, [dispatch]);
  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <Grid container display="flex" justify="center">
        {candidates &&
          candidateProfiles &&
          React.Children.toArray(
            candidateProfiles.map((candidate) => (
              <Candidate candidate={candidate} />
            ))
          )}
      </Grid>
      <Link to="/dashboard" className="text-link">
        <Button
          style={{ color: "white", borderColor: "white", marginTop: "20px" }}
          variant="outlined"
        >
          Back to Dashboard
        </Button>
      </Link>
    </Box>
  );
};

export default Candidates;
