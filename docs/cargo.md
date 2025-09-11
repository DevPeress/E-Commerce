# 🎟️ Cargos

```
Pegar a lista de cargos

GET /cargos
Authorization: Bearer <token>

Response
{
   "id": 1,
   "cargo": "Admin",
   "perms": []
},
{
   "id": 2,
   "cargo": "Funcionario",
   "perms": []
},

```

```
Pegar um cargo baseado no id

GET /cargos/1
Authorization: Bearer <token>

Response
{
   "id": 1,
   "cargo": "Admin",
   "perms": []
},

```

```
Criar um cargo

POST /cargos
Authorization: Bearer <token>
Content-Type: application/json

Request
{
  "cargo": "Staff",
  "perms": []
}

Response
{
  "message": "Cargo criado com sucesso!"
}

```

```
Atualizar informação de um cargo

PUT /cargos
Authorization: Bearer <token>
Content-Type: application/json

Request
{
  "id": 1,
  "perms": []
}

Response
{
   "message": "Cargo atualizado com sucesso!"
}

```

```
Atualizar informação de um cargo

PUT /cargos/all
Authorization: Bearer <token>
Content-Type: application/json

Request
{
  "id": 1,
  "perms": []
},
{
  "id": 2,
  "perms": []
}

Response
{
   "message": "Cargos atualizados!"
}

```

```
Deletar um cargo

DELETE /cargos
Authorization: Bearer <token>
Content-Type: application/json

Request
{
  "id": 1
}

Response
{
   "message": "Cargo deletado!"
}

```

```
Deletar todos os cargos

DELETE /cargos/all
Authorization: Bearer <token>
Content-Type: application/json

Response
{
   "message": "Cargos deletados!"
}

```