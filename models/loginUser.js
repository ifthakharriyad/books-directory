const { client } = require("./connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function loginAUser(res, username, email, password) {
  let queryConfig = {
    text: "SELECT * FROM users WHERE username=$1 OR email=$2",
    values: [username,email]
  };
  const { rows } = await client.query(queryConfig);
  if (rows.length == 1) {
    let user = rows[0];
    let id = user.id;
    const isSame = await bcrypt.compare(password, user.password);
    if (isSame) {
      let token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });
      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60 });
      return;
    }
    return new Error("Authentication Failed");
  }
  return new Error("Authentication failed");
}

module.exports = loginAUser;
