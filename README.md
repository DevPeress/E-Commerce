# Empresa

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=fff)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=fff)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=fff)
![JWT](https://img.shields.io/badge/JWT-black?logo=jsonwebtokens&logoColor=fff)
![Jest](https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=fff)

## Descrição

Sistema **back-end modular** desenvolvido em **TypeScript**, estruturado em **microsserviços** e oferecendo APIs RESTful para gestão de **funcionários, cargos, produtos, clientes, cupons e autenticação**.  
Conta com **validação de dados, segurança avançada, autenticação via JWT e testes automatizados**.

---

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

### 🔑 Fluxo de Autenticação

1. Registrar usuário (`/auth/register`)  
2. Fazer login (`/auth/login`) → gera um **JWT**  
3. Usar o **token** no header `Authorization: Bearer <token>` para acessar endpoints privados  

Exemplo com `curl`:
```bash
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{"email": "admin@empresa.com", "senha": "123456"}'
```

Resposta:
```json
{
  "token": "jwt-gerado-aqui"
}
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

### 🔑 Autenticação ([exemplos](docs/auth.md))  
- `POST /auth/register` → Criar conta  
- `POST /auth/login` → Login com JWT  
- `GET /auth/:email` → Verifica se e-mail já existe  
- `PUT /auth` → Trocar senha  

### 👤 Funcionários ([exemplos](docs/funcionarios.md))  
- `GET /funcionarios` → Lista funcionários  
- `POST /funcionarios` → Criar funcionário  
- `PUT /funcionarios` → Atualizar funcionário  
- `DELETE /funcionarios` → Remover funcionário  

### 🎟️ Cargos ([exemplos](docs/cargo.md))  
- `GET /cargos` → Lista cargos  
- `POST /cargos` → Criar cargo  
- `PUT /cargos` → Atualizar cargo  
- `DELETE /cargos` → Remover cargo 

### 📦 Produtos ([exemplos](docs/produtos.md))  
- `GET /produtos` → Lista produtos  
- `POST /produtos` → Criar produto  
- `PUT /produtos` → Atualizar produto  
- `DELETE /produtos` → Remover produto  

### 🧾 Clientes ([exemplos](docs/clientes.md))  
- `GET /clientes` → Lista clientes  
- `POST /clientes` → Criar cliente  
- `PUT /clientes` → Atualizar cliente  
- `DELETE /clientes` → Remover cliente  

### 🎟️ Cupons ([exemplos](docs/cupom.md))  
- `GET /cupom` → Lista cupons  
- `POST /cupom` → Criar cupom  
- `PUT /cupom` → Atualizar cupom  
- `DELETE /cupom` → Remover cupom  