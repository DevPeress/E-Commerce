# Empresa

## Descrição

Sistema back-end desenvolvido em TypeScript para gestão de lojas, oferecendo APIs RESTful para gerenciamento de funcionários, produtos e vendas, com foco em segurança, validação de dados e autenticação via JWT.

## 🧰 Tecnologias Utilizadas

### Back-end e Linguagens:
- [Node.js](https://nodejs.org/pt)
- [Express](https://expressjs.com)
- [TypeScript](https://www.typescriptlang.org/)

### Banco de Dados:
- [MySQL](https://www.mysql.com/)

### Autenticação e Segurança:
- [JWT](https://www.jwt.io)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Express Rate Limit](https://www.npmjs.com/package/express-rate-limit)
- [Cors](https://www.npmjs.com/package/cors)
- [Helmet](https://www.npmjs.com/package/helmet)

### Validação e Logs:
- [Zod](https://zod.dev)
- [Pino](https://www.npmjs.com/package/pino)

### Qualidade de Código:
- [ESLint](https://eslint.org/?utm_source=chatgpt.com)
- [Prettier](https://prettier.io/?utm_source=chatgpt.com)

## ✨ Funcionalidades

- Cadastro e gerenciamento de funcionários
- Cadastro e gerenciamento de cargos
- Cadastro e gerenciamento de produtos
- Sistema de registro e login
- Limitação de acesso aos endpoints
- Validação de dados recebidos nos endpoints via Zod
- Autenticação via JWT

## ⚙️ Instalação

```bash
# Clone o repositório
git clone https://github.com/DevPeress/Empresa.git
cd Empresa

# Entre em cada microsserviço e instale as dependências
cd NomeDoServico
npm install

# Crie o arquivo .env em cada serviço com as variáveis:
# NODE_ENV=valor
# JWT_ENV=valor
# PORT=valor

# Inicie o servidor de desenvolvimento em cada microsserviço
npm run dev
```

## 🗂 Estrutura do Projeto

```
📁 Empresa
 ┣ 📂 Rotas   # Microsserviços
    ┣ 📂 src 
       ┣ 📂 database    # Funções relacionadas ao banco de dados
       ┣ 📂 lib         # Funções auxiliares
       ┣ 📂 middlewares # Verificações de acesso
       ┣ 📂 logs        # Registro de informações
       ┣ 📂 routes      # Endpoints
       ┣ 📂 schemas     # Schemas do Zod
       ┣ 📂 types       # Tipagens
       ┣ 📄 index.ts    # Inicializa rotas e porta
```

## 🔐 Endpoints Disponíveis

# Funcionários

```
- GET    /funcionarios – Lista todos os funcionários
- GET    /funcionarios/:id – Exibe detalhes de um funcionário
- POST   /funcionarios – Cria um novo funcionário
- PUT    /funcionarios – Atualiza as informações de um funcionário
- DELETE /funcionarios – Remove um funcionário
- DELETE /funcionarios/all – Remove todos os funcionários
```

# Cargos

```
- GET    /cargos – Lista todos os cargos e permissões
- GET    /cargos/:id – Exibe detalhes de um cargo
- POST   /cargos – Cria um novo cargo
- PUT    /cargos – Atualiza as informações de um cargo
- PUT    /cargos/all – Atualiza todos os cargos
- DELETE /cargos – Remove um cargo
- DELETE /cargos/all – Remove todos os cargos
```

# Produtos

```
- GET    /produtos – Lista todos os produtos
- GET    /produtos/id/:id – Exibe detalhes de um produto
- GET    /produtos/nome/:nome – Exibe detalhes de um produto
- POST   /produtos – Cria um novo produto
- PUT    /produtos – Atualiza as informações de um produto
- DELETE /produtos – Remove um produto
- DELETE /produtos/all – Remove todos os produto
```

# Authentication

```
- GET    /auth/:email – Verifica se o e-mail possui cadastro
- POST   /auth/register – Cria uma conta com o e-mail
- POST   /auth/login – Verificação de Login
```

# Cupom

```
- GET    /cupom – Lista todos os cupom
- GET    /cupom/id/:id – Exibe detalhes de um cupom
- GET    /cupom/nome/:nome – Exibe detalhes de um cupom
- POST   /cupom – Cria um novo cupom
- PUT    /cupom – Atualiza as informações de um cupom
- DELETE /cupom – Remove um cupom
- DELETE /cupom/all – Remove todos os cupons
```