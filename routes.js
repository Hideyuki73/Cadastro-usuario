const express = require('express')
const router = express.Router()
const { pool } = require('./db')

router.post('/', async (req, res) => {
  const { nome, email } = req.body
  if (!nome || !email) {
    return res.status(400).json({ error: 'Nome e email são obrigatórios.' })
  }
  try {
    const result = await pool.query('INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING *', [nome, email])
    res.status(201).json(result.rows[0])
  } catch (err) {
    if (err.code === '23505') {
      res.status(400).json({ error: 'Email já cadastrado.' })
    } else {
      res.status(500).json({ error: 'Erro no servidor.' })
    }
  }
})

router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM usuarios')
  res.json(result.rows)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id])
  if (result.rows.length === 0) return res.status(404).json({ error: 'Usuário não encontrado.' })
  res.json(result.rows[0])
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { nome, email } = req.body
  try {
    const result = await pool.query('UPDATE usuarios SET nome=$1, email=$2 WHERE id=$3 RETURNING *', [nome, email, id])
    if (result.rows.length === 0) return res.status(404).json({ error: 'Usuário não encontrado.' })
    res.json(result.rows[0])
  } catch (err) {
    if (err.code === '23505') {
      res.status(400).json({ error: 'Email já cadastrado.' })
    } else {
      res.status(500).json({ error: 'Erro no servidor.' })
    }
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const result = await pool.query('DELETE FROM usuarios WHERE id=$1 RETURNING *', [id])
  if (result.rows.length === 0) return res.status(404).json({ error: 'Usuário não encontrado.' })
  res.json({ mensagem: 'Usuário deletado com sucesso.' })
})

module.exports = router
