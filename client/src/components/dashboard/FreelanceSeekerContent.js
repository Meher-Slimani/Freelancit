import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFsProjects } from "../../redux/actions/project";
import DashboardActions from "./DashboardActions";
import DeleteAccount from "./DeleteAccount";

const FreelanceSeekerContent = ({ user }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFsProjects(user._id));
  }, [dispatch]);
  return (
    <div>
      <DashboardActions user={user} />
      <DeleteAccount />
    </div>
  );
};

export default FreelanceSeekerContent;
