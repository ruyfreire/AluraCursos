const LivroControlador = require('../controladores/LivroControlador');
const livroControlador = new LivroControlador();

const BaseControlador = require('../controladores/BaseControlador');

const Livro = require('../modelos/Livro');


module.exports = (app) => {
    const rotasLivros = LivroControlador.rotas();

    app.use(rotasLivros.autenticados, function(req, res, next){
        if(req.isAuthenticated()){
            next();
        }
        else {
            res.redirect(BaseControlador.rotas().login);
        }
    });


    app.get(rotasLivros.lista, livroControlador.lista());


    app.route(rotasLivros.cadastro)
        .get(livroControlador.formulario())
        .post(Livro.validacoes(), livroControlador.adiciona())
        .put(livroControlador.atualiza());


    app.get(rotasLivros.edicao, livroControlador.buscaPorId());


    app.delete(rotasLivros.delecao, livroControlador.remove());
}