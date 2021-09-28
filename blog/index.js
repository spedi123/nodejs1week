const express = require('express')
const app = express()
const port = 3000

const connect = require('./schemas')
connect()

const postingRouter = require("./routers/posting");

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api", [postingRouter]);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/posting', (req, res) => {
    res.render('posting')
})

app.get('/detail', (req, res) => {
    res.render('detail')
})

app.get('/edit', (req, res) => {
    res.render('edit')
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})