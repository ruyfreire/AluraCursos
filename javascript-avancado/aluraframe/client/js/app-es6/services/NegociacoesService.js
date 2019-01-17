import {HttpService} from "../services/HttpService";
import {Negociacao} from "../models/Negociacao";
import {ConnectionFactory} from "../services/ConnectionFactory";
import {NegociacaoDao} from "../dao/NegociacaoDao";

export class NegociacoesService {

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
                throw new Error("Erro ao importar Negociações da Semana")
            })
    }

    _obterNegociacoesDaSemanaAnterior() {

        return this._http.get('negociacoes/anterior')
            .then( negociacoes =>
                negociacoes.map(n =>
                    new Negociacao(new Date(n.data),n.quantidade,n.valor))
            )                
            .catch( () => {
                throw new Error("Erro ao importar Negociações da Semana Anterior");                    
            })
    }

    _obterNegociacoesDaSemanaRetrasada() {

        return this._http.get('negociacoes/retrasada')
            .then( negociacoes =>
                negociacoes.map(n =>
                    new Negociacao(new Date(n.data),n.quantidade,n.valor))
            )                
            .catch( () => {
                throw new Error("Erro ao importar Negociações da Semana Retrasada");                    
            })
    }


    cadastra(negociacao) {

        return ConnectionFactory
            .getConnection()
                .then(connection => new NegociacaoDao(connection))
                .then(dao => dao.adiciona(negociacao))
                .then(() => "Negociação adicionada com Sucesso")
                .catch(erro => {
                    console.log(erro);
                    throw new Error("Não foi possível adicionar a negociação")
                });
    }


    importa(listaAtual) {

        return this.obterNegociacoes()
           .then(negociacoes =>
                negociacoes.filter(negociacao =>
                !listaAtual.some(negociacaoExistente =>
                       negociacao.isEquals(negociacaoExistente)))
           )
           .catch(erro => {
               console.log(erro);
               throw new Error("Não foi possível importar as negociações");
           });
    }

    lista() {

        return ConnectionFactory
            .getConnection()
            .then(con => new NegociacaoDao(con))
            .then(dao => dao.listaTodos())
            .catch(erro => {
                console.log(erro);
                throw new Error("Não foi possível obter as negociações");
            });
    }

    apaga() {

        return ConnectionFactory
            .getConnection()
                .then( connection => new NegociacaoDao(connection))
                .then(dao => dao.apagaTodos())
                .then(() => "Negociações apagadas com sucesso")
                .catch( erro => {
                    console.log(erro);
                    throw new Error("Erro ao apagar as negociações");
                });

    }
    
}