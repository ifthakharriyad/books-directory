//const { getAll, getAUser } = require("../models/getUsers");
const createAUser = require("../models/createUser");
const loginAUser = require("../models/loginUser");
// const updateAUser = require("../models/updateUsers");
// const deleteAUser = require("../models/deleteUsers");

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

// async function getUser(req, res) {
//   const { id } = req.params;
//   try {
//     const user = await getAUser(id);
//     if (!user) {
//       res.status(404).send("The user does not exist!");
//       return;
//     }
//     res.json(user);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Something went wrong! Try again.");
//   }
// }
//
// async function updateUser(req, res) {
//   try {
//     const err = await updateAUser(req.body);
//     if (err) {
//       res.status(400).send("Provide (valid) user data!");
//       return;
//     }
//     res.status(201).end();
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Something went wrong! Try again.");
//   }
// }
//
// async function deleteUser(req, res) {
//   const { id } = req.params;
//   try {
//     const err = await deleteAuser(id);
//     if (err) {
//       res.status(400).send(err);
//       return;
//     }
//     res.status(201).end();
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Something went wrong! Try again.");
//   }
// }

module.exports = {
  createUser,
  loginUser /* getUser, updateUser, deleteUser */,
};
