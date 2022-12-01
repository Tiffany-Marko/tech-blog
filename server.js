const express = require('express')
const routes = require("./controllers")
const {engine} = require("express-handlebars")
const app = express()
const port = 3001

app.use(express.json())
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(routes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})