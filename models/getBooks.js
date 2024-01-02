const { client } = require("./connect");

async function getAll() {
  const { rows } = await client.query("SELECT * FROM books");
  return rows;
}

async function getABook(id) {
  const queryConfig = {
    text: "SELECT * FROM books WHERE id=$1",
    values: [id],
  };
  const { rows } = await client.query(queryConfig);
  if (rows.length == 0) {
    return null;
  }
  return rows[0];
}

module.exports = { getAll, getABook };
