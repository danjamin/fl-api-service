/* global JSON */

import {Promise} from 'es6-promise';
import xmlhttprequest from 'xmlhttprequest';

export {METADATA_KEY} from './consts.js';
import handler from './handler.js';

var _config = {
  endPoint: ''
};

var _requestJSON = function (method, path, bodyObject) {
  // relative starts with '/'
  var url = path[0] === '/' ? _config.endPoint + path : path;

  var xhr;
  var promise;

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

export var config = {
  setEndpoint: function (endPoint) {
    _config.endPoint = endPoint;
  }
};

export function GET(path) {
  return _requestJSON('GET', path, null);
}

export function POST(path, bodyObject) {
  return _requestJSON('POST', path, bodyObject);
}

export function PUT(path, bodyObject) {
  return _requestJSON('PUT', path, bodyObject);
}

export function DELETE(path) {
  return _requestJSON('DELETE', path, null);
}

export function PATCH(path, bodyObject) {
  return _requestJSON('PATCH', path, bodyObject);
}

export function resolve(data) {
  return new Promise(function (resolve, reject) {
    resolve(data);
  });
}

export function reject(reason) {
  return new Promise(function (resolve, reject) {
    reject(reason);
  });
}
