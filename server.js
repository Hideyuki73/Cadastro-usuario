const express = require('express')
const routes = require('./routes')
const path = require('path')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/usuarios', routes)

const PORT = 3000
app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`))
