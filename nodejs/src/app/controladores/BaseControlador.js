const templates = require('../views/templates');

class BaseControlador {

    static rotas() {
        return {
            home: '/',
            login: '/login'
        }

    }
    
    home() {
        return (req, res) => {
            res.marko(
                templates.base.home
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
        return (req, res) => {
            
        }
    }
}

module.exports = BaseControlador;