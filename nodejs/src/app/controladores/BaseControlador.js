const templates = require('../views/templates');
const LivroControlador = require('./LivroControlador');

class BaseControlador {

    static rotas() {
        return {
            home: '/',
            login: '/login'
        }

    }
    
    home() {
        return (req, res) => {
            let username = req.user.nome;
            res.marko(
                templates.base.home,
                { username }
            );
        }
    }

    login() {
        return (req, res) => {
            res.marko(
                templates.base.login
            );
        }
    }

    efetuaLogin() {
        return function(req, res, next) {
            const passport = req.passport;
            passport.authenticate('local', (erro, usuario, info) => {
                if(info) return res.marko(templates.base.login);
                if(erro) return next(erro);

                req.login(usuario, (erro) => {
                    if(erro) return next(erro);

                    return res.redirect(LivroControlador.rotas().lista);
                });
            })(req, res, next);
        }
    }
}

module.exports = BaseControlador;