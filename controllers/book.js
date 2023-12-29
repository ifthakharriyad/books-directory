function getAllBooks(req, res) {
  res.send("All the books");
}

function createBook(req, res) {
  res.send(req.body);
}

function getBook(req, res) {
  const { id } = req.params;
  res.send(`Here is the book with id:${id}`);
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
