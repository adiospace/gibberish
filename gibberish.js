/*!
 * gibberish
 * Copyright (c) 2012 Adrian Olaru <agolaru@gmail.com>
 * MIT Licensed
 */

 (function() {

  /**
   * Gibberish object
   */

  var g = {};

  /**
   * Export the Gibberish object for __Node.js__,  and __Browser__.
   */ 

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = g;
    }
    exports.gibberish = g;
  } else {
    this['gibberish'] = g;
  }

  /**
   * Library version.
   */

  g.version = '0.1.1';

  /**
   * Check if `n` is a number.
   */

  var isNumber = function(n) {
    return '[object Number]' == {}.toString.call(n);
  };

  /**
   * Check if `obj` is a function.
   */

  var isFunction = function(obj) {
    return '[object Function]' == {}.toString.call(obj);
  };

  /**
   * Trim `text`.
   */

  var nativeTrim = String.prototype.trim;
  var trim = function(text) {
    if (text == null) return '';
    if (nativeTrim) return nativeTrim.call(text);
    var trimLeft = /^\s+/
    , trimRight = /\s+$/;
    return text.toString().replace(trimLeft, '').replace(trimRight, '');
  };

  /** 
  * Global counter for id increments
  */

  var minId = 0;

  /**
   * Random integer between min and max.
   */

  g.int = function(min, max){
    if (!isNumber(min)) min = -10000000;
    if (!isNumber(max)) max = 10000000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  /**
   * Random floats between min and max and with min and max digits
   */

  g.float = function(min, max, minDigits, maxDigits) {
    if (!isNumber(min)) min = -10000000;
    if (!isNumber(max)) max = 10000000;
    if (!isNumber(minDigits)) minDigits = 2;
    if (!isNumber(maxDigits)) maxDigits = 4;
    return +((Math.random() * (max - min) + min).toFixed(g.int(minDigits, maxDigits)));
  };

  /**
   * Random timestamps - between 1900 and present
   */

  g.timestamp = function(min, max) {
    if (!isNumber(min)) min = 0; 
    if (!isNumber(max)) max = +(new Date);
    return g.int(min, max);
  };

  /**
   * Random dates.
   */

  g.date = function() {
    return new Date(g.timestamp());
  };

  /**
  * Random ago strings
  */

  g.ago = function() {
    var config = {
        prefixAgo: null
      , prefixFromNow: null
      , suffixAgo: "ago"
      , suffixFromNow: "from now"

      , seconds: "less than a minute"
      , minute: "about a minute"
      , minutes: "%d minutes"
      , hour: "about an hour"
      , hours: "about %d hours"
      , day: "a day"
      , days: "%d days"
      , month: "about a month"
      , months: "%d months"
      , year: "about a year"
      , years: "%d years"
    };

    var now = +(new Date)
      , min = now - 7884000000 // 3 months ago
      , max = now + 7884000000 // 3 months from now
      , current = g.timestamp(min, max)
      , distance = now - current
      , prefix = config.prefixAgo
      , suffix = config.suffixAgo
      , seconds = Math.abs(distance) / 1000
      , minutes = seconds / 60
      , hours = minutes / 60
      , days = hours / 24
      , years = days / 365;

    var result = function(text, number) { 
      return trim([prefix, text.replace(/%d/i, number), suffix].join(' '));
    };

    if (distance < 0) {
      prefix = config.prefixFromNow;
      suffix = config.suffixFromNow;
    }

    if (seconds < 45) return result(config.seconds, Math.round(seconds));
    if (seconds < 90) return result(config.minute, 1);
    if (minutes < 45) return result(config.minutes, Math.round(minutes));
    if (minutes < 90) return result(config.hour, 1);
    if (hours < 24) return result(config.hours, Math.round(hours));
    if (hours < 48) return result(config.day, 1);
    if (days < 30) return result(config.days, Math.floor(days));
    if (days < 60) return result(config.month, 1);
    if (days < 365) return result(config.months, Math.floor(days / 30));
    if (years < 2) return result(config.year, 1);
    return result(config.years, Math.floor(years));
  };

  /**
   * Random boolean.
   */

  g.bool = function() {
    return !!g.int(0,1);
  };

  /**
   * Id increments.
   */

  g.id = function(min) { 
    if (isNumber(min)) minId = min; 
    return ++minId;
  };

  /**
   * GUID.
   */

  g.guid = function() {
    var s4 = function() {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (s4()+s4()+"-"+s4()+"-"+s4()+"-"+s4()+"-"+s4()+s4()+s4());
  };
  g.uuid = g.guid;
}).call(this);