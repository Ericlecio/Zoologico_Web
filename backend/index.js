const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(bodyParser.json());

app.post('/animal', (req, res) => {
    const { nome, especie, data_nascimento } = req.body;
    const query = 'INSERT INTO animais (nome, especie, data_nascimento) VALUES (?, ?, ?)';
    db.query(query, [nome, especie, data_nascimento], (err, result) => {
        if (err) throw err;
        res.send('Animal cadastrado com sucesso!');
    });
});

app.put('/animal/:id', (req, res) => {
    const { id } = req.params;
    const { nome, especie, data_nascimento } = req.body;
    const query = 'UPDATE animais SET nome = ?, especie = ?, data_nascimento = ? WHERE id = ?';
    db.query(query, [nome, especie, data_nascimento, id], (err, result) => {
        if (err) throw err;
        res.send('Animal atualizado com sucesso!');
    });
});

app.delete('/animal/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM animais WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) throw err;
        res.send('Animal removido com sucesso!');
    });
});

app.get('/animais', (req, res) => {
    const query = 'SELECT * FROM animais';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/animal/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM animais WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
