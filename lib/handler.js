/* global JSON */

import {METADATA_KEY} from './consts.js';

export default function handler(xhr, resolve, reject) {
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
