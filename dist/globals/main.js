!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),(f.fl||(f.fl={})).APIService=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";
/* global JSON */

var RSVP = window.RSVP["default"] || window.RSVP;

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
exports.METADATA_KEY = METADATA_KEY;
var config = {
  setEndpoint: function (endPoint) {
    _config.endPoint = endPoint;
  }
};
exports.config = config;
function GET(path) {
  return _requestJSON('GET', path, null);
}

exports.GET = GET;function POST(path, bodyObject) {
  return _requestJSON('POST', path, bodyObject);
}

exports.POST = POST;function PUT(path, bodyObject) {
  return _requestJSON('PUT', path, bodyObject);
}

exports.PUT = PUT;function DELETE(path) {
  return _requestJSON('DELETE', path, null);
}

exports.DELETE = DELETE;function PATCH(path, bodyObject) {
  return _requestJSON('PATCH', path, bodyObject);
}

exports.PATCH = PATCH;function resolve(data) {
  return new RSVP.Promise(function (resolve, reject) {
    resolve(data);
  });
}

exports.resolve = resolve;function reject(reason) {
  return new RSVP.Promise(function (resolve, reject) {
    reject(reason);
  });
}

exports.reject = reject;
},{}]},{},[1])
(1)
});