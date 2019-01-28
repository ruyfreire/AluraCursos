import { Negociacao } from "./index";

export class Negociacoes {

    private _negociacoes: Array<Negociacao> = [];

    adiciona(negociacao: Negociacao): void {

        this._negociacoes.push(negociacao);
    }

    paraArray(): Negociacao[] {

        return [].concat(this._negociacoes);
    }
}