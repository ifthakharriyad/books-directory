const express = require("express");
const { client } = require("../models/connect");

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

module.exports = { checkDupUser };
