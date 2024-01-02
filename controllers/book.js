const { getAll, getABook } = require("../models/getBooks");

async function getAllBooks(req, res) {
  try {
    const books = await getAll();
    res.json(books);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong! Try again.");
  }
}

function createBook(req, res) {
  res.send(req.body);
}

async function getBook(req, res) {
  const { id } = req.params;
  try {
    const book = await getABook(id);
    if (!book) {
      res.status(404).send("The book does not exist!");
      return;
    }
    res.json(book);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong! Try again.");
  }
}

function updateBook(req, res) {
  const { id } = req.params;
  res.status(200).send(req.body);
}

function deleteBook(req, res) {
  const { id } = req.params;
  res.send(`Deleted the book with ${id}`);
}

module.exports = { getAllBooks, createBook, getBook, updateBook, deleteBook };
