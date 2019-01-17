"use strict";

System.register(["../models/ListaNegociacoes", "../models/Mensagem", "../views/NegociacoesView", "../views/MensagemView", "../services/NegociacoesService", "../helpers/DateHelper", "../helpers/Bind", "../models/Negociacao"], function (_export, _context) {
  "use strict";

  var ListaNegociacoes, Mensagem, NegociacoesView, MensagemView, NegociacoesService, DateHelper, Bind, Negociacao, NegociacaoController, negociacaoController;

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
    setters: [function (_modelsListaNegociacoes) {
      ListaNegociacoes = _modelsListaNegociacoes.ListaNegociacoes;
    }, function (_modelsMensagem) {
      Mensagem = _modelsMensagem.Mensagem;
    }, function (_viewsNegociacoesView) {
      NegociacoesView = _viewsNegociacoesView.NegociacoesView;
    }, function (_viewsMensagemView) {
      MensagemView = _viewsMensagemView.MensagemView;
    }, function (_servicesNegociacoesService) {
      NegociacoesService = _servicesNegociacoesService.NegociacoesService;
    }, function (_helpersDateHelper) {
      DateHelper = _helpersDateHelper.DateHelper;
    }, function (_helpersBind) {
      Bind = _helpersBind.Bind;
    }, function (_modelsNegociacao) {
      Negociacao = _modelsNegociacao.Negociacao;
    }],
    execute: function () {
      NegociacaoController = function () {
        function NegociacaoController() {
          _classCallCheck(this, NegociacaoController);

          var $ = document.querySelector.bind(document);
          this._inputData = $("#data");
          this._inputQuantidade = $("#quantidade");
          this._inputValor = $("#valor");
          this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($("#tabelaView")), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');
          this._mensagem = new Bind(new Mensagem(), new MensagemView($("#mensagemView")), 'texto');
          this._ordemAtual = "";
          this._service = new NegociacoesService();

          this._init();
        }

        _createClass(NegociacaoController, [{
          key: "_init",
          value: function _init() {
            var _this = this;

            this._service.lista().then(function (negociacoes) {
              return negociacoes.forEach(function (negociacao) {
                return _this._listaNegociacoes.adiciona(negociacao);
              });
            }).catch(function (erro) {
              return _this._mensagem.texto = erro;
            });

            setInterval(function () {
              return _this.importaNegociacoes();
            }, 3000);
          }
        }, {
          key: "adiciona",
          value: function adiciona(event) {
            var _this2 = this;

            event.preventDefault();

            var negociacao = this._criaNegociacao();

            this._service.cadastra(negociacao).then(function (mensagem) {
              _this2._listaNegociacoes.adiciona(negociacao);

              _this2._mensagem.texto = mensagem;

              _this2._limparFormulario();
            }).catch(function (erro) {
              return _this2._mensagem.texto = erro;
            });
          }
        }, {
          key: "importaNegociacoes",
          value: function importaNegociacoes() {
            var _this3 = this;

            this._service.importa(this._listaNegociacoes.listaNegociacoes).then(function (negociacoes) {
              negociacoes.forEach(function (negociacao) {
                return _this3._listaNegociacoes.adiciona(negociacao);
              });
              _this3._mensagem.texto = "Negociações do período importadas";
            }).catch(function (erro) {
              return _this3._mensagem.texto = erro;
            });
          }
        }, {
          key: "ordena",
          value: function ordena(coluna) {
            if (this._ordemAtual == coluna) this._listaNegociacoes.inverteOrdem();else this._listaNegociacoes.ordena(function (a, b) {
              return a[coluna] - b[coluna];
            });
            this._ordemAtual = coluna;
          }
        }, {
          key: "apaga",
          value: function apaga() {
            var _this4 = this;

            this._service.apaga().then(function (mensagem) {
              _this4._listaNegociacoes.esvazia();

              _this4._mensagem.texto = mensagem;
            }).catch(function (erro) {
              return _this4._mensagem.texto = erro;
            });
          }
        }, {
          key: "_criaNegociacao",
          value: function _criaNegociacao() {
            return new Negociacao(DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseInt(this._inputValor.value));
          }
        }, {
          key: "_limparFormulario",
          value: function _limparFormulario() {
            this._inputData.value = "";

            this._inputData.focus();

            this._inputQuantidade.value = 1;
            this._inputValor.value = 0.0;
          }
        }]);

        return NegociacaoController;
      }();

      negociacaoController = new NegociacaoController();

      function currentInstance() {
        return negociacaoController;
      }

      _export("currentInstance", currentInstance);
    }
  };
});
//# sourceMappingURL=NegociacaoController.js.map