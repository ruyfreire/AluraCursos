"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var ListaNegociacoes;

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
    setters: [],
    execute: function () {
      _export("ListaNegociacoes", ListaNegociacoes = function () {
        function ListaNegociacoes() {
          _classCallCheck(this, ListaNegociacoes);

          this._listaNegociacoes = [];
        }

        _createClass(ListaNegociacoes, [{
          key: "adiciona",
          value: function adiciona(negociacoes) {
            this._listaNegociacoes.push(negociacoes);
          }
        }, {
          key: "esvazia",
          value: function esvazia() {
            this._listaNegociacoes = [];
          }
        }, {
          key: "ordena",
          value: function ordena(criterio) {
            this._listaNegociacoes.sort(criterio);
          }
        }, {
          key: "inverteOrdem",
          value: function inverteOrdem() {
            this._listaNegociacoes.reverse();
          }
        }, {
          key: "listaNegociacoes",
          get: function get() {
            return [].concat(this._listaNegociacoes);
          }
        }, {
          key: "volumeTotal",
          get: function get() {
            return this._listaNegociacoes.reduce(function (total, n) {
              return total + n.volume;
            }, 0.0);
          }
        }]);

        return ListaNegociacoes;
      }());

      _export("ListaNegociacoes", ListaNegociacoes);
    }
  };
});
//# sourceMappingURL=ListaNegociacoes.js.map