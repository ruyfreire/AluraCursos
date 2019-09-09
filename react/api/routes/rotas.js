const db = require('../config/database');
const AutoresDao = require('../banco/autores');

module.exports = (app) => {

    app.get('/autores', function(req, res){
        const autores = new AutoresDao(db);

        autores.listar()
        .then( autor => {
            res.status(200).json(autor);
         } )
        .catch( error => { 
            console.log(error);
            res.status(500).send('Erro ao buscar');
        });
    });
            
    app.post('/autores/cadastrar', function(req, res){
        const autor = req.body;
        
        const autores = new AutoresDao(db);

        autores.adiciona(autor)
        .then( () => {
            autores.listar()
            .then( autor => res.status(201).json(autor) )
            .catch( () => res.status(201).send('Adicionado, porém com erro para retornar atualizado!') );
        })
        .catch(error => {
            if(error == 'tamanho') res.status(400).json('Campos devem ser maior que 3 digitos')
            else if(error == 'existe') res.status(400).json('Autor já existe')
            else {
                console.log(error);
                res.status(500).json(error);
            }
        });
    });
}