const util = require("util");
const Base = require("./jampie/base");
const Person = require("./jampie/person");

function Jampie() {
  Base.call(this);
}

util.inherits(Jampie, Base);

Jampie.prototype.getPerson = function(name) {
  var url = this.createUrl(name);
  return this.fetch.call(this, { url: url, fn: Person });
};

Jampie.prototype.getLikes = function(name) {
  var likesPath = [name, "likes"].join("/");
  var url = this.createUrl(likesPath);
  return this.fetch.call(this, { url: url });
};

module.exports = new Jampie();
