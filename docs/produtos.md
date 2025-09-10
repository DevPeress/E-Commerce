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
   "message": "Produto foi atualizado com sucesso!"
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
   "message": "Produto foi deletado com sucesso!"
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
   "message": "Produtos foram deletados com sucesso!"
}

```