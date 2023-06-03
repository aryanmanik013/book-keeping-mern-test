const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const userModel = require("../Models/userSchema");
const jwt = require("jsonwebtoken");
// register api
router.post("/register", async (req, res) => {
  const { username, email, password, profilePicture, socialMedia } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json("Please Fill the fields");
  }

  try {
    const preUser = await userModel.findOne({ email: email });
    console.log(preUser);
    if (preUser) {
      return res
        .status(400)
        .json({ msg: "This User is already present", success: false });
    } else {
      const addUser = new userModel({
        username,
        email,
        password,
        profilePicture,
        socialMedia,
      });
      await addUser.save();

      res.status(201).json({
        msg: "User Created Successfully",
        success: true,
      });
      console.log(addUser);
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

// login api
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json("Please fill in all the fields");
  }
  try {
    const preUser = await userModel.findOne({ email: email });
    console.log(preUser);
    if (preUser) {
      const isPasswordValid = await bcrypt.compare(password, preUser.password);

      if (!isPasswordValid) {
        res.status(401).json({ error: "Invalid email or password" });
      } else {
        const token = jwt.sign({ email: preUser.email }, "MySecretKey1234");
        res.status(200).json({
          msg: "Logged In",
          email: email,
          token: token,
          success: true,
        });
      }
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error); // Log the error to the console for debugging
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
