import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFsProjects } from "../../redux/actions/project";
import DashboardActions from "./DashboardActions";
import DeleteAccount from "./DeleteAccount";
import { Typography, Box } from "@material-ui/core";
import DisplayFsProjects from "./DisplayFsProjects";

const FreelanceSeekerContent = ({ user, freelanceSeekerProjects }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFsProjects(user._id));
  }, [dispatch]);
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <DashboardActions user={user} />
      <Box mt="20px">
        {freelanceSeekerProjects.length === 0 ? (
          <Typography variant="h3" style={{ color: "white" }}>
            "You don't have any project yet"
          </Typography>
        ) : (
          React.Children.toArray(
            freelanceSeekerProjects.map((project) => (
              <DisplayFsProjects project={project} />
            ))
          )
        )}
      </Box>
      <DeleteAccount />
    </Box>
  );
};

export default FreelanceSeekerContent;
