'use strict';

var es6_promise = require('es6-promise');
var xmlhttprequest = require('xmlhttprequest');
xmlhttprequest = ('default' in xmlhttprequest ? xmlhttprequest['default'] : xmlhttprequest);

var METADATA_KEY = '__API_metadata__';

exports.METADATA_KEY = METADATA_KEY;

/* global JSON */

function handler(xhr, resolve, reject) {
  var response;

  try {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        response = JSON.parse(xhr.responseText);
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

/* global JSON */

var _config = {
  endPoint: ''
};

var _requestJSON = function (method, path, bodyObject) {
  // relative starts with '/'
  var url = path[0] === '/' ? _config.endPoint + path : path;

  var xhr;
  var promise;

  promise = new es6_promise.Promise(function (resolve, reject) {
    if (typeof window === 'undefined') {
      xhr = new xmlhttprequest.XMLHttpRequest();
    } else if (window.XMLHttpRequest) {
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

    xhr.onreadystatechange = handler.bind(null, xhr, resolve, reject);
    xhr.open(method, url);
    xhr.setRequestHeader('Accept', 'application/json');

    if (bodyObject) {
      xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
      xhr.send(JSON.stringify(bodyObject));
    } else {
      xhr.setRequestHeader('Content-Type', 'text/plain;charset=utf-8');
      xhr.send();
    }
  });

  return promise;
};

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
  return new es6_promise.Promise(function (resolve, reject) {
    resolve(data);
  });
}

function reject(reason) {
  return new es6_promise.Promise(function (resolve, reject) {
    reject(reason);
  });
}

exports.config = config;
exports.GET = GET;
exports.POST = POST;
exports.PUT = PUT;
exports.DELETE = DELETE;
exports.PATCH = PATCH;
exports.resolve = resolve;
exports.reject = reject;