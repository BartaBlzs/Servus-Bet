// Imports
const express = require("express");
const app = express();
const fs = require("fs");
const port = 3000;
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

// Files

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));
// Set views

app.set("views", "./views");
app.set("view engine", "ejs");

// Get and Post requests

app.get("", (req, res) => {
  res.render("index", { text: "this is ejs" });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.post("/zsa", jsonParser, (req, res) => {
  fs.readFile("public/img/zdsa.xml", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(JSON.stringify(data));
  });
  let data = req.body.test;
});

app.listen(port, () => console.info("App available on localhost " + port));
