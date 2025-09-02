# Empresa

## Descrição

Sistema back-end desenvolvido em TypeScript para gestão de uma loja, com foco na criação de APIs RESTful para gerenciamento de funcionários, produtos e vendas.

## 🧰 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/pt)
- [Express](https://expressjs.com)
- [TypeScript](https://www.typescriptlang.org/)
- [MySQL](https://www.mysql.com/)
- [JWT](https://www.jwt.io)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Zod](https://zod.dev)
- [Express Rate Limit](https://www.npmjs.com/package/express-rate-limit)
- [Pino](https://www.npmjs.com/package/pino)

## ✨ Funcionalidades

- Cadastro e gerenciamento de Funcionários
- Cadastro e gerenciamento de Cargos
- Cadastro e gerenciamento de Produtos
- Sistema de Registro e Login
- Limitação de Acesso aos EndPoints
- Verificação de Dados recebidos nos EndPoints via ZOD
- Autenticação via JWT

## ⚙️ Instalação

```bash
# Clone o repositório
git clone git clone https://github.com/DevPeress/Empresa.git
cd Empresa

# Instale as dependências dentro de cada micro serviço
npm install

# Crie os arquivos .env em cada serviço com
NODE_ENV= Variavel
JWT_ENV= Variavel
PORT= Variavel

# Inicie o servidor de desenvolvimento
npm run dev
```

## 🗂 Estrutura do Projeto

```
📁 Empresa
 ┣ 📂 Rotas   # Micro Serviços
    ┣ 📂 src 
       ┣ 📂 lib         # Funções auxiliares
       ┣ 📂 routes      # EndPoints do Micro Serviço
       ┣ 📂 types       # Tipagem do Micro Serviço
       ┣ 📄 index.ts    # Rotear para os EndPoints e abertura da Porta
```

## 🔐 Endpoints Disponíveis

# Funcionários

```
- GET /funcionarios – Lista todos os funcionários
- GET /funcionarios/:id – Exibe detalhes de um funcionário
- POST /funcionarios – Cria um novo funcionário
- PUT /funcionarios – Atualiza as informações de um funcionário
- DELETE /funcionarios – Remove um funcionário
- DELETE /funcionarios/all – Remove todos os funcionários
```

# Cargos

```
- GET /cargos – Lista todos os cargos e permissões
- GET /cargo/:id – Exibe detalhes de um cargo
- POST /cargo – Cria um novo cargo
- PUT /cargo – Atualiza as informações de um cargo
- PUT /cargo/all – Atualiza todos os cargos
- DELETE /cargo – Remove um cargo
- DELETE /cargo/all – Remove todos os cargos
```

# Produtos

```
- GET /produtos – Lista todos os produtos
- GET /produtos/:id – Exibe detalhes de um produto
- GET /produtos/:nome – Exibe detalhes de um produto
- POST /produtos – Cria um novo produto
- PUT /produtos – Atualiza as informações de um produto
- DELETE /produtos – Remove um produto
- DELETE /produtos/all – Remove todos os produto
```

# Login

```
- POST /login – Verificação de Login
```

# Register

```
- GET /register – Verifica se o email possui cadastro
- POST /register – Cria uma conta com o email
```