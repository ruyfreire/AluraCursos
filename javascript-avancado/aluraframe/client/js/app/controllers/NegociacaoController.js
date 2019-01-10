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
    }    
    
    adicionar(event) {
        
        event.preventDefault(); //previne reload
        this._listaNegociacoes.adiciona(this._criaNegociacao()); //adiciona uma nova negociação        
        this._mensagem.texto = "Negociação adicionada com Sucesso!"; // define mensagem        
        this._limparFormulario();//limpa formulario e foca no campo data
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
        
        return new Negociacoes(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);
    }

    _limparFormulario() {

        this._inputData.value = "";
        this._inputData.focus();
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
    }
    
}