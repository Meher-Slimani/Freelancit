import axios from "axios";
import {
  GET_PROJECTS,
  PROJECT_ERROR,
  GET_PROJECT,
  ADD_PROJECT,
  GET_FS_PROJECTS,
  GET_FL_PROJECTS,
  APPLY_PROJECT,
  GET_CANDIDATES,
  RESET_PROJECT_STATE,
} from "../actions/types";
import { setAlert } from "./alert";

//* Get all projects
export const getAllProjects = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/project");
    dispatch({
      type: GET_PROJECTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//* Get My Projects
export const getFsProjects = (fsId) => {
  return {
    type: GET_FS_PROJECTS,
    payload: fsId,
  };
};

//* Get My Projects
export const getFlProjects = (flId) => {
  return {
    type: GET_FL_PROJECTS,
    payload: flId,
  };
};

//* Get Project By ID
export const getCurrentProject = (projectId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/project/${projectId}`);
    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//* Add Project
export const addProject = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/project", formData, config);

    dispatch({
      type: ADD_PROJECT,
      payload: res.data,
    });

    dispatch(setAlert("Project Created", "success"));
    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, "error"));
      });
    }

    dispatch({
      type: PROJECT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//* Apply for a project
export const applyProject = (projectId, history) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/project/apply/${projectId}`);

    dispatch({
      type: APPLY_PROJECT,
    });
    history.push("/projects");
  } catch (error) {
    dispatch({
      type: PROJECT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//* Get Candidates
export const getCandidates = (projectId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/project/candidates/${projectId}`);

    dispatch({
      type: GET_CANDIDATES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//* Reset project state
export const resetProjectState = () => {
  return {
    type: RESET_PROJECT_STATE,
  };
};
