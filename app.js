// Imports
const express = require('express')
const app = express()
const port = 3000

// Files

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

// Set views

app.set('views', './views')
app.set('view engine', 'ejs')

app.get('', (req, res) => {
    res.render('index', {text: 'this is ejs'})
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.post('/zsa', (req, res) => {
    res.send("zsamo");
});

app.listen(port, ()=>console.info('App available on localhost '+port))