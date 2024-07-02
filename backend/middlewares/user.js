const ROLES = {
  ADMIN: 'ADMIN',
  PROJECT_MANAGER: 'PROJECT_MANAGER',
  TEAM_LEAD: 'TEAM_LEAD',
  DEVELOPER: 'DEVELOPER',
  TESTER: 'TESTER',
  CLIENT: 'CLIENT',
  GUEST: 'GUEST'
};

const ensureSignUp = (req, res, next) => {
  const user = req.user;
  const allowedRoles = [
    ROLES.ADMIN,
    ROLES.PROJECT_MANAGER,
    ROLES.TEAM_LEAD,
    ROLES.DEVELOPER,
    ROLES.TESTER,
    ROLES.CLIENT,
  ];

  if (allowedRoles.includes(user.role)) {
    return next();
  } else {
    res.redirect("/user/signup");
  }
};

const ensureNewUser = (req, res, next) => {
  const user = req.user;
  const allowedRoles = [
    ROLES.ADMIN,
    ROLES.PROJECT_MANAGER,
    ROLES.TEAM_LEAD,
    ROLES.DEVELOPER,
    ROLES.TESTER,
    ROLES.CLIENT,
  ];

  if (!allowedRoles.includes(user.role)) {
    return next();
  } else {
    res.redirect("/dashboard");
  }
};

const ensureCreator = (req, res, next) => {
  const user = req.user;
  const allowedRoles = [
    ROLES.ADMIN,
    ROLES.PROJECT_MANAGER,
  ];

  if (allowedRoles.includes(user.role)) {
    return next();
  } else {
    res.redirect("/dashboard");
  }
};

module.exports = {
  ensureSignUp,
  ensureNewUser,
  ensureCreator,
};
