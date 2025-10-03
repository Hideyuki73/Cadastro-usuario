const request = require('supertest')
const app = require('../app')
const { pool, init } = require('../db')

beforeAll(async () => {
  await init()
  await pool.query('DELETE FROM usuarios')
})

afterAll(async () => {
  await pool.end()
})

describe('Testes da API de Usuários', () => {
  test('POST /usuarios - Deve cadastrar um novo usuário com sucesso', async () => {
    const newUser = { nome: 'Alice', email: 'alice@example.com' }
    const res = await request(app).post('/usuarios').send(newUser)
    expect(res.statusCode).toBe(201)
    expect(res.body.nome).toBe(newUser.nome)
    expect(res.body.email).toBe(newUser.email)
  })

  test('POST /usuarios - Deve retornar 400 se o email já existir', async () => {
    const user = { nome: 'Bob', email: 'bob@example.com' }
    await request(app).post('/usuarios').send(user)
    const res = await request(app).post('/usuarios').send(user)
    expect(res.statusCode).toBe(400)
    expect(res.body.error).toBe('Email já cadastrado.')
  })

  test('POST /usuarios - Deve retornar 400 se nome ou email estiverem faltando', async () => {
    const res1 = await request(app).post('/usuarios').send({ email: 'semnome@example.com' })
    expect(res1.statusCode).toBe(400)
    expect(res1.body.error).toBe('Nome e email são obrigatórios.')
  })
})
