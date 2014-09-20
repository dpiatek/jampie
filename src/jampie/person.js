const util = require("util");
const Base = require("./base");

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

Person.prototype.getLikes = function() {
  return this.fetch.call(this, { url: this.createPath("likes") });
};

Person.prototype.getJams = function() {
  return this.fetch.call(this, { url: this.createPath("jams") });
};

Person.prototype.getFollowing = function() {
  return this.fetch.call(this, { url: this.createPath("following") });
};

Person.prototype.getFollowers = function() {
  return this.fetch.call(this, { url: this.createPath("followers") });
};

module.exports = Person;
