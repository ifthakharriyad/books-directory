const { client } = require("./connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function createAUser(res, user) {
  let { username, email, password } = user;
  password = await bcrypt.hash(password, 10);

  let queryConfig = {
    text: "INSERT INTO users (username, email, password) VALUES($1,$2,$3)",
    values: [username, email, password],
  };
  await client.query(queryConfig);

  // Get the user id
  queryConfig = {
    text: "SELECT id FROM users WHERE username=$1",
    values: [username],
  };
  let { rows } = await client.query(queryConfig);
  let id = rows[0].id;
  if (id) {
    let token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 1 * 24 * 60 * 60 * 1000,
    });

    res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60 });
    return;
  }
}

module.exports = createAUser;
