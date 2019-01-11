class NegociacoesService {

    constructor() {

        this._http = new HttpService();
    }

    obterNegociacoes() {
        
        return Promise.all([
            this._obterNegociacoesDaSemana(),
            this._obterNegociacoesDaSemanaAnterior(),
            this._obterNegociacoesDaSemanaRetrasada()]
        )
        .then( negociacoes =>
            negociacoes
                .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
        )
        .catch(erro => erro);
    }

    _obterNegociacoesDaSemana() {

        return this._http.get('negociacoes/semana')
            .then( negociacoes =>
                negociacoes.map(n =>
                    new Negociacao(new Date(n.data),n.quantidade,n.valor))
            )
            .catch( () => {
                throw new Error("Erro ao importar Negociações da Semana!")
            })
    }

    _obterNegociacoesDaSemanaAnterior() {

        return this._http.get('negociacoes/anterior')
            .then( negociacoes =>
                negociacoes.map(n =>
                    new Negociacao(new Date(n.data),n.quantidade,n.valor))
            )                
            .catch( () => {
                throw new Error("Erro ao importar Negociações da Semana Anterior!");                    
            })
    }

    _obterNegociacoesDaSemanaRetrasada() {

        return this._http.get('negociacoes/retrasada')
            .then( negociacoes =>
                negociacoes.map(n =>
                    new Negociacao(new Date(n.data),n.quantidade,n.valor))
            )                
            .catch( () => {
                throw new Error("Erro ao importar Negociações da Semana Retrasada!");                    
            })
    }
}