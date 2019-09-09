const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

db.serialize( () => {
    db.run(`
        CREATE TABLE IF NOT EXISTS autores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome VARCHAR(40) NOT NULL,
            email VARCAHR(40) NOT NULL,
            senha VARCHAR(20) NOT NULL
        )
    `);

    db.run(`
        INSERT INTO autores (
            nome, 
            email,
            senha
        ) SELECT 'ruy', 'ruy@alura.com', '123' WHERE NOT EXISTS (SELECT * FROM autores WHERE email = 'ruy@alura.com')
    `);

    // db.each("SELECT * FROM autores", (err, autor) => {
    //     console.log(autor);
    // });

});

process.on('SIGINT', () =>
    db.close(() => {
        console.log('Banco de dados fechado');
        process.exit(0);
    })
);

module.exports = db;