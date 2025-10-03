const app = require('./app')
const { init } = require('./db')

const PORT = 3000

init().then(() => {
  app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`))
})
