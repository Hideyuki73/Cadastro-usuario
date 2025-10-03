const express = require('express')
const routes = require('./routes')
const path = require('path')

const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/usuarios', routes)

module.exports = app
