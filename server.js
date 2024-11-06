const express = require('express')
const pool = require('./db')
const cors = require('cors')
const port = 13000

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    next();
});

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept'],
    credentials: true
}));

app.use(express.json())


// routes

app.get('/', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM produtos');
        res.status(200).send(data.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

app.post('/', async (req, res) => {
    const { name, desc, preco, estoque } = req.body;
    try {
        await pool.query(
            'INSERT INTO produtos (name, descricao, preco, estoque, data) VALUES ($1, $2, $3, $4, CURRENT_DATE)',
            [name, desc, preco, estoque]  // Certifique-se de que `desc` corresponde a `descricao`
        );
        res.status(200).send({ message: "Produto adicionado com sucesso." });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});


app.get('/setup', async (req, res) => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS produtos (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                descricao VARCHAR(200),
                preco DECIMAL(10, 2) NOT NULL,
                estoque INT DEFAULT 0,
                data DATE DEFAULT CURRENT_DATE
            )
        `);
        res.status(200).send({ message: "Tabela de produto criada com sucesso." });
    } catch (err) {
        console.error("Erro ao criar a tabela:", err);
        res.status(500).send({ message: "Erro ao criar a tabela de produtos." });
    }
});

// Read by ID
app.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const data = await pool.query('SELECT * FROM produtos WHERE id = $1', [id]);

        if (data.rows.length === 0) {
            return res.status(404).send({ message: "Produto não encontrado." });
        }

        res.status(200).send(data.rows[0]);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// Update
app.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, desc, preco, estoque } = req.body;
    try {
        const result = await pool.query(
            'UPDATE produtos SET name = $1, descricao = $2, preco = $3, estoque = $4 WHERE id = $5 RETURNING *',
            [name, desc, preco, estoque, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).send({ message: "Produto não encontrado." });
        }

        res.status(200).send({ message: "Produto atualizado com sucesso.", produto: result.rows[0] });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// Delete
app.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM produtos WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).send({ message: "Produto não encontrado." });
        }

        res.status(200).send({ message: "Produto deletado com sucesso." });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});


app.listen(port, () => console.log(`Server iniciado na porta: ${port}`))