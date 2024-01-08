const { Client } = require("pg");
const books = require("../models/sample-books");
require("dotenv").config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

async function connectDB() {
  await client.connect();
  console.log("DB is connected successfully!");
}

async function prepareDB() {
  // Creating booksdb if not exists.
  await client.query("DROP DATABASE IF EXISTS booksdb");
  await client.query("CREATE DATABASE booksdb");
  await client.query("DROP TABLE IF EXISTS books");
  await client.query(`CREATE TABLE books (
    id INT GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    edition INT,
    publisher VARCHAR(100),
    publishedat DATE,
    isbn BIGINT,
    language VARCHAR(10),
    createdat DATE DEFAULT NOW()
  )`);
  // Creating books table if not exists.
  // await client.query(`SELECT 'CREATE TABLE books (
  //   id INT GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
  //   title VARCHAR(100) NOT NULL,
  //   author VARCHAR(100),
  //   edition INT,
  //   publisher VARCHAR(100),
  //   publishedat DATE,
  //   isbn BIGINT,
  //   language VARCHAR(10),
  //   createdat DATE DEFAULT NOW()
  // )'
  // WHERE NOT EXISTS (SELECT EXISTS (
  //   SELECT 1 FROM information_schema.tables WHERE table_name = 'books'
  // ) AS table_existence)`);

  // await client.query(
  //   "SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'books') AS table_existence;"
  // );

  //Populating the books table
  for (let i = 0; i < books.length; i++) {
    let { title, author, publisher, published, isbn } = books[i];
    let queryConfig = {
      text: "INSERT INTO books(title,author,publisher,publishedat,isbn) VALUES($1,$2,$3,$4,$5)",
      values: [title, author, publisher, published, isbn],
    };
    await client.query(queryConfig);
  }
}
module.exports = { connectDB, prepareDB, client };
