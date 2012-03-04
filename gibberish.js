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

  g.version = '0.1.0';

  /**
   * Check if `n` is a number.
   */

  var isNumber = function(n) {
    return '[object Number]' == {}.toString.call(n);
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

  g.timestamp = function() {
    var from = new Date('1900').getTime()
      , now = new Date().getTime();
    return g.int(from, now);
  };

  /**
   * Random dates.
   */

  g.date = function() {
    return new Date(g.timestamp());
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