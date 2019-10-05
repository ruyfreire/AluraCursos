class LivrosDao {

    constructor(db) {
        this._db = db;
        this._erros = {
            tipo: '',
            qtd: 0,
            msg: []
        };
    }

    listar() {
        return new Promise((resolve, reject) => {                
            this._db.all(`SELECT * FROM livros`,
            (err, rows) => {
                if(err) {
                    console.log(err);
                    return reject('Erro ao buscar livros');
                }
                else {
                    resolve(rows);
                }
            });
        });
    }

    adiciona(livro) {
        return new Promise((resolve, reject) => {
            
            let validacoes = {titulo:'',preco:'',autorId:''};

            if(livro.titulo.trim().length < 3) {
                validacoes.titulo = 'Titulo inválido';
                this._erros.qtd++;
            }
            if(isNaN(livro.preco) || livro.preco <= 0) {
                validacoes.preco = 'Preço inválido';
                this._erros.qtd++;
            }
            if(livro.autorId == 0) {
                validacoes.autorId = 'Selecione um autor';
                this._erros.qtd++;
            }
            if(this._erros.qtd > 0) {
                this._erros.tipo = 'validaçoes';
                this._erros.msg.push(validacoes);
                return reject(this._erros);
            }

            this._db.run(`
                INSERT INTO livros (
                    titulo,
                    preco,
                    autorId
                )
                SELECT '${livro.titulo}', '${livro.preco}', '${livro.autorId}' WHERE NOT EXISTS (SELECT * FROM livros WHERE titulo = '${livro.titulo}')`,
                function(error) {
                    if(error){
                        console.log(error);
                        return reject('Não foi possível adicionar o livro!');
                    }
                    else {
                        if(this.changes == 0) {
                            return reject({
                                tipo: 'existe',
                                qtd: 1,
                                msg: [{livro: 'Livro já existente'}]
                            });
                        }
                        resolve();
                    }
                }
            );
        });
    }
}

module.exports = LivrosDao;