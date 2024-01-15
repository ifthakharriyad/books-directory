const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/userAuth");

const {
  getAllBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
} = require("../controllers/book");

// API endpoints
//GET /api/v1/book/all`: Requests all the books on the directory.
router.route("/all").get(getAllBooks);

//GET /api/v1/book/{id}`: Requests the book with specific _id_.
router.route("/:id").get(getBook);

//POST /api/v1/book`: Add a book.
router.route("/").post(verifyToken, createBook);

//GET /api/v1/book/{id}`: Requests, Updates, and Removes the book with specific _id_.
router.route("/:id").all(verifyToken).put(updateBook).delete(deleteBook);

module.exports = router;
