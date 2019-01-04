class Conta {

    constructor(saldo) {

        this._saldo = saldo;
    }

    get saldo() {

        return this._saldo;
    }

    atualiza(taxa) {

        throw new Error("Você deve criar o método atualiza em sua classe");
    }
}