define(
  ["rsvp","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    /* global JSON */

    var RSVP = __dependency1__["default"] || __dependency1__;

    var _config,
      METADATA_KEY = '__API_metadata__';

    _config = {
      endPoint: ''
    };

    var _requestJSON = function (method, path, bodyObject) {
      // relative starts with '/'
      var url = path[0] === '/' ? _config.endPoint + path : path;

      var xhr;
      var promise;

      promise = new RSVP.Promise(function (resolve, reject) {
        if (window.XMLHttpRequest) {
          xhr = new window.XMLHttpRequest();
        } else if (window.ActiveXObject) { // IE
          try {
            xhr = new window.ActiveXObject('Msxml2.XMLHTTP');
          } catch (e) {
            try {
              xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
            } catch (err) {}
          }
        }

        if (!xhr) {
          throw new Error('Unable to make AJAX requests in this browser');
        }

        xhr.onreadystatechange = handler;
        xhr.open(method, url);
        xhr.setRequestHeader('Accept', 'application/json');

        if (bodyObject) {
          xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
          xhr.send(JSON.stringify(bodyObject));
        } else {
          xhr.setRequestHeader('Content-Type', 'text/plain;charset=utf-8');
          xhr.send();
        }

        function handler() {
          var response;

          try {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                response = window.JSON.parse(xhr.responseText);
                response[METADATA_KEY] = {
                  xhr: xhr
                };
                resolve(response);
              } else {
                reject(xhr);
              }
            }
          } catch (e) {
            reject(e);
          }
        }
      });

      return promise;
    };

    var METADATA_KEY = METADATA_KEY;
    __exports__.METADATA_KEY = METADATA_KEY;
    var config = {
      setEndpoint: function (endPoint) {
        _config.endPoint = endPoint;
      }
    };
    __exports__.config = config;
    function GET(path) {
      return _requestJSON('GET', path, null);
    }

    __exports__.GET = GET;function POST(path, bodyObject) {
      return _requestJSON('POST', path, bodyObject);
    }

    __exports__.POST = POST;function PUT(path, bodyObject) {
      return _requestJSON('PUT', path, bodyObject);
    }

    __exports__.PUT = PUT;function DELETE(path) {
      return _requestJSON('DELETE', path, null);
    }

    __exports__.DELETE = DELETE;function PATCH(path, bodyObject) {
      return _requestJSON('PATCH', path, bodyObject);
    }

    __exports__.PATCH = PATCH;function resolve(data) {
      return new RSVP.Promise(function (resolve, reject) {
        resolve(data);
      });
    }

    __exports__.resolve = resolve;function reject(reason) {
      return new RSVP.Promise(function (resolve, reject) {
        reject(reason);
      });
    }

    __exports__.reject = reject;
  });