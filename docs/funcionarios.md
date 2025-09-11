# 👤 Funcionários

```
Criar funcionário 

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
Deletar um funcionário

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
Deletar todos os funcionários

DELETE /funcionarios/all
Authorization: Bearer <token>
Content-Type: application/json

Response
{
   "message": "Todos os funcionários foram deletados!"
}

```