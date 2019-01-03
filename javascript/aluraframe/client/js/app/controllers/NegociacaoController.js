class NegociacaoController {

    constructor () {

        let $ = document.querySelector.bind(document);

        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        this._listaNegociacoes = new ListaNegociacoes();
    }

    _limpar() {

        this._inputData.value = "";
        this._inputData.focus();
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
    }

    _criaNegociacao() {

        this._listaNegociacoes.adiciona(
            new Negociacoes(
                DateHelper.textoParaData(this._inputData.value),
                this._inputQuantidade.value,
                this._inputValor.value
            )
        );
    }

    adicionar(event) {
        event.preventDefault();     

        this._criaNegociacao();

        //exibe vetor com todas negociacoes
        console.log(this._listaNegociacoes.listaNegociacoes);
        
        //limpa formulario e foca no campo data
        this._limpar();
    }
    
}