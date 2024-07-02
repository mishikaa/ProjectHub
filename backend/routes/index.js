const { Router } = require("express");
const mongoose = require("mongoose");
const path = require("path");

const User = mongoose.model("users");

const { ensureAuth, ensureGuest } = require("../middleware/auth");
const { ensureSignUp, ensureNewUser } = require("../middleware/user");

const router = new Router();

// Middleware to serve the React app's index.html for frontend routes
// const serveReactApp = (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// };

router.get("/", ensureGuest);

router.get("/dashboard", ensureAuth, ensureSignUp, serveReactApp, async (req, res) => {
  try {
//     const posts = await Task.find({});

    res.locals.user = req.user;
    res.locals.posts = posts;
    serveReactApp(req, res);
  } catch (error) {
    console.log(error);
    res.redirect("/internal-server-error");
  }
});

// Catch-all route to serve the React app for any other routes
// router.get("*", serveReactApp);

module.exports = router;
