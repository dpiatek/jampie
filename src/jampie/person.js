const util = require("util");
const Base = require("./base");

function Person(data) {
  for (var prop in data) {
    this[prop] = data[prop];
  }
  Base.call(this);
}

util.inherits(Person, Base);

Person.prototype.getLikes = function() {
  var likesPath = [this.person.name, "likes"].join("/");
  return this.fetch.call(this, { url: likesPath });
};

Person.prototype.getJams = function() {
  var jamsPath = [this.person.name, "jams"].join("/");
  return this.fetch.call(this, { url: jamsPath });
};

Person.prototype.getFollowing = function() {
  var followingPath = [this.person.name, "following"].join("/");
  return this.fetch.call(this, { url: followingPath });
};

Person.prototype.getFollowers = function() {
  var followersPath = [this.person.name, "followers"].join("/");
  return this.fetch.call(this, { url: followersPath });
};

module.exports = Person;
