class AutoresDao {

    constructor(db) {
        this._db = db;
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
            
            if(autor.nome.length < 3 || autor.email.th < 3 || autor.senha.th < 3) {
                return reject('tamanho');
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
                            return reject('existe');
                        }
                        resolve();
                    }
                }
            );
        });
    }
}

module.exports = AutoresDao;