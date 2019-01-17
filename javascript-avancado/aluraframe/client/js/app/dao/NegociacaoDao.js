"use strict";

System.register(["../models/Negociacao"], function (_export, _context) {
  "use strict";

  var Negociacao, NegociacaoDao;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  return {
    setters: [function (_modelsNegociacao) {
      Negociacao = _modelsNegociacao.Negociacao;
    }],
    execute: function () {
      _export("NegociacaoDao", NegociacaoDao = function () {
        function NegociacaoDao(connection) {
          _classCallCheck(this, NegociacaoDao);

          this._connection = connection;
          this._store = "negociacoes";
        }

        _createClass(NegociacaoDao, [{
          key: "adiciona",
          value: function adiciona(negociacao) {
            var _this = this;

            return new Promise(function (resolve, reject) {
              var request = _this._connection.transaction([_this._store], 'readwrite').objectStore(_this._store).add(negociacao);

              request.onsuccess = function (e) {
                return resolve();
              };

              request.onerror = function (e) {
                console.log(e.target.error);
                reject("Erro ao adicionar a negociacão no IndexDB");
              };
            });
          }
        }, {
          key: "listaTodos",
          value: function listaTodos() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
              var todasNegociacoes = [];

              var cursor = _this2._connection.transaction([_this2._store], 'readwrite').objectStore(_this2._store).openCursor();

              cursor.onsuccess = function (e) {
                var atual = e.target.result;

                if (atual) {
                  var dados = atual.value;
                  todasNegociacoes.push(new Negociacao(dados._data, dados._quantidade, dados._valor));
                  atual.continue();
                } else {
                  resolve(todasNegociacoes);
                }
              };

              cursor.onerror = function (e) {
                console.log(e.target.error);
                reject("Não foi possível carregar as negociações");
              };
            });
          }
        }, {
          key: "apagaTodos",
          value: function apagaTodos() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
              var request = _this3._connection.transaction([_this3._store], 'readwrite').objectStore(_this3._store).clear();

              request.onsuccess = function (e) {
                return resolve("Negociações apagadas com sucesso.");
              };

              request.onerror = function (e) {
                return reject("Erro ao apagar as negociações.");
              };
            });
          }
        }]);

        return NegociacaoDao;
      }());

      _export("NegociacaoDao", NegociacaoDao);
    }
  };
});
//# sourceMappingURL=NegociacaoDao.js.map