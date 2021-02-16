import React from "react";
import { Link } from "react-router-dom";
import { Box, Button } from "@material-ui/core";
import SpellcheckOutlinedIcon from "@material-ui/icons/SpellcheckOutlined";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import BorderColorOutlinedIcon from "@material-ui/icons/BorderColorOutlined";

const DashboardActions = () => {
  return (
    <Box display="flex" justifyContent="center" mt="10px">
      <Link to="/edit-profile" className="text-link">
        <Button startIcon={<SpellcheckOutlinedIcon />} variant="outlined">
          Edit Profile
        </Button>
      </Link>
      <Link to="/add-experience" className="text-link">
        <Button startIcon={<WorkOutlineOutlinedIcon />} variant="outlined">
          Add Experience
        </Button>
      </Link>
      <Link to="/add-education" className="text-link">
        <Button startIcon={<BorderColorOutlinedIcon />} variant="outlined">
          Add Education
        </Button>
      </Link>
    </Box>
  );
};

export default DashboardActions;