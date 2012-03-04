var isNumber = function(number) {
  return Object.prototype.toString.call(number) == '[object Number]';
};


//random integer between min and max
var int = function(min, max){
  if (!isNumber(min)) min = -10000000;
  if (!isNumber(max)) max = 10000000;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var float = function(min, max, minDigits, maxDigits) {
  if (!isNumber(min)) min = -10000000;
  if (!isNumber(max)) max = 10000000;
  if (!isNumber(minDigits)) minDigits = 2;
  if (!isNumber(maxDigits)) maxDigits = 4;
  return +((Math.random() * (max - min) + min).toFixed(int(minDigits, maxDigits)));
};

// id 
var minId = 0;
var id = function(min) { 
  if (isNumber(min)) minId = min; 
  return minId++;
};

//random timestamps
var timestamp = function() {
  var now = new Date().getTime(),
    from1900 = new Date('1900').getTime();
  return int(from1900, now);
};

//random dates
var date = function() {
  return new Date(timestamp());
};

//random boolean
var bool = function() {
  return !!int(0,1);
};

//guid/uuid
//http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
var guid = function() {
  var s4 = function() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  return (s4()+s4()+"-"+s4()+"-"+s4()+"-"+s4()+"-"+s4()+s4()+s4());
};
var uuid = guid;