
# Movie Reviews API

Bem-vindo ao repositório da **Movie Reviews API**, um projeto desenvolvido como parte de um desafio técnico para criar uma API RESTful que organiza anotações sobre filmes. Esta API integra com o serviço [The Open Movie Database (OMDB)](https://www.omdbapi.com/) para recuperar informações detalhadas sobre filmes e permite criar, listar, atualizar e excluir anotações de maneira prática.

---

## 🛠️ **Instruções para execução pelo Postman**
- Realize a importação do arquivo Movies.postman_collection.json no Postman
- Ele já vira com todas as rotas disponibilizadas

## 🛠️ **Instruções para execução Localmente**

### **Pré-requisitos**
- [Node.js](https://nodejs.org/) (v16 ou superior)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- Chave de API do OMDB (ou utilize a fornecida: `aa9290ba`)

### **Configuração inicial**
1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/movie-reviews-api.git
   cd movie-reviews-api
   ```

2. Configure as variáveis de ambiente no arquivo `.env` (já existe um modelo `.env.example`):
   ```bash
   cp .env.example .env
   ```

3. Suba os containers utilizando o Docker Compose:
   ```bash
   docker-compose up --build
   ```

4. Acesse a API na URL: [http://localhost:3000](http://localhost:3000)

---

## 🚀 **Recursos da API**

### **1. Criar uma anotação de filme**
- **Endpoint**: `/movie-reviews`
- **Método**: `POST`
- **Body**:
  ```json
  {
    "title": "string",
    "notes": "string"
  }
  ```
- **Descrição**: Busca informações do OMDB com base no título fornecido e cria uma anotação no banco de dados.

---

### **2. Listar todas as anotações**
- **Endpoint**: `/movie-reviews`
- **Método**: `GET`
- **Descrição**: Lista todas as anotações criadas. Suporte a filtros e ordenação (opcional):
  - **Ordenação**: Por data de lançamento ou avaliação.
  - **Filtros**: Por título, atores ou diretores.

---

### **3. Buscar uma anotação específica**
- **Endpoint**: `/movie-reviews/:id`
- **Método**: `GET`
- **Descrição**: Retorna uma anotação específica com base no ID.

---

### **4. Atualizar uma anotação**
- **Endpoint**: `/movie-reviews/:id`
- **Método**: `PUT`
- **Descrição**: Atualiza as informações de uma anotação existente.

---

### **5. Deletar uma anotação**
- **Endpoint**: `/movie-reviews/:id`
- **Método**: `DELETE`
- **Descrição**: Remove uma anotação do banco de dados.

---

## 📁 **Estrutura do projeto**
```
src/
├── common/           # Utilitários e classes compartilhadas
├── domain/           # Entidades e regras de negócio
├── infra/            # Configuração de infraestrutura (TypeORM, banco de dados, etc.)
├── modules/          # Módulos organizados por funcionalidade
├── app.module.ts     # Configuração principal do NestJS
├── main.ts           # Ponto de entrada da aplicação
test/
└── integration/      # Testes de integração
```

---

## 🛤️ **Decisões e experiência de desenvolvimento**

### **Estratégia**
- Foquei na construção modular utilizando o poder do `@nestjs` para separar responsabilidades e manter o código legível e escalável.
- Decidi implementar ordenação e filtros no endpoint de listagem, embora opcionais, para aprimorar a experiência do usuário.

### **Processo**
1. Iniciei criando a estrutura básica do NestJS e configurei o TypeORM para se comunicar com o MySQL.
2. Desenvolvi as funcionalidades obrigatórias seguindo o princípio de **primeiro o funcional, depois o ótimo**.
3. Após finalizar a base, implementei os opcionais (ordenação e filtros).
4. Finalizei com a documentação utilizando Swagger, disponível em `/docs`.

### **Dificuldades**
- Gerenciamento de conexões ao banco via Docker exigiu ajustes iniciais para assegurar estabilidade entre o MySQL e a aplicação.

---

## 💡 **Funcionalidades extras**
- **Paginação**: Adicionada em rotas de listagem para otimizar o retorno de dados.
- **Documentação interativa**: Endpoint `/docs` utilizando Swagger.
- **Controle de visualizações**: Implementado contador de visualizações para anotações.

---

## 📦 **Comandos úteis**

- **Reiniciar containers com cache limpo**:
  ```bash
  docker-compose down --volumes --remove-orphans
  docker-compose build --no-cache
  docker-compose up
  ```

- **Acessar logs da aplicação**:
  ```bash
  docker logs -f nestjs-app
  ```

---

## 📝 **Changelog**
- **v1.0.0**: Implementação básica com todas as funcionalidades obrigatórias.
- **v1.1.0**: Melhorias com ordenação, filtros e documentação interativa.
- **v1.2.0**: Funcionalidades extras como paginação e contador de visualizações.

---

## 🌐 **Documentação completa**
- Disponível em: [http://localhost:3000/docs](http://localhost:3000/docs)

---

## 📜 **Notas finais**
Este desafio foi uma experiência enriquecedora. A integração com o OMDB e o uso do NestJS proporcionaram uma oportunidade de explorar boas práticas de desenvolvimento backend e estruturar uma API escalável e organizada.

Espero que o resultado final esteja à altura das expectativas. 😊
