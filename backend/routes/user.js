const { Router } = require("express");
const mongoose = require("mongoose");
const path = require("path");

const User = mongoose.model("users");

const { ensureAuth, ensureGuest } = require("../middlewares/auth");
const { ensureSignUp, ensureNewUser } = require("../middlewares/user");

const router = new Router();

// Middleware to serve the React app's index.html for frontend routes
// const serveReactApp = (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// };

router.get("/", ensureGuest);

router.get("/signup", ensureAuth, ensureNewUser);

router.get("/profile", ensureAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    // console.log(user)
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/update/role", ensureAuth, ensureNewUser, async (req, res) => {
  try {
    const { role } = req.body;
    // console.log("role:", role)
    const user = req.user;
    user.role = role;
    await user.save();
    res.status(200).send({});
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: "Something went wrong",
    });
  }
});

// Route to get all users
router.get("/all", ensureAuth, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;