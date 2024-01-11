const { client } = require("./connect");

async function getAUser(id) {
  const queryConfig = {
    text: "SELECT * FROM users WHERE id=$1",
    values: [id],
  };
  const { rows } = await client.query(queryConfig);
  if (rows.length == 0) {
    return null;
  }
  return rows[0];
}

module.exports = { getAUser };
