class NegociacaoDao {

    constructor(connection) {

        this._connection = connection;
        this._store = "negociacoes";
    }

    adiciona(negociacao) {

        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(negociacao);

            request.onsuccess = e => resolve();

            request.onerror = e => {

                console.log(e.target.error.name);
                reject("Erro ao adicionar a negociacão no IndexDB");
            }
        });
    }

    listaTodos() {

        return new Promise((resolve, reject) => {
            let todasNegociacoes = [];    
    
            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();
    
            cursor.onsuccess = e => {
    
                let atual = e.target.result;
                if(atual) {    
                    let dados = atual.value;
                    todasNegociacoes.push(new Negociacao(dados._data, dados._quantidade, dados._valor));
    
                    atual.continue();
                }
                else {
                    resolve(todasNegociacoes);
                }
            }
    
            cursor.onerror = e => {    
                console.log(e.target.error);
                reject("Não foi possível carregar as negociações");
            }
        });
    }


}