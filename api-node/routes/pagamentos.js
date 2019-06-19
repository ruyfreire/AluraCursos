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

    app.put('/pagamentos/pagamento/:id', function(req, res){
        let id = req.params.id;
        let pagamento = {};
        pagamento.id = id;
        pagamento.status = 'CONFIRMADO';

        let connection = app.persistencia.connectionFactory();
        let pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.atualiza(pagamento, function(erro){
            if(erro) {
                console.log(erro);
                res.status(500).send('Erro na operação');
                return;
            }
            
            console.log('Pagamento confirmado.');
            res.status(200).send(pagamento);
        })
    });

    app.delete('/pagamentos/pagamento/:id', function(req, res){
        let id = req.params.id;
        let pagamento = {};
        pagamento.id = id;
        pagamento.status = 'CANCELADO';

        let connection = app.persistencia.connectionFactory();
        let pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.atualiza(pagamento, function(erro){
            if(erro) {
                console.log(erro);
                res.status(500).send('Erro na operação');
                return;
            }

            console.log('Pagamento cancelado.');
            res.status(204).send();
        })
    });
}