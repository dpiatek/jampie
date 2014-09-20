const util = require("util");
const Base = require("./base");
const endpoints = [
  "Likes", "Jams", "Following", "Followers"
];

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

Person.prototype.fetchWrapper = function(endpoint) {
  return this.fetch.call(this, { url: this.createPath(endpoint) });
};

endpoints.forEach(function(endpoint) {
  Person.prototype["get" + endpoint] = function() {
    return this.fetchWrapper(endpoint.toLowerCase());
  };
});

module.exports = Person;
