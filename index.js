const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_CONNECT, { useNewUrlParser: true }, () => {
  console.log("Connected to the database");
});

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");

app.use("/auth", authRouter);
app.use("/users", userRouter);

app.listen(process.env.PORT, () =>
  console.log(`server running on ${process.env.PORT}`)
);
