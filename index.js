const express = require("express");
const cookieParser = require("cookie-parser");
const bookRouter = require("./routes/book");
const userRouter = require("./routes/user");
const { connectDB, prepareDB } = require("./models/connect");
const { checkDupUser } = require("./middlewares/userAuth");
require("dotenv").config();
const app = express();
const port = 3000;

// Middlewires
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// API endpoints
//`GET /api/v1/hello`: Prints "Hello World".
app.get("/api/v1/hello", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/user", userRouter);

(async () => {
  try {
    await connectDB();
    await prepareDB();
    // Listening to the port
    app.listen(port, () => {
      console.log(`Server is listening to the port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
})();
