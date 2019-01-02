class NegociacaoController {

    constructor () {

        let $ = document.querySelector.bind(document);

        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

    }

    _limpar() {

        this._inputData.value = "";
        this._inputData.focus();
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
    }

    adicionar(event) {
        event.preventDefault();
        let data = new Date ( 
            ...this._inputData.value
            .split("-")
            .map((item, indice) => item - indice % 2)
        );



        let negociacao = new Negociacoes(
            data,
            this._inputQuantidade.value,
            this._inputValor.value
        );

        console.log(negociacao);
        
        this._limpar();

    }
    
}