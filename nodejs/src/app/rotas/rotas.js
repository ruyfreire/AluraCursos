const { check } = require('express-validator/check');

const BaseControlador = require('../controladores/BaseControlador');
const baseControlador = new BaseControlador();

const LivroControlador = require('../controladores/LivroControlador');
const livroControlador = new LivroControlador();

module.exports = (app) => {
    app.get('/', baseControlador.home());
    

    app.get('/livros', livroControlador.lista());


    app.post('/livros', [
        check('titulo')
            .isLength(
                { min: 5 }
            ).withMessage('O Título do livro deve ter no mínimo 5 caracteres!'),
        
        check('preco')
            .isCurrency({
                thousands_separator: '.',
                decimal_separator: ',' 
            }).withMessage('O Preço deve ser no padrão 0.000,00!')
        ],
    livroControlador.adiciona());


    app.put('/livros', livroControlador.atualiza());


    app.get('/livros/form', livroControlador.formulario());


    app.get('/livros/form/:id', livroControlador.buscaPorId());


    app.delete('/livros/:id', livroControlador.remove());
}