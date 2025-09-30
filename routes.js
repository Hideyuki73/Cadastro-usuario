const express = require('express')
const router = express.Router()
const db = require('./db')

// rota para listar
router.get('/usuarios', async (req, res) => {
  const result = await db.query('SELECT * FROM usuarios ORDER BY id DESC')
  res.json(result.rows)
})

// rota para cadastrar
router.post('/usuarios', async (req, res) => {
  const { nome, email } = req.body

  if (!nome || !email) return res.status(400).json({ erro: 'Nome e email são obrigatórios' })

  try {
    const result = await db.query('INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING *', [nome, email])
    res.status(201).json(result.rows[0])
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ erro: 'Email já cadastrado' })
    }
    console.error(err)
    res.status(500).json({ erro: 'Erro no servidor' })
  }
})

module.exports = router
