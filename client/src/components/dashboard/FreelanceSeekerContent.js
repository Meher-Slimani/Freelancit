import React from "react";
import DashboardActions from "./DashboardActions";
import DeleteAccount from "./DeleteAccount";

const FreelanceSeekerContent = ({ user }) => {
  return (
    <div>
      <DashboardActions user={user} />
      <DeleteAccount />
    </div>
  );
};

export default FreelanceSeekerContent;
