const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

router.get('/', (req, res) => {
  Todo.find()
    .lean()
    .sort({ _id: 'asc' }) //正序asc；反序desc
    .then(todos => res.render('index', { todos }))
    .catch(error => console.log(error))
})

module.exports = router