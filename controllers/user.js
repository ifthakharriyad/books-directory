const createAUser = require("../models/createUser");
const loginAUser = require("../models/loginUser");

async function createUser(req, res) {
  try {
    const err = await createAUser(res, req.body);
    if (err) {
      res.status(400).send("Provide (valid) user data!");
      return;
    }
    res.status(201).end();
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong! Try again.");
  }
}

async function loginUser(req, res) {
  const { username, email, password } = req.body;
  try {
    const err = await loginAUser(res, username, email, password);
    if (err) {
      res.status(401).send("Authentication failed");
      return;
    }
    res.status(200).end();
    //return
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong! Try again.");
  }
}

async function getUser(req, res) {
  const user = req.user;
  if (!user) {
    res.status(404).send("The user does not exist!");
    return;
  }
  res.json(user);
}

module.exports = {
  createUser,
  loginUser,
  getUser /*updateUser, deleteUser,*/,
};
