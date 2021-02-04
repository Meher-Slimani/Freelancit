const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const { check, validationResult } = require("express-validator");

//* @route    Get api/profile/me
//* desc      Get current user profile
//* access    Private
router.get("/me", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id })
      .populate("user", ["firstName", "lastName", "avatar"])
      .populate("contacts", ["email", "phoneNumber"])
      .exec();

    if (!profile) {
      return res.status(400).json({ msg: "This user does not have a profile" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//* @route    Post api/profile
//* desc      Create or Update profile
//* access    Private
router.post(
  "/",
  [
    auth,
    [
      check("hourlyRate", "Hourly Rate is required").not().isEmpty(),
      check("skills", "Skills are required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      aboutMe,
      city,
      nationality,
      gender,
      spokenLanguages,
      hourlyRate,
      skills,
      contacts,
      githubusername,
      certifications,
      portfolio,
      businessLicense,
      address,
      youtube,
      linkedin,
      twitter,
      facebook,
      instagram,
    } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if (aboutMe) profileFields.aboutMe = aboutMe;
    if (city) profileFields.city = city;
    if (nationality) profileFields.nationality = nationality;
    if (gender) profileFields.gender = gender;
    if (spokenLanguages)
      profileFields.spokenLanguages = spokenLanguages
        .split(",")
        .map((spokenLanguage) => spokenLanguage.trim());
    if (hourlyRate) profileFields.hourlyRate = hourlyRate;
    if (skills)
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    if (certifications)
      profileFields.certifications = certifications
        .split(",")
        .map((certification) => certification.trim());
    if (portfolio) profileFields.portfolio = portfolio;
    if (githubusername) profileFields.githubusername = githubusername;

    profileFields.contacts = {};
    profileFields.contacts = req.user.id;

    profileFields.businessInformation = {};
    if (businessLicense)
      profileFields.businessInformation.businessLicense = businessLicense;
    if (address) profileFields.businessInformation.address = address;

    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (!profile) {
        const profile = new Profile(profileFields);
        await profile.save();
        return res.json(profile);
      }

      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//* @route    Get api/profile
//* desc      Get all users profiles
//* access    Public
router.get("/", async (req, res) => {
  try {
    let profiles = await Profile.find()
      .populate("user", ["firstName", "lastName", "avatar"])
      .populate("contacts", ["email", "phoneNumber"])
      .exec();

    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//* @route    Get api/profile/user/:userId
//* desc      Get user's profile by id
//* access    Public
router.get("/user/:userId", async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.params.userId })
      .populate("user", ["firstName", "lastName", "avatar"])
      .populate("contacts", ["email", "phoneNumber"])
      .exec();

    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

//* @route    Delete api/profile/
//* desc      Delete user + profile + project
//* access    Private
router.delete("/", auth, async (req, res) => {
  try {
    await Project.deleteMany({ user: req.user.id });
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
