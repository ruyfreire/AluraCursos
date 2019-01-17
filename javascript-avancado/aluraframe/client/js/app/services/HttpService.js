"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var HttpService;

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
      _export("HttpService", HttpService = function () {
        function HttpService() {
          _classCallCheck(this, HttpService);
        }

        _createClass(HttpService, [{
          key: "get",
          value: function get(url) {
            /*
            return fetch(url)
                .then(res => this._handleErrors(res))
                .then(res => res.json());
                  */
            return new Promise(function (resolve, reject) {
              var xhr = new XMLHttpRequest();
              xhr.open('GET', url);

              xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                  if (xhr.status == 200) resolve(JSON.parse(xhr.responseText));else reject(xhr.responseText);
                }
              };

              xhr.send();
            });
          }
        }, {
          key: "post",
          value: function post(url, dado) {
            /*
            return fetch(url, {
                headers: { 'Content-Type': 'application/json' },
                method: 'post',
                body: JSON.stringify(dado)
            })
            .then(res => this._handleErrors(res));
            
            */
            return new Promise(function (resolve, reject) {
              var xhr = new XMLHttpRequest();
              xhr.open("POST", url, true);
              xhr.setRequestHeader("Content-type", "application/json");

              xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                  if (xhr.status == 200) resolve(JSON.parse(xhr.responseText));else reject(xhr.responseText);
                }
              };

              xhr.send(JSON.stringify(dado)); // usando JSON.stringifly para converter objeto em uma string no formato JSON.
            });
          }
        }]);

        return HttpService;
      }());

      _export("HttpService", HttpService);
    }
  };
});
//# sourceMappingURL=HttpService.js.map