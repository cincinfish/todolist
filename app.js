const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const port = 3000

const Todo = require('./models/todo') // 載入 Todo model

const app = express()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  Todo.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(todos => res.render('index', { todos })) // 將資料傳給 index 樣板
    .catch(error => console.log(error)) // 錯誤處理
})

app.listen(port, () => {
  console.log('App is running on http://localhost:3000')
})