const express = require("express");
const bookRouter = require("./routes/book");
const app = express();
const port = 3000;

// Middlewires
app.use(express.urlencoded({ extended: false }));

// API endpoints
//`GET /api/v1/hello`: Prints "Hello World".
app.get("/api/v1/hello", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/book", bookRouter);

// Listening to the port
app.listen(port, () => {
  console.log(`Server is listening to the port ${port}`);
});
