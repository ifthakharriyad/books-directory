const { Client } = require("pg");

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: "bookdb",
  password: null,
  port: process.env.DB_PORT,
});

async function connectDB() {
  await client.connect();
  console.log("DB is connected successfully!");
}

module.exports = connectDB;
