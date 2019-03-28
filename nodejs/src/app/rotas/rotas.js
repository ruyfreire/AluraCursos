const db = require('../../config/database');
const LivroDao = require('../infra/livros-dao');

module.exports = (app) => {
    app.get('/', function(req, res){
        res.send(`
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Servidor NodeJS</title>
            </head>
            <body>
                <h1>Casa do Código</h1>
            </body>
            </html>
        `);
    });
    

    app.get('/livros', function(req, res){

        const livroDao = new LivroDao(db);
        livroDao
            .lista()
            .then(livros => 
                res.marko(
                    require('../views/livros/lista/lista.marko'),
                    {
                        livros
                    }
                )
            )
            .catch(error => console.log(error));
    });


    app.post('/livros', function(req, res) {
        console.log(req.body);

        const livroDao = new LivroDao(db);
        livroDao
            .adiciona(req.body)
            .then(() => res.redirect('/livros'))
            .catch(error => console.log(error));
    });


    app.get('/livros/form', function(req, res) {
        res.marko( require('../views/livros/form/form.marko'), {livro:{}} );
    });


    app.get('/livros/form/:id', function(req, resp) {
        const id = req.params.id;
        const livroDao = new LivroDao(db);
    
        livroDao.buscaPorId(id)
            .then(livro => 
                resp.marko(
                    require('../views/livros/form/form.marko'),
                    { livro: livro }
                )
            )
            .catch(erro => console.log(erro));
    });


    app.delete('/livros/:id', function(req, resp) {
        const id = req.params.id;
    
        const livroDao = new LivroDao(db);
        livroDao.remove(id)
            .then(() => resp.status(200).end())
            .catch(erro => console.log(erro));
    });
}