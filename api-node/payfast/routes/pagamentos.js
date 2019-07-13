module.exports = (app) => {

    app.get('/pagamentos', function(req, res){
        res.send('Pay Pagamanetos');
    });

    app.post('/pagamentos/pagamento', function(req, res){

        req.assert('pagamento.forma_de_pagamento', 'Forma de pagamento é obrigatório').notEmpty();
        req.assert('pagamento.valor', 'Valor é obrigatório e deve ser decimal').notEmpty().isFloat();

        let erros = req.validationErrors();
        if(erros) {
            console.log('Dados inválidos!');
            res.status(400).send(erros);
            return;
        }

        let pagamento = req.body['pagamento'];
        let cartao = {};
        let resultado = {
            'dados_do_pagamento': {},
            'dados_do_cartao': {},
            'links': []
        };
        

        console.log('====================  SISTEMA PAYFAST  ======================');
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
                pagamento.id = result.insertId;
                resultado.dados_do_pagamento = pagamento;

                if(pagamento.forma_de_pagamento == 'cartao') {
                    cartao = req.body['cartao'];
                    console.log('Pagamento com cartão');

                    let ClientCartoes = new app.servicos.CartoesClient();
                    ClientCartoes.autoriza(cartao, function(errors, request, response, retorno){
                        if(errors) {
                            console.log(errors);
                            res.status(400).send(errors.body);
                            return;
                        }
                        console.log('Cartão autorizado');
                        resultado.dados_do_cartao = cartao;

                        resultado.links = [
                            {
                                rel: 'confirmar',
                                method: 'PUT',
                                href: 'http://localhost:3000/pagamentos/pagamento/' + pagamento.id
                            },
                            {
                                rel: 'cancelar',
                                method: 'DELETE',
                                href: 'http://localhost:3000/pagamentos/pagamento/' + pagamento.id
                            }
                        ];

                        res.location('/pagamentos/pagamento/' + pagamento.id);
                        res.status(201).json(resultado);
        
                        console.log('pagamento criado');
                        console.log(resultado);
                        console.log('=============================================================');
                    });
                }
                else {
                    resultado.links = [
                        {
                            rel: 'confirmar',
                            method: 'PUT',
                            href: 'http://localhost:3000/pagamentos/pagamento/' + pagamento.id
                        },
                        {
                            rel: 'cancelar',
                            method: 'DELETE',
                            href: 'http://localhost:3000/pagamentos/pagamento/' + pagamento.id
                        }
                    ];
    
                    res.location('/pagamentos/pagamento/' + pagamento.id);
                    res.status(201).json(resultado);
    
                    console.log('pagamento criado');
                    console.log(resultado);
                    console.log('=============================================================');
                }

                

            }
        });
    });

    app.get('/pagamentos/pagamento/:id', function(req, res){

        const id = req.params.id;

        console.log('====================  SISTEMA PAYFAST  ======================');
        console.log('Consultando pagamento: ' + id);

        const connection = app.persistencia.connectionFactory();
        const pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.buscaPorId(id, function(exception, result){
            if(exception) {
                console.log('erro: ' + JSON.stringify(exception));
                res.status(500);
                res.send('Erro na operação');
            }
            else {
                if(!result.length) {
                    console.log('pagamento NÃO encontrado');
                    console.log(result);
                    console.log('=============================================================');

                    res.status(404).send('Pagamento não encontrado!');
                }
                else {
                    console.log('pagamento encontrado');
                    console.log(result);
                    console.log('=============================================================');
    
                    res.status(200).json(result);
                }
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