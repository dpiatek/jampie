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
  var url = this.createUrl(likesPath);
  return this.fetch.call(this, { url: url });
};

module.exports = Person;
