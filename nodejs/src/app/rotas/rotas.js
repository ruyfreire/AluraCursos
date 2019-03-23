const db = require('../../config/database');
const LivrosDao = require('../infra/livros-dao');

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

        const livrosDao = new LivrosDao(db);
        livrosDao
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

    app.get('/livros/adiciona', function(req, res) {
        res.marko( require('../views/livros/adiciona/adiciona.marko') );
    });

    app.post('/livros/adiciona', function(req, res) {
        console.log(req.body);

        const livrosDao = new LivrosDao(db);
        livrosDao
            .adiciona(req.body)
            .then(() => res.redirect('/livros'))
            .catch(error => console.log(error));
    });

    app.delete('/livros/:id', function(req, resp) {
        const id = req.params.id;
    
        const livroDao = new LivroDao(db);
        livroDao.remove(id)
            .then(() => resp.status(200).end())
            .catch(erro => console.log(erro));
    });

    // app.get('/livros/remove', function(req, res) {
    //     const livrosDao = new LivrosDao(db);
    //     livrosDao
    //         .lista()
    //         .then(livros => 
    //             res.marko(
    //                 require('../views/livros/remove/remove.marko'),
    //                 {
    //                     livros
    //                 }
    //             )
    //         )
    //         .catch(error => console.log(error));
    // });

    // app.post('/livros/remove', function(req, res) {
    //     console.log(req.body);

    //     const id = req.body.id;
    //     const livrosDao = new LivrosDao(db);
    //     livrosDao
    //         .remove(id)
    //         .then(() => res.redirect('/livros'))
    //         .catch(error => console.log(error));
    // });

    app.get('/livros/atualiza', function(req, res) {
        const livrosDao = new LivrosDao(db);
        livrosDao
            .lista()
            .then(livros => 
                res.marko(
                    require('../views/livros/atualiza/atualiza.marko'),
                    {
                        livros
                    }
                )
            )
            .catch(error => console.log(error));
    });

    app.get('/livros/atualiza/:id', function(req, res) {
        const id = req.params.id;
        const livrosDao = new LivrosDao(db);
        livrosDao
            .buscarPorId(id)
            .then(livro => {
                if(livro == '') return res.redirect('/livros/atualiza');
                res.marko(
                    require('../views/livros/atualiza/atualizado.marko'),
                    {
                        livro
                    }
                )
            })
            .catch(error => console.log(error));
    });

    app.post('/livros/atualiza', function(req, res) {
        console.log(req.body);

        const livrosDao = new LivrosDao(db);
        livrosDao
            .atualiza(req.body)
            .then(() => res.redirect('/livros'))
            .catch(error => console.log(error));
    });

    app.get('/livros/buscarid', function(req, res) {
        res.marko( require('../views/livros/buscaPorId/buscar.marko') );
    });

    app.get('/livros/buscarid/:id', function(req, res) {
        const id = req.params.id;
        const livrosDao = new LivrosDao(db);
        livrosDao
            .buscarPorId(id)
            .then(livros => {
                if(livros == '') {
                    res.redirect('/livros/buscarid');
                    return;
                };
                res.marko(
                    require('../views/livros/buscaPorId/buscarPorId.marko'),
                    {
                        livros
                    }
                )
            })
            .catch(error => console.log(error));
    });
}