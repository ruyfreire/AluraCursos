import { Negociacao } from "./Negociacao";
import { Imprimivel } from "./Imprimivel";

export class Negociacoes implements Imprimivel{

    private _negociacoes: Array<Negociacao> = [];

    adiciona(negociacao: Negociacao): void {

        this._negociacoes.push(negociacao);
    }

    paraArray(): Negociacao[] {

        return ([] as Negociacao[]).concat(this._negociacoes);
    }

    paraTexto() {
        console.log("========== NEGOCIAÇÕES =========");
        console.log(JSON.stringify(this._negociacoes));
    }
}