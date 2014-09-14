var util = require('util');
var Base = require('./base');

function Person(name) {
  this.name = name;
}

util.inherits(Person, Base);

Person.prototype.get = function() {
  var url = this.constructUrl(this.name);
  return this.makeRequest(url);
};


module.exports = Person;
