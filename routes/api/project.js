const express = require("express");
const router = express.Router();
const Project = require("../../models/Project");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

//* @route    Post api/project
//* desc      add project
//* access    Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title Is Required").not().isEmpty(),
      check("description", "Description Is Required").not().isEmpty(),
      check("requiredSkills", "Required Skills Is Required").not().isEmpty(),
      check("estimatedBudget", "Estimated Budget Is Required").not().isEmpty(),
      check("status", "Status Is Required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id);
      const {
        title,
        description,
        requiredSkills,
        estimatedBudget,
        status,
        attachment,
      } = req.body;
      const newPost = new Project({
        title,
        description,
        requiredSkills,
        estimatedBudget,
        status,
        avatar: user.avatar,
        attachment,
        lastName: user.firstName,
        firstName: user.lastName,
        user: user.id,
      });
      await newPost.save();
      res.json(newPost);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//* @route    Get api/project
//* desc      Get all projects
//* access    Public
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ date: -1 });
    res.json(projects);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
//* @route    Get api/project/:projectId
//* desc      Get project by id
//* access    Public
router.get("/:projectId", async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(400).json({ msg: "Project Not Found" });
    }
    res.json(project);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "Project Not Found" });
    }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//* @route    Delete api/project/:id
//* desc      Delete project by id
//* access    Private 
router.delete("/:id", auth, async (req,res) => {
    try {
      const project = await Project.findById(req.params.id)  
      if (project.user.toString() !== req.user.id)
      {return res.status(401).json({msg:"User not authorized"})}
      await project.remove();
      res.json({msg:"Project Removed"});
    } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
    }
})
//* @route    POST api/project/comment/:projectId
//* desc      Comment a Project
//* access    Private 
router.post("/comment/:projectId", [auth, [
    check("text","Text Is Required").not().isEmpty()
]], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    try {
        const user = await User.findById(req.user.id);
        const project = await Project.findById(req.params.projectId);
        const newComment = {
            user: req.user.id,
            text: req.body.text,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar
        }
        project.comments.unshift(newComment);
        await project.save();
        res.json(project.comments);
    } catch (error) {
        console.error(error.message);
    res.status(500).send("Server Error");
    }
})

//* @route    Delete api/project/comment/:projectId/:commentId
//* desc      Delete comment
//* access    Private 
router.delete("/comment/:projectId/:commentId", auth, async (req,res) => {
    try {
      const project = await Project.findById(req.params.projectId);
      const comment = project.comments.find((comment) => {return comment.id === req.params.commentId})  
      if (!comment){
         return  res.status(404).json({msg:"Cooment Does Not Exist"});
      }
      if (project.user.toString() !== req.user.id)
      {return res.status(401).json({msg:"User not authorized"})}
      const removeIndex = project.comments.map((comment) => {
          comment.user.toString().indexOf(req.user.id)
      })
      project.comments.splice(removeIndex,1);
      await project.save();
      res.json(project.comments);
    } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
    }
});

module.exports = router;
