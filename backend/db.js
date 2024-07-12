const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Usuário padrão do MySQL no XAMPP
    password: '', // Senha padrão do MySQL no XAMPP é vazia
    database: 'zoologico'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database.');
});

module.exports = connection;
