const express = require("express");
const { client } = require("../models/connect");
const { getAUser } = require("../models/getUser");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function verifyToken(req, res, next) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    try {
      const token = req.headers.authorization && req.headers.authorization.split(" ")[1] && req.headers.authorization.split(" ")[1].split("=")[1]
      const decode = await jwt.verify(
        token,
        process.env.SECRET,
      );
      if (!decode.id) {
        res.status(401).send({ message: "User not found!" });
        return;
      }
      let user = await getAUser(decode.id);
      if (!user) {
        res.status(401).send({ message: "User not found!" });
        return;
      }
      req.user = user;
      next();
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Something went wrong!" });
      return;
    }
  } else {
    req.user = undefined;
    res.status(401).send({ message: "Not authorized!" });
  }
}
async function checkDupUser(req, res, next) {
  const { username, email } = req.body;
  if (!username || !email) {
    return res.status(400).send("Provide username and email address.");
  }
  try {
    // Check if the username taken
    let queryConfig = {
      text: "SELECT * FROM users WHERE username=$1",
      values: [username],
    };
    let { rows } = await client.query(queryConfig);
    if (rows.length > 0) {
      return res.status(409).send("username already taken");
    }
    // Check if the email exists
    queryConfig = {
      text: "SELECT * FROM users WHERE email=$1",
      values: [email],
    };
    result = await client.query(queryConfig);
    rows = result.rows;
    if (rows.length > 0) {
      return res.status(409).send("Email already exists! Try logging in.");
    }
    next();
  } catch (err) {
    console.error(err);
  }
}

module.exports = { checkDupUser, verifyToken };
