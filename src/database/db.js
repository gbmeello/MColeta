// importar dependencia sqlite3

const sqlite3 = require("sqlite3").verbose()

// iniciar o obj bd

const db = new sqlite3.Database("./src/database/database.db")

module.exports = db



// utilizar o obj de bd pra nossas operacoes
/*

// consultar os dados



// deletar da tabela

db.run(`DELETE FROM places WHERE id = ?`, [8], function(err) {
    if (err) {
        return console.log(err)

    }
    console.log("REGISTRO DELETADO COM SUCESSO")
})
*/