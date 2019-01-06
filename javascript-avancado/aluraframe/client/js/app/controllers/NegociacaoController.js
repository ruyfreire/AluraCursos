class NegociacaoController {

    constructor () {

        let $ = document.querySelector.bind(document);

        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        
        this._listaNegociacoes = new ListaNegociacoes();        
        this._negociacoesView = new NegociacoesView( $("#tabelaView") );
        this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView( $("#mensagemView") );
    }
    
    _criaNegociacao() {
        
        return new Negociacoes(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);
        }
        
    adicionar(event) {
            
        event.preventDefault(); //previne reload
        this._listaNegociacoes.adiciona(this._criaNegociacao()); //adiciona uma nova negociação
        this._negociacoesView.update(this._listaNegociacoes); //atualiza view
        
        this._mensagem.texto = "Negociação adicionada com Sucesso!"; // define mensagem
        this._mensagemView.update(this._mensagem); // exibe mensagem
        
        this._limpar();//limpa formulario e foca no campo data
    }

    _limpar() {

        this._inputData.value = "";
        this._inputData.focus();
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
    }
    
}