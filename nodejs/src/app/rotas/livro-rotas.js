const LivroControlador = require('../controladores/LivroControlador');
const livroControlador = new LivroControlador();

const Livro = require('../modelos/Livro');


module.exports = (app) => {
    const rotasLivros = LivroControlador.rotas();


    app.get(rotasLivros.lista, livroControlador.lista());


    app.route(rotasLivros.cadastro)
        .get(livroControlador.formulario())
        .post(Livro.validacoes(), livroControlador.adiciona())
        .put(livroControlador.atualiza());


    app.get(rotasLivros.edicao, livroControlador.buscaPorId());


    app.delete(rotasLivros.delecao, livroControlador.remove());
}