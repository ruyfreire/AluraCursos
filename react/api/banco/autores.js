class AutoresDao {

    constructor(db) {
        this._db = db;
        this._erros = {
            tipo: '',
            qtd: 0,
            msg: []
        };
    }

    reportaErro() {
         console.log(this);
    }

    listar() {
        return new Promise((resolve, reject) => {                
            this._db.all(`SELECT * FROM autores`,
            (err, rows) => {
                if(err) {
                    console.log(err);
                    return reject('Erro ao buscar Autores');
                }
                resolve(rows);
            });
        });
    }

    adiciona(autor) {
        return new Promise((resolve, reject) => {
            
            let validacoes = {nome:'',email:'',senha:''};

            if(autor.nome.trim().length == 0) {
                validacoes.nome = 'Nome não pode estar vazio';
                this._erros.qtd++;
            }
            if(autor.email.trim().length == 0) {
                validacoes.email = 'Email não pode estar vazio';
                this._erros.qtd++;
            }
            if(String(autor.senha).trim().length == 0) {
                validacoes.senha = 'Senha não pode estar vazia';
                this._erros.qtd++;
            }
            if(this._erros.qtd > 0) {
                this._erros.tipo = 'validaçoes';
                this._erros.msg.push(validacoes);
                return reject(this._erros);
            }

            this._db.run(`
                INSERT INTO autores (
                    nome,
                    email,
                    senha
                )
                SELECT '${autor.nome}', '${autor.email}', '${autor.senha}' WHERE NOT EXISTS (SELECT * FROM autores WHERE email = '${autor.email}')`,
                function(error) {
                    if(error){
                        console.log(error);
                        return reject('Não foi possível adicionar o autor!');
                    }
                    else {
                        if(this.changes == 0) {
                            return reject({
                                tipo: 'existe',
                                qtd: 1,
                                msg: [{usuario: 'Usuário já existente'}]
                            });
                        }
                        resolve();
                    }
                }
            );
        });
    }
}

module.exports = AutoresDao;