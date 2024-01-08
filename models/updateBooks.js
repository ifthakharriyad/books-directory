const { client } = require("./connect");

async function updateAbook(book) {
  // Check if (valid) book data is provided
  if (!book || !book.id) {
    const err = new Error("Provide (valid) book data!");
    return err;
  }
  // Check if the book exist
  const { id } = book;
  let queryConfig = {
    text: "SELECT * FROM books WHERE id=$1",
    values: [id],
  };
  const { rows } = await client.query(queryConfig);
  if (rows.length == 0) {
    const err = new Error("The book does not exist!");
    return err;
  }
  // Update the book
  const { title, author, edition, publisher, publishedat, isbn, language } =
    book;
  queryConfig = {
    text: "UPDATE books SET title=$1, author=$2, edition=$3, publisher=$4, publishedat=$5, isbn=$6, language=$7",
    values: [title, author, edition, publisher, publishedat, isbn, language],
  };
  await client.query(queryConfig);
}

module.exports = updateAbook;
