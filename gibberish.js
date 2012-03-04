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
    var seconds = 'less than a minute'
      , minute = 'about a minute'
      , hour = 'about an hour'
      , day = 'a day'
      , month = 'about a month'
      , year = 'about a year'
      , minutes = g.int(2, 44) + ' minutes'
      , hours = 'about ' + g.int(2, 23) + ' hours'
      , days = g.int(2, 29) + ' days'
      , months = g.int(2, 11) + ' months'
      , years = g.int(2, 10) + ' years'
      , all = [seconds, minute, minutes, hour, hours, day, days, month, months, year, years]
      , index = g.int(0, all.length-1)
      , suffix = g.bool() ? 'ago' : 'from now';
    return all[index] + ' ' + suffix;
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