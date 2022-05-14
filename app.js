const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser') // 引用 body-parser
const port = 3000

const Todo = require('./models/todo')

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

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos }))
    .catch(error => console.log(error))
})

app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name
  // return Todo.create({ name })
  //   .then(() => res.redirect('/'))
  //   .catch(error => console.log('error'))
  // 另一種寫法
  const todo = new Todo({ name })
  return todo.save()
    .then(() => res.redirect('/'))
    .catch(error => console.log('error'))
})


app.listen(port, () => {
  console.log('App is running on http://localhost:3000')
})