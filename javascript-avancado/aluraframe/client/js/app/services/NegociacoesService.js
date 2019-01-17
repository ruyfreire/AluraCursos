"use strict";

System.register(["../services/HttpService", "../models/Negociacao", "../services/ConnectionFactory", "../dao/NegociacaoDao"], function (_export, _context) {
  "use strict";

  var HttpService, Negociacao, ConnectionFactory, NegociacaoDao, NegociacoesService;

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
    setters: [function (_servicesHttpService) {
      HttpService = _servicesHttpService.HttpService;
    }, function (_modelsNegociacao) {
      Negociacao = _modelsNegociacao.Negociacao;
    }, function (_servicesConnectionFactory) {
      ConnectionFactory = _servicesConnectionFactory.ConnectionFactory;
    }, function (_daoNegociacaoDao) {
      NegociacaoDao = _daoNegociacaoDao.NegociacaoDao;
    }],
    execute: function () {
      _export("NegociacoesService", NegociacoesService = function () {
        function NegociacoesService() {
          _classCallCheck(this, NegociacoesService);

          this._http = new HttpService();
        }

        _createClass(NegociacoesService, [{
          key: "obterNegociacoes",
          value: function obterNegociacoes() {
            return Promise.all([this._obterNegociacoesDaSemana(), this._obterNegociacoesDaSemanaAnterior(), this._obterNegociacoesDaSemanaRetrasada()]).then(function (negociacoes) {
              return negociacoes.reduce(function (arrayAchatado, array) {
                return arrayAchatado.concat(array);
              }, []);
            }).catch(function (erro) {
              return erro;
            });
          }
        }, {
          key: "_obterNegociacoesDaSemana",
          value: function _obterNegociacoesDaSemana() {
            return this._http.get('negociacoes/semana').then(function (negociacoes) {
              return negociacoes.map(function (n) {
                return new Negociacao(new Date(n.data), n.quantidade, n.valor);
              });
            }).catch(function () {
              throw new Error("Erro ao importar Negociações da Semana");
            });
          }
        }, {
          key: "_obterNegociacoesDaSemanaAnterior",
          value: function _obterNegociacoesDaSemanaAnterior() {
            return this._http.get('negociacoes/anterior').then(function (negociacoes) {
              return negociacoes.map(function (n) {
                return new Negociacao(new Date(n.data), n.quantidade, n.valor);
              });
            }).catch(function () {
              throw new Error("Erro ao importar Negociações da Semana Anterior");
            });
          }
        }, {
          key: "_obterNegociacoesDaSemanaRetrasada",
          value: function _obterNegociacoesDaSemanaRetrasada() {
            return this._http.get('negociacoes/retrasada').then(function (negociacoes) {
              return negociacoes.map(function (n) {
                return new Negociacao(new Date(n.data), n.quantidade, n.valor);
              });
            }).catch(function () {
              throw new Error("Erro ao importar Negociações da Semana Retrasada");
            });
          }
        }, {
          key: "cadastra",
          value: function cadastra(negociacao) {
            return ConnectionFactory.getConnection().then(function (connection) {
              return new NegociacaoDao(connection);
            }).then(function (dao) {
              return dao.adiciona(negociacao);
            }).then(function () {
              return "Negociação adicionada com Sucesso";
            }).catch(function (erro) {
              console.log(erro);
              throw new Error("Não foi possível adicionar a negociação");
            });
          }
        }, {
          key: "importa",
          value: function importa(listaAtual) {
            return this.obterNegociacoes().then(function (negociacoes) {
              return negociacoes.filter(function (negociacao) {
                return !listaAtual.some(function (negociacaoExistente) {
                  return negociacao.isEquals(negociacaoExistente);
                });
              });
            }).catch(function (erro) {
              console.log(erro);
              throw new Error("Não foi possível importar as negociações");
            });
          }
        }, {
          key: "lista",
          value: function lista() {
            return ConnectionFactory.getConnection().then(function (con) {
              return new NegociacaoDao(con);
            }).then(function (dao) {
              return dao.listaTodos();
            }).catch(function (erro) {
              console.log(erro);
              throw new Error("Não foi possível obter as negociações");
            });
          }
        }, {
          key: "apaga",
          value: function apaga() {
            return ConnectionFactory.getConnection().then(function (connection) {
              return new NegociacaoDao(connection);
            }).then(function (dao) {
              return dao.apagaTodos();
            }).then(function () {
              return "Negociações apagadas com sucesso";
            }).catch(function (erro) {
              console.log(erro);
              throw new Error("Erro ao apagar as negociações");
            });
          }
        }]);

        return NegociacoesService;
      }());

      _export("NegociacoesService", NegociacoesService);
    }
  };
});
//# sourceMappingURL=NegociacoesService.js.map