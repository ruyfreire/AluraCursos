"use strict";

System.register(["./View", "../helpers/DateHelper", "../controllers/NegociacaoController"], function (_export, _context) {
  "use strict";

  var View, DateHelper, currentInstance, NegociacoesView;

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

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  return {
    setters: [function (_View2) {
      View = _View2.View;
    }, function (_helpersDateHelper) {
      DateHelper = _helpersDateHelper.DateHelper;
    }, function (_controllersNegociacaoController) {
      currentInstance = _controllersNegociacaoController.currentInstance;
    }],
    execute: function () {
      _export("NegociacoesView", NegociacoesView = function (_View) {
        _inherits(NegociacoesView, _View);

        function NegociacoesView(elemento) {
          var _this;

          _classCallCheck(this, NegociacoesView);

          _this = _possibleConstructorReturn(this, _getPrototypeOf(NegociacoesView).call(this, elemento));
          elemento.addEventListener('click', function (event) {
            if (event.target.nodeName == 'TH') currentInstance().ordena(event.target.textContent.toLowerCase());
          });
          return _this;
        }

        _createClass(NegociacoesView, [{
          key: "template",
          value: function template(modelo) {
            return "\n        <table class=\"table table-hover table-bordered\">\n            <thead>\n                <tr>\n                    <th style=\"cursor: pointer\">DATA</th>\n                    <th style=\"cursor: pointer\">QUANTIDADE</th>\n                    <th style=\"cursor: pointer\">VALOR</th>\n                    <th style=\"cursor: pointer\">VOLUME</th>\n                </tr>\n            </thead>\n            \n            <tbody>\n                ".concat(modelo.listaNegociacoes.map(function (n) {
              return "\n                    <tr>\n                        <td>".concat(DateHelper.dataParaTexto(n.data), "</td>\n                        <td>").concat(n.quantidade, "</td>\n                        <td>").concat(n.valor, "</td>\n                        <td>").concat(n.volume, "</td>\n                    </tr>\n                ");
            }).join(''), "\n            </tbody>\n            \n            <tfoot>\n                <td colspan=\"3\"></td>\n                <td> ").concat(modelo.volumeTotal, " </td>\n            </tfoot>\n        </table>\n        ");
          }
        }]);

        return NegociacoesView;
      }(View));

      _export("NegociacoesView", NegociacoesView);
    }
  };
});
//# sourceMappingURL=NegociacoesView.js.map