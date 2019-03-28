class LivrosDao {

    constructor(db) {
        this._db = db;
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db
                .all('SELECT * FROM livros',
                function(error, resultados){
                    if(error) return reject('Não foi possível listas os livros!');

                    resolve(resultados);
                });
        });
    }

    adiciona(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO livros (
                    titulo,
                    preco,
                    descricao )
                values (?, ?, ?)`,
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao
                ], error => {
                    if(error){
                        console.log(error);
                        return reject('Não foi possível adicionar o livro!');
                    }
                    resolve();
                }
            );
        });
    }

    atualiza(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                UPDATE livros SET
                    titulo = ?,
                    preco = ?,
                    descricao = ?
                WHERE id = ?`,
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao,
                    livro.id
                ], error => {
                    if(error){
                        console.log(error);
                        return reject('Não foi possível atualizar o livro!');
                    }
                    resolve();
                }
            );
        });
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                DELETE FROM livros
                WHERE id = ?`,
                [id], error => {
                    if(error){
                        console.log(error);
                        return reject('Não foi possível remover o livro!');
                    }
                    resolve();
                }
            );
        });
    }

    buscaPorId(id) {
        return new Promise((resolve, reject) => {
            this._db
                .get(`
                    SELECT * FROM livros
                    WHERE id = ${id}`,
                    function(error, livro){
                        if(error) return reject('Erro ao buscar livro!');

                        resolve(livro);
                    }
                );
        });
    }
}

module.exports = LivrosDao;