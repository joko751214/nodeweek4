const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { errorHandle } = require("./service/handler");

const postRouter = require("./routes/posts");
const userRouter = require("./routes/users");

const app = express();

require("./connections");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/posts", postRouter);
app.use("/users", userRouter);

app.use((req, res, next) => {
  errorHandle(res, 404, "無此網站路由");
});

app.use((err, req, res, next) => {
  console.log(err, "error");
  errorHandle(res, 500, "系統異常");
});

module.exports = app;
