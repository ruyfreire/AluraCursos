export class View {

    constructor(elemento) {

        this._elemento = elemento;        
    }

    template() {

        throw new Error("Você deve sobrescrever este método em seu template!");
    }

    update(modelo) {

        this._elemento.innerHTML = this.template(modelo);
    }
}