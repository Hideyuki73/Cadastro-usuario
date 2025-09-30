require('dotenv').config()
const express = require('express')
const router = express.Router()
const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios ORDER BY id ASC')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

router.post('/', async (req, res) => {
  const { nome, email } = req.body

  if (!nome || !email) {
    return res.status(400).json({ erro: 'Nome e email são obrigatórios.' })
  }

  try {
    const result = await pool.query('INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING *', [nome, email])
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

module.exports = router
