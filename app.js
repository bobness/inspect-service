const http = require("http");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const { Client } = require("pg");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const summariesRouter = require("./routes/summaries");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(async (req, res, next) => {
  // TODO: store secrets somewhere secure
  const client = new Client({
    user: "postgres",
    password: "p4ssw0rd",
    host: "localhost",
    port: 5432,
    database: "inspect",
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

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

const server = http.createServer(app);
server.listen(process.env.PORT || 8888);
server.on("listening", () => {
  console.log("Listening on ", server.address());
});

module.exports = app;
