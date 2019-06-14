module.exports = (app) => {

    app.get('/pagamentos', function(req, res){
        res.send('Pay Pagamanetos');
    });

    app.post('/pagamentos/pagamento', function(req, res){

        req.assert('forma_de_pagamento', 'Forma de pagamento é obrigatório').notEmpty();
        req.assert('valor', 'Valor é obrigatório e deve ser decimal').notEmpty().isFloat();

        let erros = req.validationErrors();
        if(erros) {
            console.log('Dados inválidos!');
            res.status(400).send(erros);
            return;
        }


        let pagamento = req.body;
        console.log('Criando pagamento');

        pagamento.status = 'Criado';
        pagamento.data = new Date();


        let connection = app.persistencia.connectionFactory();
        let pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.salva(pagamento, function(exception, result){
            if(exception) {
                console.log('erro: ' + exception);
                res.status(500);
                res.send('Erro na operação');
            }
            else {
                console.log('pagamento criado: ' + result);
                res.location('/pagamentos/pagamento/' + result.insertId);
                res.status(201).json(pagamento);
            }
        });
    });
}