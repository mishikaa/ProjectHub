const { Router } = require("express");
const passport = require("passport");

const router = new Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    const user = req.user;
    // console.log(user, user.role);

    // If new user => role has not been assigned
    if (user.role === "GUEST") {
      return res.redirect("/user/signup");
    }
    res.redirect("/dashboard");
  }
);

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

module.exports = router;
