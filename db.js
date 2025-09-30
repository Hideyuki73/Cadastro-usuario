require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
})

async function init() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL
      );
    `)
    console.log('Tabela "usuarios" verificada com sucesso!')
  } catch (err) {
    console.error('Erro ao inicializar banco:', err)
  }
}

init()

module.exports = pool
