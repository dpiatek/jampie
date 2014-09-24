var util = require("util");
var Base = require("./base");

function Person(data) {
  for (var prop in data) {
    this[prop] = data[prop];
  }
  Base.call(this);
}

util.inherits(Person, Base);

Person.prototype.createPath = function createPath(string) {
  return [this.person.name, string].join("/");
};

Person.prototype.fetchWrapper = function(endpoint, params) {
  return this.fetch.call(this, { url: this.createPath(endpoint), params: params });
};

Base.endpoints.forEach(function(endpoint) {
  Person.prototype["get" + endpoint] = function(params) {
    return this.fetchWrapper(endpoint.toLowerCase(), params);
  };
});

module.exports = Person;
