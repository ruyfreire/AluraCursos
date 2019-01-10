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
    
    esvazia() {
        this._listaNegociacoes = [];
    }

    get volumeTotal() {
        return this._listaNegociacoes.reduce((total, n) => total + n.volume, 0.0);
     }

     ordena(criterio) {
        this._listaNegociacoes.sort(criterio);
    }

    inverteOrdem() {
        this._listaNegociacoes.reverse();
    }
}