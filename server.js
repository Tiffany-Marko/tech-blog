const express = require('express')
const routes = require("./controllers")
const {engine} = require("express-handlebars")
const session = require("express-session")
const dotenv = require("dotenv")
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const app = express()
const port = 3001
const sequelize = require("./config/connection")
const path = require("path")
dotenv.config()
const sess = {
  secret: process.env.SECRET,
  cookie: {maxAge: 30*60*1000},
  store: new SequelizeStore({
    db: sequelize,
  }),
  resave: false, 
  // proxy: true, 
  saveUninitialized: true
}
app.use(session(sess))
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json())
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(routes)

sequelize.sync({force:false}).then(()=> {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})
