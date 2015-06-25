(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rsvp')) :
  typeof define === 'function' && define.amd ? define(['exports', 'rsvp'], factory) :
  factory((global.FLAPIService = {}), global.RSVP)
}(this, function (exports, RSVP) { 'use strict';

  RSVP = ('default' in RSVP ? RSVP['default'] : RSVP);

  /* global JSON */

  var _config,
    main__METADATA_KEY = '__API_metadata__';

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
              response[main__METADATA_KEY] = {
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

  var main__METADATA_KEY = main__METADATA_KEY;

  var config = {
    setEndpoint: function (endPoint) {
      _config.endPoint = endPoint;
    }
  };

  function GET(path) {
    return _requestJSON('GET', path, null);
  }

  function POST(path, bodyObject) {
    return _requestJSON('POST', path, bodyObject);
  }

  function PUT(path, bodyObject) {
    return _requestJSON('PUT', path, bodyObject);
  }

  function DELETE(path) {
    return _requestJSON('DELETE', path, null);
  }

  function PATCH(path, bodyObject) {
    return _requestJSON('PATCH', path, bodyObject);
  }

  function resolve(data) {
    return new RSVP.Promise(function (resolve, reject) {
      resolve(data);
    });
  }

  function reject(reason) {
    return new RSVP.Promise(function (resolve, reject) {
      reject(reason);
    });
  }

  exports.METADATA_KEY = main__METADATA_KEY;
  exports.config = config;
  exports.GET = GET;
  exports.POST = POST;
  exports.PUT = PUT;
  exports.DELETE = DELETE;
  exports.PATCH = PATCH;
  exports.resolve = resolve;
  exports.reject = reject;

}));