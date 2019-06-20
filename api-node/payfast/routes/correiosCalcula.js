module.exports = (app) => {

    app.post('/correios/prazo', function(req, res){
        let entrega = req.body;

        let correiosClient = new app.servicos.correiosSOAPClient();
        correiosClient.prazo(entrega, function(erro, retorno){
            if(erro) {
                console.log(erro);
                res.status(400).send(erro);
                return;
            }
            console.log(JSON.stringify(retorno));
            res.status(200).json(retorno);
        });
    });

}