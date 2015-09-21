/* global JSON, window */

var Promise = require('es6-promise').Promise;
var xmlhttprequest = require('xmlhttprequest');

var METADATA_KEY = require('./consts.js').METADATA_KEY;
module.exports.METADATA_KEY = METADATA_KEY;

var handler = require('./handler.js');

var _config = {
  endPoint: '',
  domain: ''
};

var _requestJSON = function (method, path, bodyObject) {
  var url,
    xhr,
    promise;

  if (path[0] === '/') {
    // relative starts with '/'
    if (_config.domain) {
      // if we have a domain
      url = _config.domain;
    } else {
      // else, current domain (relative)
      url = '';
    }
    // add the end point to the domain
    url = url + _config.endPoint + path;
  } else {
    // absolute path
    url = path;
  }

  promise = new Promise(function (resolve, reject) {
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

module.exports.config = {
  setEndpoint: function (endPoint) {
    _config.endPoint = endPoint;
  },

  setDomain: function (domain) {
    _config.domain = domain;
  }
};

module.exports.GET = function (path) {
  return _requestJSON('GET', path, null);
};

module.exports.POST = function (path, bodyObject) {
  return _requestJSON('POST', path, bodyObject);
};

module.exports.PUT = function (path, bodyObject) {
  return _requestJSON('PUT', path, bodyObject);
};

module.exports.DELETE = function (path) {
  return _requestJSON('DELETE', path, null);
};

module.exports.PATCH = function (path, bodyObject) {
  return _requestJSON('PATCH', path, bodyObject);
};

module.exports.resolve = function (data) {
  return new Promise(function (resolve, reject) {
    resolve(data);
  });
};

module.exports.reject = function (reason) {
  return new Promise(function (resolve, reject) {
    reject(reason);
  });
};
