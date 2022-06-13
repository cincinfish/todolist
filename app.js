const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser') // 引用 body-parser
const port = process.env.PORT || 3000
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require("express-session")

require('dotenv').config()
const routes = require('./routes') // 引用路由器
// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')
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
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  res.locals.login_msg = req.flash('login_msg')
  next()
})

// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
app.use(routes)

app.listen(port, () => {
  console.log('App is running on http://localhost:3000')
})
