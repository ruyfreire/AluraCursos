module.exports = (app) => {

    app.get('/pagamentos', function(req, res){
        res.send('Pay Pagamanetos');
    });

    app.post('/pagamentos/pagamento', function(req, res){
        let pagamento = req.body;
        console.log('Criando pagamento');

        pagamento.status = 'Criado';
        pagamento.data = new Date();


        let connection = app.persistencia.connectionFactory();
        let pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.salva(pagamento, function(exception, result){
            if(exception) {
                console.log('erro: ' + exception);
                res.send('Erro na operação');
            }
            else {
                console.log('pagamento criado: ' + result);
                res.json(pagamento);
            }
        });
    });
}