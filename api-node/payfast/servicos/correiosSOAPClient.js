const soap = require('soap');

function CorreiosSOAPClient(){
    this._url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl';
}

CorreiosSOAPClient.prototype.prazo = function(entrega, callback){
    soap.createClient(this._url,
        function(erro, cliente){
            console.log('Cliente SOAP Criado');    
            cliente.CalcPrazo(entrega, callback);
        }
    );
}

module.exports = function() {
    return CorreiosSOAPClient;
}