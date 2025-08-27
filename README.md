# Empresa

## Descrição

Sistema back-end desenvolvido em TypeScript para gestão de uma loja, com foco na criação de APIs RESTful para gerenciamento de funcionários, produtos e vendas.

## 🧰 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/pt)
- [Express](https://expressjs.com)
- [TypeScript](https://www.typescriptlang.org/)
- [MySQL](https://www.mysql.com/)

## ✨ Funcionalidades

- Cadastro e gerenciamento de funcionários
- Cadastro e gerenciamento de produtos
- Registro de vendas realizadas
- Relatórios de vendas por período
- Autenticação e autorização de usuários

## ⚙️ Instalação

```bash
# Clone o repositório
git clone git clone https://github.com/DevPeress/Empresa.git
cd DashStack

# Instale as dependências
npm install

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
- PUT /funcionarios/ – Atualiza informações de um funcionário
- DELETE /funcionarios/:id – Remove um funcionário
```