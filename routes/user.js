const express = require("express");
const router = express.Router();
const { checkDupUser } = require("../middlewares/userAuth");
const {
  createUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

// API endpoints
//POST /api/v1/user/signup`: Add an user.
router.route("/signup").post(checkDupUser, createUser);

//POST /api/v1/user/login`: Login an user.
router.route("/login").post(loginUser);

//GET /api/v1/user/{id}`: Requests, Updates, and Removes the user with specific _id_.
//router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
