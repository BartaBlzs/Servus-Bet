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
    to: req.body,
    subject: 'Üdvözöljük a Bet servusnál',
    html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml" lang="en">    <head><link rel="stylesheet" type="text/css" hs-webfonts="true" href="https://fonts.googleapis.com/css?family=Lato|Lato:i,b,bi">    <title>Email template</title>    <meta property="og:title" content="Email template">    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0">        <style type="text/css">         a{         text-decoration: underline;        color: inherit;        font-weight: bold;        color: #253342;      }            h1 {        font-size: 56px;      }              h2{        font-size: 28px;        font-weight: 900;       }            p {        font-weight: 100;      }            td {    vertical-align: top;      }            #email {        margin: auto;        width: 600px;        background-color: bisque;      }            button{        font: inherit;        background-color: #FF7A59;        border: none;        padding: 10px;        text-transform: uppercase;        letter-spacing: 2px;        font-weight: 900;         color: white;        border-radius: 5px;         box-shadow: 3px 3px #d94c53;      }            .subtle-link {        font-size: 9px;         text-transform:uppercase;         letter-spacing: 1px;        color: #CBD6E2;      }          </style>      </head>        <body style="width: 100%; margin: auto 0; padding:0; font-family:Lato, sans-serif; font-size:18px; color:#33475B; word-break:break-word">      <div id="email">      <table role="presentation">        <tr>          <td>          <a class="subtle-link" href="#">View in Browser</a>          </td>          <tr>      </table>         <table role="presentation" width="100%">            <tr>              <td style="color: white;">             <img alt="Flower" src="https://hs-8886753.f.hubspotemail.net/hs/hsstatic/TemplateAssets/static-1.60/img/hs_default_template_images/email_dnd_template_images/ThankYou-Flower.png" width="400px">                <h1> Welcome! </h1>              </td>        </table>  <table role="presentation" cellpadding="0" cellspacing="10px" style="padding: 30px 30px 30px 60px;">     <tr>       <td>        <h2> Lorem ipsum dolor sit amet</h2>            <p>              Ut eget semper libero. Vestibulum non maximus nisl, ut iaculis ante. Nunc arcu elit, cursus eget urna et, tempus aliquam eros. Ut eget semper libero. Vestibulum non maximus nisl, ut iaculis ante. Nunc arcu elit, cursus eget urna et, tempus aliquam eros.              </p>            <button>               Button 1            </button>        </td>      </tr>    </table>    <table role="presentation"cellpadding="0" cellspacing="10px" width="100%" style="padding: 30px 30px 30px 60px;">      <tr>          <td>            <img alt="Blog" src="https://www.hubspot.com/hubfs/assets/hubspot.com/style-guide/brand-guidelines/guidelines_sample-illustration-3.svg" width="200px">         <h2> Vivamus ac elit eget </h2>            <p>              Vivamus ac elit eget dolor placerat tristique et vulputate nibh. Sed in elementum nisl, quis mollis enim. Etiam gravida dui vel est euismod, at aliquam ipsum euismod.               </p>          </td>          <td>            <img alt="Shopping" src="https://www.hubspot.com/hubfs/assets/hubspot.com/style-guide/brand-guidelines/guidelines_sample-illustration-5.svg" width="200px">         <h2> Suspendisse tincidunt iaculis </h2>            <p>              Suspendisse tincidunt iaculis fringilla. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras laoreet elit purus, quis pulvinar ipsum pulvinar et.               </p>           </td>          </tr>            <tr>              <td> <button> Button 2 </button> </td>               <td> <button> Button 3 </button> </td>                 </table>  <table role="presentation" width="100%" style="margin-top: 50px;" >      <tr>          <td style="padding: 30px 30px;">         <h2> Nullam porta arcu </h2>            <p>              Nam vel lobortis lorem. Nunc facilisis mauris at elit pulvinar, malesuada condimentum erat vestibulum. Pellentesque eros tellus, finibus eget erat at, tempus rutrum justo.               </p>              <a href="#"> Ask us a question</a>                </td>          </tr>      </table>  <table role="presentation" width="100%" >      <tr>          <td style="padding: 30px 30px;">            <p style="color:#99ACC2"> Made with &hearts; at HubSpot HQ </p>              <a class="subtle-link" href="#"> Unsubscribe </a>                </td>          </tr>      </table>       </div>    </body></html>'
  };
  transporter.sendMail(mailOptions, function(err, info){
    if (err) 
    {
      console.log(err);
    }
    else
    {
      console.log("email was sent to: "+req.body)
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