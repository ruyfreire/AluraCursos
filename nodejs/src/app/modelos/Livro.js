const { check } = require('express-validator/check');

class Livro {

    static validacoes() {
        return  [
            check('titulo').isLength(
                {
                    min: 5
                }).withMessage('O Título do livro deve ter no mínimo 5 caracteres!'),

            check('preco').isCurrency(
                {
                    thousands_separator: '.',
                    decimal_separator: ',' 
                }).withMessage('O Preço deve ser no padrão 0.000,00!')
        ]
    }
}

module.exports = Livro;