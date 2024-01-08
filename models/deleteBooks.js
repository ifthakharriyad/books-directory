const { client } = require("./connect");

async function deleteAbook(id) {
  // Check if the book exist
  let queryConfig = {
    text: "SELECT * FROM books WHERE id=$1",
    values: [id],
  };
  const { rows } = await client.query(queryConfig);
  if (rows.length == 0) {
    const err = new Error("The book does not exist!");
    return err;
  }
  // Delte the book
  queryConfig = {
    text: "DELETE FROM books WHERE id=$1",
    values: [id],
  };
  await client.query(queryConfig);
}

module.exports = deleteAbook;
