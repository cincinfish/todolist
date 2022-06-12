const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser') // 引用 body-parser
const port = process.env.PORT || 3000
const methodOverride = require('method-override')
const session = require("express-session")
require('dotenv').config();

const routes = require('./routes') // 引用路由器
require('./config/mongoose')

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
app.use(routes)

app.listen(port, () => {
  console.log('App is running on http://localhost:3000')
})