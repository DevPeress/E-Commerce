# 🔑 Autenticação

```
Verificar email possui cadastro, já existindo conta

POST /auth/admin@gmail.com
Content-Type: application/json

Response
{
  "error": "Email já possui cadsatro na empresa"
}
```

```
Verificar email possui cadastro, não possuindo conta

POST /auth/admin@gmail.com
Content-Type: application/json

Response
{
  "message": "Conta pode ser criada!"
}
```

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

```
Trocar a senha

PUT /auth
Content-Type: application/json

Request
{
  "email": "admin@empresa.com",
  "senha": "123456",
  "senhaNova": "12345"
}

Response
{
  "message": "Senha atualiza com sucesso!"
}
```