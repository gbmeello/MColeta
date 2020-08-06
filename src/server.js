const express = require("express")
const server = express()

// pegar o bd

const db = require("./database/db")

//configurar pastas publica

server.use(express.static("public"))

// habilitar o uso do req. body

server.use(express.urlencoded({ extended: true }))

//utilizando template engine

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})






//configurar caminhos da minha aplicação
//pagina inicial
// req = requisicao // res = resposta

server.get("/", (req, res) => {
    res.render("index.html")
})




server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    //req.body 

    // console.log(req.body)

    // inserir dados no banco de dados
    db.serialize(() => {

        //criar tabela

        db.run(`
            CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                image TEXT,
                name TEXT,
                adress TEXT,
                adress2 TEXT,
                state TEXT,
                city TEXT,
                items TEXT
            );
        `)

        // inserir dados
        const query = `          
        INSERT INTO places (
            image,
            name,
            adress,
            adress,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
        const values = [
            req.body.image,
            req.body.name,
            req.body.adress,
            req.body.adress,
            req.body.state,
            req.body.city,
            req.body.items
        ]

        function afterInsertData(err) {
            if (err) {
                console.log(err)
                return res.send("Erro no Cadastro!")
            }
            console.log("CADASTRADO COM SUCESSO")
            console.log(this)
            return res.render("create-point.html", { saved: true })
        }
        db.run(query, values, afterInsertData)
    })

    return
})



server.get("/search", (req, res) => {


    const search = req.query.search

    if (search == "") {
        //pesquisa vazia

        return res.render("search-results.html", { total: 0 })
    }

    //pegar os dados do banco de dados

    db.all(`SELECT * FROM places WHERE city LIKE = '${search}'`, function(err, rows) {
        if (err) {
            return console.log(err)
        }
        const total = rows.length

        return res.render("search-results.html", { places: rows, total })
    })



})


//ligar o servidor

server.listen(3000)