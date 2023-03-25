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
    to: req.body,
    subject: 'Üdvözöljük a Bet servusnál',
    html: '<!DOCTYPE html><html lang="hu"><head>  <meta charset="UTF-8">  <meta http-equiv="X-UA-Compatible" content="IE=edge">  <meta name="viewport" content="width=device-width, initial-scale=1.0">  <title>Servus Bet</title>  <link href="https://fonts.googleapis.com/css?family=Asap" rel="stylesheet">  <style>  body {    background-color: rgba(25, 31, 35, 1);    font-family: "Asap", sans-serif;    overflow: hidden;  }    .login {    display: block;  }    .signup {    display: none;  }    .container {    display: flex;    justify-content: center;    align-items: center;    height: 100vh;  }    .userinfo {    position: relative;    overflow: hidden;    background-color: whitesmoke;    padding: 30px;    border-radius: 10px;    position: absolute;    width: 400px;  }    .userinfo > input {    font-family: "Asap", sans-serif;    display: block;    border-radius: 5px;    font-size: 16px;    background: white;    width: 100%;    border: 0;    padding: 10px 10px;    margin: 15px -10px;  }  .userinfo > div > button {    font-family: "Asap", sans-serif;    cursor: pointer;    color: #fff;    font-size: 16px;    text-transform: none;    width: 100px;    border: 0;    padding: 13px 0;      border-radius: 7px;    background-color: rgba(25, 31, 35, 1);    transition: background-color 300ms;  }  .userinfo > div > button:hover {    background-color: rgba(45, 51, 55, 1);  }    .userinfo > div > a  {    color: rgba(25, 31, 35, 1);    text-decoration: none;    cursor: pointer;    width: 130px;    white-space: nowrap;  }    .userinfo > div > a:hover  {    color: rgba(45, 51, 55, 1);  }    .userinfo > div  {    display: flex;    justify-content: center;    align-items: center;    column-gap: 45%;  }</style></head><body>  <div class="container">	<div class="userinfo login">		<input type="text" required placeholder="felhasználónév">		<input type="password" required placeholder="jelszó">        <div>            <a onclick="loginSignupToggle()">Nincs még fiókja?</a>            <button onclick="login()">Belépés</button>    	</div>	</div>		<div class="userinfo signup">		<input type="text" required placeholder="felhasználónév">		<input type="password" required placeholder="jelszó">		<input type="email" required placeholder="email">        <div>            <a onclick="loginSignupToggle()">Van már fiókja?</a>            <button onclick="login()">Regisztráció</button>    	</div>	</div></div>    </body><script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js" integrity="sha256-/H4YS+7aYb9kJ5OKhFYPUjSJdrtV6AeyJOtTkw6X72o=" crossorigin="anonymous"></script><script src="js/main.js"></script> </html>'
  };
  transporter.sendMail(mailOptions, function(err, info){
    if (err) 
    {
      console.log(err);
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

app.listen(port, () => console.info("App available on localhost " + port));