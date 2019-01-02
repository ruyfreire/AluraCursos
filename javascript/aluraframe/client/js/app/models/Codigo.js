class Codigo {

    constructor() {

        throw new Error("Classe não pode ser instanciada, use seus métodos estaticos");
    }

    static validaCodigo(codigo) {
        if(/\D{3}-\D{2}-\d{2}/.test(codigo)) {
            return 'Código válido!';
        }else {
            return 'Código inválido!';
        }
    }
}