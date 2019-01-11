var ConnectionFactory = (function () {
    
    const version = 1;
    const dbName = 'aluraframe';
    const stores = ['negociacoes'];
    
    var connection = null;
    var close = null;
    
    return class ConnectionFactory {
    
        constructor() {
    
            throw new Error("Não pode criar instantia desta classe!");
        }
    
        static getConnection() {
            
            return new Promise( (resolve, reject) => {
    
                let requestConnection = window.indexedDB.open(dbName, version);
                
                requestConnection.onupgradeneeded = e => {
                    ConnectionFactory._createStores(e.target.result);
                }
    
                requestConnection.onsuccess = e => {
                    if(!connection) {
                        connection = e.target.result;

                        close = connection.close.bind(connection);
                        connection.close = function () {
                            throw new Error("Você não pode fechar a conexão direto.");
                        }
                    }
                    resolve(connection);
                }
                
                requestConnection.onerror = e => {
                    reject(e.target.error.name);
                }
            });
        }
    
        static _createStores(connection) {
    
            stores.forEach(store => {
                if(connection.objectStoreNames.contains(store))
                    connection.deleteObjectStore(store)
    
                connection.createObjectStore(store, { autoIncrement: true });
            });
        }

        static closeConnection() {
            close();
            connection = null;
        }
    }
})();