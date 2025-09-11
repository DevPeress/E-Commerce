# 🎟️ Cupons

```
Pegar a lista de cupons

GET /cupom
Authorization: Bearer <token>

Response
{
   "id": 1,
   "nome": "Start",
   "valor": 50
   "tipo": 1
},
{
   "id": 2,
   "nome": "Start10",
   "valor": 10
   "tipo": 0
},

```

```
Pegar um cupom baseado no id

GET /cupom/id/1
Authorization: Bearer <token>

Response
{
   "id": 1,
   "nome": "Start",
   "valor": 50
   "tipo": 1
}

```

```
Pegar um cupom baseado no nome

GET /cupom/nome/Start
Authorization: Bearer <token>

Response
{
   "id": 1,
   "nome": "Start",
   "valor": 50
   "tipo": 1
}

```

```
Criar um cupom

POST /cupom
Authorization: Bearer <token>
Content-Type: application/json

Request
{
  "nome": "Cupom10",
  "valor": 10,
  "tipo": 1
}

Response
{
  "nome": "Cupom10",
  "valor": 10,
  "tipo": 1
}

```

```
Atualizar informação do cupom

PUT /cupom
Authorization: Bearer <token>
Content-Type: application/json

Request
{
  "id": 1,
  "nome": "Cupom10",
  "valor": 10,
  "tipo": 0
}

Response
{
   "message": "Cupom atualizado!"
}

```

```
Deletar um cupom

DELETE /cupom
Authorization: Bearer <token>
Content-Type: application/json

Request
{
  "id": 1
}

Response
{
   "message": "Cupom deletado!"
}

```

```
Deletar todos os cupons

DELETE /cupom/all
Authorization: Bearer <token>
Content-Type: application/json

Response
{
   "message": "Cupons deletado!"
}

```