const express = require("express");
const router = express.Router();
const { checkDupUser, verifyToken } = require("../middlewares/userAuth");
const {
  createUser,
  loginUser,
  getUser,
} = require("../controllers/user");

// API endpoints
//POST /api/v1/user/signup`: Add an user.
router.route("/signup").post(checkDupUser, createUser);

//POST /api/v1/user/login`: Login an user.
router.route("/login").post(loginUser);

//GET /api/v1/user/me`: Requests the user with specific _id_.
router.route("/me").get(verifyToken, getUser);

module.exports = router;
