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
  "message": "Cliente cadastrado com sucesso!"
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
Pegar um cliente baseado no seu Nome

POST /clientes/nome
Authorization: Bearer <token>
Content-Type: application/json

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
Pegar um cliente baseado no seu CPF

POST /clientes/cpf
Authorization: Bearer <token>
Content-Type: application/json

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
Pegar um cliente baseado no seu E-mail

POST /clientes/email
Authorization: Bearer <token>
Content-Type: application/json

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
Deletar um cliente 

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
Deletar todos os funcionários

DELETE /clientes/all
Authorization: Bearer <token>
Content-Type: application/json

Response
{
   "message": "Usuários deletados!"
}

```