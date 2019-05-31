const db = require('../../config/database');
const LivroDao = require('../infra/livros-dao');

const { validationResult } = require('express-validator/check');

const templates = require('../views/templates');

class LivroControladores {

    static rotas() {
        return {
            lista: '/livros',
            cadastro: '/livros/form',
            edicao: '/livros/form/:id',
            delecao: '/livros/:id'
        }

    }


    lista() {
        return (req, res) => {

            const livroDao = new LivroDao(db);
            let li;
            livroDao
                .lista()
                .then(livros =>                    
                    res.marko(
                        templates.livros.lista,
                        { livros }
                    )
                )
                .catch(error => console.log(error));
        }
    }

    formulario() {
        return (req, res) => {
            res.marko( templates.livros.form, {livro:{}} );
        }
    }

    adiciona() {
        return (req, res) => {
            console.log(req.body);
    
            const errors = validationResult(req);
            if(!errors.isEmpty())
                return res.marko(
                    templates.livros.form,
                    {
                        livro: req.body,
                        errosValidacao: errors.array()
                    }
                );
    
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
                .then(livro => 
                    resp.marko(
                        templates.livros.form,
                        { livro: livro }
                    )
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