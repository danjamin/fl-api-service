var _cache = {};

// TODO: add tests

/**
 * Checks if an item is expired
 * @param object item
 * @param Date now What is the date? 
 */
function _isExpired(item, now) {
  // expired if the date that expired is in the past
  return item.expires <= now;
}

// TODO: break out and test separately
function _dateAdd(date, additionStr) {
  var interval = additionStr.substr(-1).toLowerCase();
  var units = parseInt(additionStr.substr(0, additionStr.length - 1), 10);
  var adjusted = new Date(date);

  switch (interval) {
    case 'd':
      adjusted.setDate(adjusted.getDate() + units);
      break;
    case 'h':
      adjusted.setTime(adjusted.getTime() + units*3600000);
      break;
    case 'm':
      adjusted.setTime(adjusted.getTime() + units*60000);
      break;
    case 's':
      adjusted.setTime(adjusted.getTime() + units*1000);
      break;
  }

  return adjusted;
}

export default {
  /**
   * Set a value by key, and set how long to cache it for
   * @param string key
   * @param mixed value
   * @param string cacheFor The cache for string (e.g. '15s' = 15 seconds, '5m' = 5 minutes, '5h' = 5 hours, '5d' = 5 days)
   *    Largest is days, shortest is seconds.
   */
  set: function (key, value, cacheFor) {
    _cache[key] = {
      value: value,
      expires: _dateAdd(new Date(), cacheFor)
    };
  },

  /**
   * Gets an value by key
   * @param string key
   * @param Date [now] Override now (mainly for testing)
   * @return mixed|null The value, or null if not found or expired
   */
  get: function (key, now) {
    if (this.has(key, now)) {
      return _cache[key].value;
    }

    return null;
  },

  /**
   * Checks if the cache has a valid entry by key name
   * @param string key
   * @param Date [now] Override now (mainly for testing)
   * @return true If contains entry AND it is still valid
   */
  has: function (key, now) {
    if (_cache.hasOwnProperty(key)) {
      now = now ? now : new Date();
      if (_isExpired(_cache[key], now)) {
        // take this opportunity to invalidate it
        this.invalidate(key);
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  },

  /**
   * Invalidates (deletes) cache entry by key
   * @param string key
   * @return bool True if successful
   */
  invalidate: function (key) {
    if (_cache.hasOwnProperty(key)) {
      delete _cache[key];
      return true;
    }
    return false;
  },

  /**
   * Resets the entire cache!
   * Be careful with this
   */
  reset: function () {
    _cache = {};
  }
};
