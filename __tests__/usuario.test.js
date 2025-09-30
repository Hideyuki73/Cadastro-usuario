const request = require('supertest')
const app = require('../server')
const db = require('../db')

beforeAll(async () => {
  await db.query('DELETE FROM usuarios')
})

afterAll(async () => {
  await db.end()
})

describe('Testes da API de Usuários', () => {
  test('Deve cadastrar um usuário', async () => {
    const res = await request(app).post('/usuarios').send({ nome: 'Rodrigo', email: 'rodrigo@test.com' })
    expect(res.statusCode).toBe(201)
  })

  test('Deve listar os usuários', async () => {
    const res = await request(app).get('/usuarios')
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  test('Deve recusar email duplicado', async () => {
    const res = await request(app).post('/usuarios').send({ nome: 'Rodrigo', email: 'rodrigo@test.com' })
    expect(res.statusCode).toBe(400)
  })
})
