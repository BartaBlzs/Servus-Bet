// Imports
const express = require("express");
const app = express();
const fs = require("fs");
const port = 3000;
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: "Outlook365",
  auth: {
    user: 'betservus@outlook.com',
    pass: 'servusBet'
  },
  tls: {
	rejectUnauthorized: false
	}
});

// Files

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/source", express.static(__dirname + "public/source"));
app.use("/img", express.static(__dirname + "public/img"));
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

app.post("/sendmail", bodyParser.text({type: '*/*'}), (req, res) => {
  var mailOptions = {
    from: 'betservus@outlook.com',
    to: req.body.split(";")[1],
    subject: 'Üdvözöljük a Bet servusnál',
    html: '<!DOCTYPE html><html><head><link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet"></head><body style="background-color: #f2f2f2; font-family: "Open Sans", sans-serif; color: #333;"><div style="max-width: 800px; margin: 0 auto; padding: 20px; border: 1px solid gray;"><img src="https://i0.wp.com/coloradohockeynow.com/wp-content/uploads/sites/4/2022/07/casino.png?w=907&ssl=1" alt="Company Logo" style="display: block; width: 100%; margin: 0 auto;"><div style="width: 100%; display: flex; justify-content: center;"><h1 style="font-size: 30px; margin-top: 10px;">Üdv a Bet Servusnál!</h1></div><p style="font-size: 16px; line-height: 1.5;">Szia <strong>'+req.body.split(";")[0]+'</strong>,</p><p style="font-size: 16px; line-height: 1.5;">A Bet Servus online casino egy újonnan alapított oldal, aminek most te is a része lettél! <strong>GRATULÁLOK!</strong></p><p style="font-size: 16px; line-height: 1.5;">Reméljük, hogy jól fogod érezni magad a velünk töltött időben!</p><p style="font-size: 16px; line-height: 1.5;">Ha bármilyen kérdésed lenne, bátran fordulj hozzánk ezen az email címen keresztül!</p><p style="font-size: 16px; line-height: 1.5;">A Bet Servus csapata</p></div></body></html>'
  };
  transporter.sendMail(mailOptions, function(err, info){
    if (err) 
    {
      console.log(err);
    }
    else
    {
      console.log("email was sent to: "+req.body.split(";")[1])
    }
  });
})

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

app.listen(port, () => console.info("App available on http://localhost:" + port));