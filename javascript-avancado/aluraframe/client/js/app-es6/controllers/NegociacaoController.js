import {ListaNegociacoes} from "../models/ListaNegociacoes";
import {Mensagem} from "../models/Mensagem";
import {NegociacoesView} from "../views/NegociacoesView";
import {MensagemView} from "../views/MensagemView";
import {NegociacoesService} from "../services/NegociacoesService";
import {DateHelper} from "../helpers/DateHelper";
import {Bind} from "../helpers/Bind";
import {Negociacao} from "../models/Negociacao";

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
        this._service = new NegociacoesService();
        
        this._init();
    }
    
    _init() {
        
        this._service
            .lista()
            .then(negociacoes =>
                negociacoes.forEach(negociacao =>
                    this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => this._mensagem.texto = erro);

        
        setInterval(() => this.importaNegociacoes(), 3000)
    }
    
    adiciona(event) {
        
        event.preventDefault();

        let negociacao = this._criaNegociacao();

        this._service
            .cadastra(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = mensagem;
                this._limparFormulario();
            })
            .catch(erro => this._mensagem.texto = erro);

    }

    importaNegociacoes() {

        this._service
            .importa(this._listaNegociacoes.listaNegociacoes)
            .then(negociacoes => {
                negociacoes.forEach(negociacao =>
                    this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = "Negociações do período importadas";
            })
            .catch(erro => this._mensagem.texto = erro)
    }

    ordena(coluna) {

        if(this._ordemAtual == coluna) this._listaNegociacoes.inverteOrdem();
        else this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);

        this._ordemAtual = coluna;
    }
    
    apaga() {

        this._service
            .apaga()
            .then(mensagem => {
                this._listaNegociacoes.esvazia();
                this._mensagem.texto = mensagem;
            })
            .catch(erro => this._mensagem.texto = erro);
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

let negociacaoController = new NegociacaoController();

export function currentInstance() {

    return negociacaoController;

}