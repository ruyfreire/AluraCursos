import { Imprimivel } from "./Imprimivel";

export class Negociacao implements Imprimivel {

    constructor(readonly data: Date, readonly quantidade: number, readonly valor: number) { }


    get volume() {

        return this.quantidade * this.valor;
    }

    paraTexto() {
        console.log("========== NEGOCIAÇÃO ATUAL =========");
        console.log(`
        Data: ${this.data}
        Quantidade: ${this.quantidade}
        Valor: ${this.valor}
        Volume: ${this.volume}
    `)}
}