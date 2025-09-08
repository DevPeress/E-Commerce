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

### Testes Automatizados
- [Jest](https://jestjs.io)

### Validação e Logs:
- [Zod](https://zod.dev)
- [Pino](https://www.npmjs.com/package/pino)

### Qualidade de Código:
- [ESLint](https://eslint.org/?utm_source=chatgpt.com)
- [Prettier](https://prettier.io/?utm_source=chatgpt.com)

## ✨ Funcionalidades

- Gerenciamento de Funcionários: Cadastro, atualização e exclusão de funcionários.
- Gerenciamento de Cargos: Criação e manutenção de cargos dentro do sistema.
- Gerenciamento de Produtos: Cadastro, edição e remoção de produtos.
- Sistema de Autenticação: Registro e login de usuários com segurança.
- Controle de Acesso por Cargo: Verificação de permissões para endpoints sensíveis.
- Restrição de Endpoints: Limitação de acesso baseada em funções e níveis de usuário.
- Validação de Dados: Uso do Zod para garantir integridade e consistência das informações recebidas.
- Autenticação Segura: Utilização de JWT para autenticação e proteção de rotas.

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

## 🧪 Testes

```bash
# Navegue até o serviço desejado
cd services/<nome-do-servico>

# Instale as dependências
npm install

# Execute os testes
npm test
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

# Clientes

```
- GET    /clientes – Lista todos os clientes
- GET    /clientes/id/:id – Exibe detalhes de um cliente
- GET    /clientes/nome/:nome – Exibe detalhes de um cliente
- GET    /clientes/cpf/:cpf – Exibe detalhes de um cliente
- GET    /clientes/email/:email – Exibe detalhes de um cliente
- POST   /clientes – Cria um novo cliente
- PUT    /clientes – Atualiza as informações de um cliente
- PUT    /clientes/all – Atualiza todas as informações de um cliente
- DELETE /clientes – Remove um cliente
- DELETE /clientes/all – Remove todos os clientes
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

## 🚀 Uso da API

A API expõe endpoints REST para autenticação, funcionários, cargos, produtos, vendas e cupons.
Por padrão, o servidor roda em:

```
http://localhost:3000
```

# 🔑 Autenticação

```
Registrar

POST /auth/register
Content-Type: application/json

Request
{
  "nome": "Peres",
  "email": "admin@empresa.com",
  "senha": "123456",
  "cpf": "111.111.111-11",
  "idade": 21,
  "cep": "11111-111"
}

Response
{
  "token": "jwt-gerado-aqui"
}
```

```
Login

POST /auth/login
Content-Type: application/json

Request
{
  "email": "admin@empresa.com",
  "senha": "123456"
}

Response
{
  "token": "jwt-gerado-aqui"
}
```

# 👤 Funcionários

```
Criar funcionário não sendo Admin

POST /funcionarios
Authorization: Bearer <token>
Content-Type: application/json

Request
{
  "nome": "João da Silva",
  "email": "joao@empresa.com",
  "cpf": "111.111.111-11",
  "idade": 25,
  "cep": "11111-111",
  "cargo_id": 2
}

Response
{
   message: "Acesso negado: apenas Administradores!"
}

```

```
Criar funcionário sendo Admin

POST /funcionarios
Authorization: Bearer <token>
Content-Type: application/json

Request
{
  "nome": "João da Silva",
  "email": "joao@empresa.com",
  "cpf": "111.111.111-11",
  "idade": 25,
  "cep": "11111-111",
  "cargo_id": 2
}

Response
{
   message: "Usuário criado com sucesso!"
}

```

```
Pegar a lista de funcionários

GET /funcionarios
Authorization: Bearer <token>

Response
{
   id: 1,
   "nome": "Peres",
   "email": "Peres@gmail.com",
   "cpf": "111.111.111-11",
   "idade": 21,
   "cep": "11111-111",
   "cargo": "Admin",
},
{
   id: 2,
   "nome": "Fabricio",
   "email": "Fabricio@gmail.com",
   "cpf": "222.111.111-11",
   "idade": 21,
   "cep": "22111-111",
   "cargo": "Funcionario",
}

```

```
Pegar funcionário baseado no seu ID

GET /funcionarios/1
Authorization: Bearer <token>

Response
{
   "nome": "Peres",
   "email": "Peres@gmail.com",
   "cpf": "111.111.111-11",
   "idade": 21,
   "cep": "11111-111",
   "cargo": "Admin",
}

```

```
Atualizar informação do funcionário

PUT /funcionarios
Authorization: Bearer <token>
Content-Type: application/json

Request
{
  "id": 1,
  "tipo": "idade", -- Pode ser nome, email, cpf, idade, cep ou cargo_id
  "valor": 22
}

Response
{
   "id": 1,
   "nome": "Peres",
   "email": "Peres@gmail.com",
   "cpf": "111.111.111-11",
   "idade": 22,
   "cep": "11111-111",
   "cargo": "Admin",
}

```

```
Atualizar informação errada do funcionário

PUT /funcionarios
Authorization: Bearer <token>
Content-Type: application/json

Request
{
  "id": 1,
  "tipo": "nomi", 
  "valor": "Teste"
}

Response
{
   "error": "Tipo informado não é válido"
}

```

```
Deletar um funcionário não sendo admin

DELETE /funcionarios
Authorization: Bearer <token>
Content-Type: application/json

Request
{
  "id": 1
}

Response
{
   "message": "Acesso negado: apenas Administradores!"
}

```

```
Deletar um funcionário sendo admin

DELETE /funcionarios
Authorization: Bearer <token>
Content-Type: application/json

Request
{
  "id": 1
}

Response
{
   "message": "Funcionário deletado!"
}

```

```
Deletar todos os funcionários não sendo admin

DELETE /funcionarios/all
Authorization: Bearer <token>
Content-Type: application/json

Response
{
   "message": "Acesso negado: apenas Administradores!"
}

```

```
Deletar todos os funcionários sendo admin

DELETE /funcionarios/all
Authorization: Bearer <token>
Content-Type: application/json

Response
{
   "message": "Todos os funcionários foram deletados!"
}

```

# 📦 Produtos

```
Criar um produto

POST /produtos
Authorization: Bearer <token>
Content-Type: application/json

Request
{
  "nome": "Computador",
  "quantidade": 3,
  "descricao": "Computador completo para jogos!"
}

Response
{
  "id": 1,
  "nome": "Computador",
  "quantidade": 3,
  "descricao": "Computador completo para jogos!"
}

```

```
Pegar a lista de produtos

GET /produtos
Authorization: Bearer <token>

Response
{
  "id": 1,
  "nome": "Computador",
  "quantidade": 3,
  "descricao": "Computador completo para jogos!"
},
{
  "id": 2,
  "nome": "Celular",
  "quantidade": 1,
  "descricao": "Celular completo!"
}

```

```
Pegar um produto baseado no seu ID

GET /produtos/id/1
Authorization: Bearer <token>

Response
{
  "nome": "Computador",
  "quantidade": 3,
  "descricao": "Computador completo para jogos!"
}

```

```
Pegar um produto baseado no seu Nome

GET /produtos/nome/computador
Authorization: Bearer <token>

Response
{
  "nome": "Computador",
  "quantidade": 3,
  "descricao": "Computador completo para jogos!"
}

```

```
Atualizar informação de um produto

PUT /produtos
Authorization: Bearer <token>
Content-Type: application/json

Request
{
  "id": 1,
  "tipo": "quantidade", 
  "valor": 5
}

Response
{
   "message": "Produto foi atualizado com successo!"
}

```

```
Deletar um produto não sendo admin

DELETE /produtos
Authorization: Bearer <token>
Content-Type: application/json

Request
{
  "id": 1
}

Response
{
   "message": "Acesso negado: apenas Administradores!"
}

```

```
Deletar um produto sendo admin

DELETE /produtos
Authorization: Bearer <token>
Content-Type: application/json

Request
{
  "id": 1
}

Response
{
   "message": "Produto foi deletado com successo!"
}

```

```
Deletar todos os funcionários não sendo admin

DELETE /produtos/all
Authorization: Bearer <token>
Content-Type: application/json

Response
{
   "message": "Acesso negado: apenas Administradores!"
}

```

```
Deletar todos os funcionários sendo admin

DELETE /produtos/all
Authorization: Bearer <token>
Content-Type: application/json

Response
{
   "message": "Produtos foram deletados com successo!"
}

```

# 👤 Clientes

```
Criar um cliente

POST /clientes
Authorization: Bearer <token>
Content-Type: application/json

Request
{
  "nome": "Peres",
  "email": "Peres@gmail.com",
  "cpf": "111.111.111-11",
  "cep": "11111-111",
  "rua": "Rua de Exemplo",
  "numeroCasa": 3,
  "idade": 21,
  "telefone": "(11) 911111-1111"
}

Response
{
  "message": "Cliente cadastrado com successo!"
}

```

```
Pegar a lista de clientes

GET /clientes
Authorization: Bearer <token>

Response
{
  "id": 1,
  "nome": "Peres",
  "email": "Peres@gmail.com",
  "cpf": "111.111.111-11",
  "cep": "11111-111",
  "rua": "Rua de Exemplo",
  "numeroCasa": 3,
  "idade": 21,
  "telefone": "(11) 911111-1111"
},
{
  "id": 2,
  "nome": "Peres2",
  "email": "Peres2@gmail.com",
  "cpf": "2222.111.111-11",
  "cep": "2222-111",
  "rua": "Rua de Exemplo",
  "numeroCasa": 1,
  "idade": 25,
  "telefone": "(11) 922211-1111"
}

```

```
Pegar um cliente baseado no seu ID

GET /clientes/id/1
Authorization: Bearer <token>

Response
{
  "id": 1,
  "nome": "Peres",
  "email": "Peres@gmail.com",
  "cpf": "111.111.111-11",
  "cep": "11111-111",
  "rua": "Rua de Exemplo",
  "numeroCasa": 3,
  "idade": 21,
  "telefone": "(11) 911111-1111"
}

```

```
Pegar um produto baseado no seu Nome

GET /clientes/nome/Peres
Authorization: Bearer <token>

Response
{
  "id": 1,
  "nome": "Peres",
  "email": "Peres@gmail.com",
  "cpf": "111.111.111-11",
  "cep": "11111-111",
  "rua": "Rua de Exemplo",
  "numeroCasa": 3,
  "idade": 21,
  "telefone": "(11) 911111-1111"
}

```


```
Pegar um produto baseado no seu CPF

GET /clientes/cpf/111.111.111-11
Authorization: Bearer <token>

Response
{
  "id": 1,
  "nome": "Peres",
  "email": "Peres@gmail.com",
  "cpf": "111.111.111-11",
  "cep": "11111-111",
  "rua": "Rua de Exemplo",
  "numeroCasa": 3,
  "idade": 21,
  "telefone": "(11) 911111-1111"
}

```

```
Pegar um produto baseado no seu E-mail

GET /clientes/cpf/Peres@gmail.com
Authorization: Bearer <token>

Response
{
  "id": 1,
  "nome": "Peres",
  "email": "Peres@gmail.com",
  "cpf": "111.111.111-11",
  "cep": "11111-111",
  "rua": "Rua de Exemplo",
  "numeroCasa": 3,
  "idade": 21,
  "telefone": "(11) 911111-1111"
}

```

```
Atualizar uma informação de um cliente

PUT /clientes
Authorization: Bearer <token>
Content-Type: application/json

Request
{
  "cpf": "111.111.111-11",
  "tipo": "nome", 
  "valor": "Peres2"
}

Response
{
   "message": "Dados do cliente atualizados!"
}

```

```
Atualizar todas as informação de um cliente

PUT /clientes/all
Authorization: Bearer <token>
Content-Type: application/json

Request
{
  "nome": "Peres2",
  "email": "Peres2@gmail.com",
  "cpf": "111.3333.111-11",
  "cep": "11111-333",
  "rua": "Rua de Exemplo",
  "numeroCasa": 5,
  "idade": 21,
  "telefone": "(11) 911111-1111"
}

Response
{
   "message": "Dados do cliente atualizados!"
}

```

```
Deletar um cliente não sendo admin

DELETE /clientes
Authorization: Bearer <token>
Content-Type: application/json

Request
{
  "id": 1
}

Response
{
   "message": "Acesso negado: apenas Administradores!"
}

```

```
Deletar um produto sendo admin

DELETE /clientes
Authorization: Bearer <token>
Content-Type: application/json

Request
{
  "id": 1
}

Response
{
   "message": "Usuário deletado!"
}

```

```
Deletar todos os funcionários não sendo admin

DELETE /clientes/all
Authorization: Bearer <token>
Content-Type: application/json

Response
{
   "message": "Acesso negado: apenas Administradores!"
}

```

```
Deletar todos os funcionários sendo admin

DELETE /clientes/all
Authorization: Bearer <token>
Content-Type: application/json

Response
{
   "message": "Usuários deletados!"
}

```