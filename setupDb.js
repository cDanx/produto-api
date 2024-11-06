const pool = require('./db');

const setupDatabase = async () => {
    try {
        // Criar a tabela
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
        console.log('Tabela produtos criada com sucesso');

        // Inserir dados iniciais
        const produtosIniciais = [
            {
                name: 'Notebook Dell',
                descricao: 'Notebook Dell Inspiron 15 polegadas',
                preco: 3500.00,
                estoque: 10
            },
            {
                name: 'Mouse Gamer',
                descricao: 'Mouse RGB 12000 DPI',
                preco: 150.00,
                estoque: 20
            },
            {
                name: 'Teclado Mecânico',
                descricao: 'Teclado Mecânico Switch Blue',
                preco: 300.00,
                estoque: 15
            }
        ];

        // Inserir cada produto
        for (const produto of produtosIniciais) {
            await pool.query(
                'INSERT INTO produtos (name, descricao, preco, estoque, data) VALUES ($1, $2, $3, $4, CURRENT_DATE)',
                [produto.name, produto.descricao, produto.preco, produto.estoque]
            );
        }
        console.log('Dados iniciais inseridos com sucesso');

        // Fechar a conexão
        await pool.end();
        console.log('Setup concluído com sucesso!');
    } catch (err) {
        console.error('Erro durante o setup:', err);
    }
};

// Executar o setup
setupDatabase(); 