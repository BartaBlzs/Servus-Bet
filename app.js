// Imports
const express = require("express");
const app = express();
const fs = require("fs");
const port = 3000;
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
var nodemailer = require('nodemailer');
const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const ENCRYPTION_KEY = '68576D5A7134743677397A24432646294A404E635266556A586E327235753878';
const IV_LENGTH = 16;

var transporter = nodemailer.createTransport({
  service: "Outlook365",
  auth: {
    user: 'team.servusbet@outlook.com',
    pass: 'Servusteam'
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
})

app.get("/servusbet", (req, res) => {
  res.render("servusbet")
})

app.get("/setpass", (req, res) => {
  res.render("setpass")
})

app.post("/sendmail", bodyParser.text({type: '*/*'}), (req, res) => {
  var mailOptions = {
    from: 'team.servusbet@outlook.com',
    to: req.body.split(";")[1],
    subject: 'Üdvözöljük a Bet servusnál',
    html: '<!DOCTYPE html><html>  <head>    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet">  </head>  <body style="background-color: #ffff; font-family: "Open Sans", sans-serif; color: #333;">    <div style="max-width: 800px; margin: 0 auto; padding: 20px;">      <img src="https://live.staticflickr.com/65535/52785329231_c75f1a28cb_c.jpg" alt="Company Logo" style="display: block; width: 100%; margin: 0 auto;">      <hr style="width: 90%">      <div style="width: 100%; display: flex; justify-content: center;">        <h1 style="font-size: 30px; margin-top: 30px; text-align: center; width: 100%;">          Üdv a Servus Betnél!        </h1>      </div>      <p style="font-size: 16px; line-height: 1.5;">        Szia <strong>'+req.body.split(";")[0]+'</strong>,<br>      </p>      <p style="font-size: 16px; line-height: .5;">        A Bet Servus egy újonnan alapított online casino oldal, aminek most te is a része lettél!<br>      </p>      <p style="font-size: 20px; line-height: 2; text-align: center;">        <strong>GRATULÁLOK!</strong><br>      </p>      <p style="font-size: 16px; line-height: 1;">        Reméljük, hogy jól fogod érezni magad a velünk töltött időben!<br>      </p>      <p style="font-size: 16px; line-height: .5;">        Ha bármilyen kérdésed lenne, bátran fordulj hozzánk ezen az email címen keresztül!<br>      </p>      <p style="font-size: 16px; line-height: 2;">        A Bet Servus csapata      </p>    </div>  </body></html>'
  }

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

app.post("/sendforgotmail", bodyParser.text({type: '*/*'}), (req, res) => {
  var mailOptions = {
    from: 'team.servusbet@outlook.com',
    to: req.body.split(";")[1],
    subject: 'Elfelejtett jelszó',
    html: '<!DOCTYPE html><html>  <head>    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet">  </head>  <body style="background-color: #ffff; font-family: "Open Sans", sans-serif; color: #333;">    <div style="max-width: 800px; margin: 0 auto; padding: 20px;">      <img src="https://live.staticflickr.com/65535/52785329231_c75f1a28cb_c.jpg" alt="Company Logo" style="display: block; width: 100%; margin: 0 auto;">      <hr style="width: 90%">      <div style="width: 100%; display: flex; justify-content: center;">      </div>      <p style="font-size: 16px; line-height: 1.5;">        Szia <strong>'+req.body.split(";")[2]+'</strong>,<br>      </p>      <p style="font-size: 16px; line-height: 1;">        Erről az email-címről új jelszót kértél a fiókodhoz, a megadott kóddal tudod megváltoztatni a jelszavadat. <br>      </p>      <p style="font-size: 20px; line-height: 2.5; text-align: center;">        <strong>'+req.body.split(";")[0]+'</strong><br>      </p>      <p style="font-size: 16px; line-height: .5;">        Ha bármilyen kérdésed lenne, bátran fordulj hozzánk ezen az email címen keresztül!<br>      </p>      <p style="font-size: 16px; line-height: 2;">        A Bet Servus csapata      </p>    </div>  </body></html>'
  }

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
    console.log(decrypt(data))
    res.send(decrypt(data));
  })
})

app.post("/setxml", bodyParser.text({type: '*/*'}), (req, res) => {
  let data = req.body;
  
  fs.writeFile("public/source/users.xml", encrypt(data), (err) => {
      if (err) console.log(err);
      else console.log("data stored successfully")
  })
})

function encrypt(text) {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
  let textParts = text.split(':');
  let iv = Buffer.from(textParts.shift(), 'hex');
  let encryptedText = Buffer.from(textParts.join(':'), 'hex');
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

app.listen(port, () => console.info("App available on http://localhost:" + port));