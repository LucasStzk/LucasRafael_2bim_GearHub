const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors());

app.get('/categorias', async (req, res) => {
    const resultado =
    await pool.query('SELECT * FROM categorias');

    res.json(resultado.rows);
});

app.get('/produtos', async (req, res) => {
    const resultado =
    await pool.query('SELECT * FROM produtos');

    res.json(resultado.rows);
});

app.get('/produtos/categoria/:id', async (req, res) => {
    const id = req.params.id;

    const resultado =
    await pool.query(
        'SELECT * FROM produtos WHERE categoria_id = $1',
        [id]
    );

    res.json(resultado.rows);
});

app.listen(3000, () => {
    console.log('Servidor rodando');
});