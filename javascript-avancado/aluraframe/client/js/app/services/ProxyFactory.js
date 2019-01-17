"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var ProxyFactory;

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

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
      _export("ProxyFactory", ProxyFactory = function () {
        function ProxyFactory() {
          _classCallCheck(this, ProxyFactory);
        }

        _createClass(ProxyFactory, null, [{
          key: "create",
          value: function create(object, props, acao) {
            var proxy = new Proxy(object, {
              get: function get(target, prop, receiver) {
                if (props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {
                  return function () {
                    var retorno = Reflect.apply(target[prop], target, arguments);
                    acao(target);
                    return retorno;
                  };
                }

                return Reflect.get(target, prop, receiver);
              },
              set: function set(target, prop, value, receiver) {
                var retorno = Reflect.set(target, prop, value, receiver);
                if (props.includes(prop)) acao(target);
                return retorno;
              }
            });
            return proxy;
          }
        }, {
          key: "_ehFuncao",
          value: function _ehFuncao(value) {
            return _typeof(value) == (typeof Function === "undefined" ? "undefined" : _typeof(Function));
          }
        }]);

        return ProxyFactory;
      }());

      _export("ProxyFactory", ProxyFactory);
    }
  };
});
//# sourceMappingURL=ProxyFactory.js.map