/* global JSON */

var METADATA_KEY = require('./consts.js').METADATA_KEY;

module.exports = function handler(xhr, resolve, reject) {
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
};
