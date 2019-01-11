class NegociacaoController {

    constructor () {

        let $ = document.querySelector.bind(document);

        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");


        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView( $("#tabelaView") ),
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem');
        
        
        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView( $("#mensagemView") ),
            'texto');

        this._ordemAtual = "";

        ConnectionFactory.getConnection()
        .then(con => new NegociacaoDao(con)
        .listaTodos())
        .then(negociacoes =>
            negociacoes.forEach(n => this._listaNegociacoes.adiciona(n)));
        
    }    
    
    adicionar(event) {
        
        event.preventDefault(); //previne reload

        ConnectionFactory.getConnection()
        .then(connection => {
            let negociacao = this._criaNegociacao();

            new NegociacaoDao(connection)
            .adiciona(negociacao)
            .then(() => {
                this._listaNegociacoes.adiciona(negociacao);    
                this._mensagem.texto = "Negociação adicionada com Sucesso!";      
                this._limparFormulario();
            })
        })
        .catch(erro => this._mensagem.texto = erro);

    }

    importaNegociacoes() {

        let service = new NegociacoesService();
        service.obterNegociacoes()
        .then( negociacoes => {
            negociacoes.forEach(n =>
                this._listaNegociacoes.adiciona(n));
                
            this._mensagem.texto = "Negociações importadas com sucesso!";
        })
        .catch( erro => this._mensagem.texto = erro);
    }

    ordena(coluna) {

        if(this._ordemAtual == coluna) {
            // inverte a ordem da lista!
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }
    
    apaga() {
        
        this._listaNegociacoes.esvazia();        
        this._mensagem.texto = "Lista de Negociações apagada com Sucesso!"; // define mensagem
    }

    _criaNegociacao() {
        
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseInt(this._inputValor.value));
    }

    _limparFormulario() {

        this._inputData.value = "";
        this._inputData.focus();
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
    }
    
}