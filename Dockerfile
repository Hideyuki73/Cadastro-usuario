# Usa uma imagem base oficial do Node.js
FROM node:18-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para instalar as dependências
COPY package*.json ./

# Instala as dependências da aplicação
RUN npm install

# Copia o restante do código da aplicação para o diretório de trabalho
COPY . .

# Expõe a porta em que a aplicação Node.js estará rodando
EXPOSE 3000

# Comando para iniciar a aplicação quando o contêiner for executado
CMD ["node", "server.js"]