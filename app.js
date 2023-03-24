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
app.use("/source", express.static(__dirname + "public/source"));
// Set views

app.set("views", "./views");
app.set("view engine", "ejs");

// Get and Post requests

app.get("", (req, res) => {
  res.render("index", { "text" : "this is ejs" });
});

app.get("/servusbet", (req, res) => {
  res.render("servusbet");
});



app.post("/getxml", bodyParser.text({type: '*/*'}), (req, res) => {
  fs.readFile("public/source/users.xml", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  })
})

app.post("/setxml", bodyParser.text({type: '*/*'}), (req, res) => {
    let data = req.body;
    fs.writeFile("public/source/users.xml", data, (err) => {
        if (err) console.log(err);
      })
})

app.listen(port, () => console.info("App available on localhost " + port));