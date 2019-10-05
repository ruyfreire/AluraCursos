const db = require('../config/database');
const AutoresDao = require('../banco/AutoresDao');
const LivrosDao = require('../banco/LivrosDao');

class EstanteLivros {

    montarEstante() {
        const autores = new AutoresDao(db);
        const livros = new LivrosDao(db);

        return new Promise((resolve, reject) => {
            let livrosIds = [];

            livros.listar()
            .then( livros => {
                livros.map(livro => {
                    livrosIds.push(livro.id);
                });

                autores.listarPorArrayId(livrosIds)
                    .then(nomesAutores => {
                        resolve( this.organizaEstante(livros, nomesAutores) );
                    })
                    .catch(erro => {
                        console.log(erro);
                        reject(erro);
                    });
                })
            .catch( error => { 
                console.log(error);
                reject(error);
            });
        });
    }


    organizaEstante(livros, autores) {
        const estante = [];

        livros.map(livro => {
            autores.map(autor => {
                if(livro.autorId == autor.id)
                    estante.push({
                        id: livro.id,
                        titulo: livro.titulo,
                        preco: livro.preco,
                        autorId: autor.id,
                        nomeAutor: autor.nome
                    });
            })
        })

        return estante;
    }
}

module.exports = EstanteLivros;