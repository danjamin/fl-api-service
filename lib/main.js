/* global JSON */

import {Promise} from 'es6-promise';
import xmlhttprequest from 'xmlhttprequest';

export {METADATA_KEY} from './consts.js';
import handler from './handler.js';
import cache from './cache.js';

var _config = {
  endPoint: ''
};

var _requestJSON = function (method, path, bodyObject, cacheFor) {
  // relative starts with '/'
  var url = path[0] === '/' ? _config.endPoint + path : path;

  var xhr;
  var promise;
  var cacheInfo;

  // check cache during GET and resolve right away
  if (method === 'GET' && cache.has(url)) {
    return new Promise(function (resolve) {
      resolve(cache.get(url));
    });
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

    if (cacheFor) {
      cacheInfo = {
        cacheFor: cacheFor,
        key: url,
        cache: cache
      };
    }

    xhr.onreadystatechange = handler.bind(null, xhr, resolve, reject, cacheInfo);
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

export function GET(path, cacheFor) {
  cacheFor = typeof cacheFor === 'string' ? cacheFor : undefined;
  return _requestJSON('GET', path, null, cacheFor);
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
