const BaseControlador = require('../controladores/BaseControlador');
const baseControlador = new BaseControlador();

const LivroControlador = require('../controladores/LivroControlador');
const livroControlador = new LivroControlador();

const Livro = require('../modelos/Livro');


module.exports = (app) => {
    const rotasBase = BaseControlador.rotas();
    const rotasLivros = LivroControlador.rotas();

    
    app.get(rotasBase.home, baseControlador.home());
    

    app.get(rotasLivros.lista, livroControlador.lista());


    app.post(rotasLivros.lista, Livro.validacoes(), livroControlador.adiciona());


    app.put(rotasLivros.lista, livroControlador.atualiza());


    app.get(rotasLivros.cadastro, livroControlador.formulario());


    app.get(rotasLivros.edicao, livroControlador.buscaPorId());


    app.delete(rotasLivros.delecao, livroControlador.remove());
}