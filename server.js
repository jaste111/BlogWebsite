const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const port = 3000;
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.render('index');
});

app.listen(port, function () {
  console.log("Server is listening on port: " + port);
});
