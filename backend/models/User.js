const mongoose = require("mongoose");

const ROLES = {
  ADMIN: 'ADMIN',
  PROJECT_MANAGER: 'PROJECT_MANAGER',
  TEAM_LEAD: 'TEAM_LEAD',
  DEVELOPER: 'DEVELOPER',
  TESTER: 'TESTER',
  CLIENT: 'CLIENT',
  GUEST: 'GUEST'
};

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    default: "",
  },
  displayName: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
  },
  role: { 
    type: String, 
    enum: Object.values(ROLES), 
    default: ROLES.GUEST 
  },
  image: {
    type: String,
    default: "",
  },
  cover: {
    type: String,
    default: "/img/theme/light/code-1.jpg",
  },
  gender: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
});

mongoose.model("users", UserSchema);
