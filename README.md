# API de Gerenciamento de Produtos

Backend Node.js com Express e PostgreSQL para gerenciamento de produtos.

## 🚀 Começando

Estas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### 📋 Pré-requisitos

* Docker e Docker Compose instalados
* Node.js instalado

### 🔧 Instalação e Execução

1. **Clone este repositório**
   ```bash
   git clone https://github.com/cDanx/produto-api.git
   cd produto-api
   ```

2. **Inicie os containers**
   ```bash
   docker-compose up --build
   ```

3. **Crie a tabela de produtos**
   ```bash
   # Acesse no navegador ou use curl
   GET http://localhost:13000/setup
   ```

### 📋 Endpoints Disponíveis

#### Listar Produtos
```http
GET http://localhost:13000/
```

#### Criar Produto
```http
POST http://localhost:13000/
Content-Type: application/json

{
    "name": "Nome do Produto",
    "desc": "Descrição do Produto",
    "preco": 99.99,
    "estoque": 100
}
```

#### Buscar Produto por ID
```http
GET http://localhost:13000/:id
```

#### Atualizar Produto
```http
PUT http://localhost:13000/:id
Content-Type: application/json

{
    "name": "Nome Atualizado",
    "desc": "Nova Descrição",
    "preco": 89.99,
    "estoque": 50
}
```

#### Deletar Produto
```http
DELETE http://localhost:13000/:id
```

## 🛠️ Construído com

* [Node.js](https://nodejs.org/) - Ambiente de execução
* [Express](https://expressjs.com/) - Framework web
* [PostgreSQL](https://www.postgresql.org/) - Banco de dados
* [Docker](https://www.docker.com/) - Containerização

## 📦 Estrutura do Projeto

```
.
├── Dockerfile          # Configuração do container Node.js
├── docker-compose.yml  # Configuração dos serviços Docker
├── package.json       # Dependências e scripts
├── server.js         # Servidor Express e rotas
└── db.js            # Configuração do PostgreSQL
```

## ⚙️ Variáveis de Ambiente

```
POSTGRES_USER=user123
POSTGRES_PASSWORD=password123
POSTGRES_DB=db123
DB_HOST=db
```

## 🔍 Configuração CORS

O backend está configurado para aceitar requisições de qualquer origem com os seguintes headers:
* Access-Control-Allow-Origin: *
* Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
* Access-Control-Allow-Headers: Content-Type, Accept

## ✒️ Autor

* **Daniel Emanuel Pereira da Silva** - *RA: a388839* - [Daniel](https://github.com/cDanx)

## 📱 Versão

* 1.0.0
    * Primeira versão funcional (06/11/2024)