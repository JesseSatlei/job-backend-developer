# Etapa de construção
FROM node:18 AS build

# Definir o diretório de trabalho
WORKDIR /usr/src/app

# Copiar package.json e package-lock.json primeiro
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante dos arquivos do projeto (incluindo src e tests)
COPY . .

# Compilar o código TypeScript
RUN npm run build

# Etapa de produção
FROM node:18-slim

# Definir o diretório de trabalho
WORKDIR /usr/src/app

# Copiar apenas os arquivos necessários para produção
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

# Expor a porta usada pelo NestJS
EXPOSE 3000

# Comando para rodar o servidor
CMD ["npm", "run", "start:prod"]
