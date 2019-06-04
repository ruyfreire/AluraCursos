const db = require('../../config/database');
const LivroDao = require('../infra/livros-dao');

const { validationResult } = require('express-validator/check');

const templates = require('../views/templates');

class LivroControladores {

    static rotas() {
        return {
            autenticados: '/livros*',
            lista: '/livros',
            cadastro: '/livros/form',
            edicao: '/livros/form/:id',
            delecao: '/livros/:id'
        }

    }


    lista() {
        return (req, res) => {

            const livroDao = new LivroDao(db);
            livroDao
                .lista()
                .then(livros => {
                    let username = req.user.nome;
                    res.marko(
                        templates.livros.lista,
                        { livros, username }
                    );
                }
                )
                .catch(error => console.log(error));
        }
    }

    formulario() {
        return (req, res) => {
            let username = req.user.nome;
            res.marko( templates.livros.form, {livro:{}, username} );
        }
    }

    adiciona() {
        return (req, res) => {
            console.log(req.body);
    
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                let username = req.user.nome;
                    return res.marko(
                        templates.livros.form,
                        {
                            livro: req.body,
                            errosValidacao: errors.array(),
                            username
                        }
                    );
            }
    
            const livroDao = new LivroDao(db);
            livroDao
                .adiciona(req.body)
                .then(() => res.redirect('/livros'))
                .catch(error => console.log(error));
        }
    }

    atualiza() {
        return (req, res) => {
            console.log(req.body);
    
            const livroDao = new LivroDao(db);
            livroDao
                .atualiza(req.body)
                .then(() => res.redirect('/livros'))
                .catch(error => console.log(error));
        }
    }

    buscaPorId() {
        return (req, resp) => {
            const id = req.params.id;
            const livroDao = new LivroDao(db);
        
            livroDao.buscaPorId(id)
                .then(livro => {
                    let username = req.user.nome;
                    resp.marko(
                        templates.livros.form,
                        { livro: livro, username }
                    )
                }
                )
                .catch(erro => console.log(erro));
        }
    }

    remove() {
        return (req, resp) => {
            const id = req.params.id;
        
            const livroDao = new LivroDao(db);
            livroDao.remove(id)
                .then(() => resp.status(200).end())
                .catch(erro => console.log(erro));
        }
    }
}

module.exports = LivroControladores;