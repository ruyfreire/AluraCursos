class ListaNegociacoes {

    constructor() {

        this._listaNegociacoes = [];
    }
    
    adiciona(negociacoes) {
        
        this._listaNegociacoes.push(negociacoes);
    }

    get listaNegociacoes() {

        return [].concat(this._listaNegociacoes);
    }
}