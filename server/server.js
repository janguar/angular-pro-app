const sqlite3 = require('sqlite3');
const express = require("express");
var app = express();

const HTTP_PORT = 8000
app.listen(HTTP_PORT,() => {
  console.log("Server is listening on port " + HTTP_PORT);
});
