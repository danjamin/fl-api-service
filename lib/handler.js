/* global JSON */

import {METADATA_KEY} from './consts.js';

export default function handler(xhr, resolve, reject, cacheInfo) {
  var response;

  try {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        response = JSON.parse(xhr.responseText);
        response[METADATA_KEY] = {
          xhr: xhr
        };

        // cache response when applicable
        // TODO: add tests for this
        if (cacheInfo && cacheInfo.cacheFor) {
          cacheInfo.cache.set(cacheInfo.key, response, cacheInfo.cacheFor);
        }

        resolve(response);
      } else {
        reject(xhr);
      }
    }
  } catch (e) {
    reject(e);
  }
}
