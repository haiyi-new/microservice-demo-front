const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
require("dotenv").config();

const secret = process.env.SECRET || "";
const url = process.env.AUTH_URL || "http://localhost:9011";
const username = process.env.AUTH_USER || "client";
const password = process.env.AUTH_PASSWORD || "123456";
const secretid =
  process.env.AUTH_APP_ID || "00000000-0000-0000-0000-000000000002";

app.use("/static", express.static(path.resolve(__dirname, "src", "static")));
app.use(
  "/node_modules",
  express.static(path.resolve(__dirname, "node_modules"))
);

// const token = localStorage.getItem('token')
// if (token)
// {
//   console.log('Token:', token);
// }
// else{
//   console.log('Token not found');
// }

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/*", (req, res) => {
  res.locals = {
    secret: secret,
    url: url,
    username: username,
    password: password,
    secretid: secretid,
  };
  res.sendFile(path.resolve(__dirname, "src", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
