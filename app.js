const http = require("http");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const { Client } = require("pg");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const summariesRouter = require("./routes/summaries");
const commentsRouter = require("./routes/comments");
const reactionsRouter = require("./routes/reactions");

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(async (req, res, next) => {
  const client = new Client({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
  });
  console.log("*** connecting to postgres client...");
  await client.connect();
  console.log("*** postgres client connected");
  req.client = client;
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/summaries", summariesRouter);
app.use("/comments", commentsRouter);
app.use("/reactions", reactionsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  console.error("Can not find req router: ", req);
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  console.error("err! ", err);
  res.status(err.status || 500);
  res.json({ error: err });
});

const server = http.createServer(app);
server.listen(process.env.PORT || 8888);
server.on("listening", () => {
  console.log("Listening on ", server.address());
});

module.exports = app;
