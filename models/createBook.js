const { client } = require("./connect");

async function createABook(book) {
  if (!book || !book.title || !book.author) {
    const err = new Error("Provide (valid) book data!");
    return err;
  }
  const { title, author, edition, publisher, publishedat, isbn, language } =
    book;
  const queryConfig = {
    text: "INSERT INTO books(title,author,edition,publisher,publishedat,isbn,language) VALUES($1,$2,$3,$4,$5,$6,$7)",
    values: [title, author, edition, publisher, publishedat, isbn, language],
  };
  await client.query(queryConfig);
}

module.exports = createABook;
