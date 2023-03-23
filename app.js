// Imports
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

// Files

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

// Set views

app.set('views', './views')
app.set('view engine', 'ejs')

// Get and Post requests

app.get('', (req, res) => {
    res.render('index', {text: 'this is ejs'})
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.post('/zsa', jsonParser, (req, res) => {
    let data = req.body.test;
    res.send(JSON.stringify(data));
});

app.listen(port, ()=>console.info('App available on localhost '+port))