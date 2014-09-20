const util = require("util");
const Base = require("./jampie/base");
const Person = require("./jampie/person");

function Jampie() {
  Base.call(this);
}

util.inherits(Jampie, Base);

Jampie.prototype.getPerson = function(name) {
  return this.fetch.call(this, { url: name, fn: Person });
};

Jampie.prototype.getLikes = function(name, params) {
  var likesPath = [name, "likes"].join("/");
  return this.fetch.call(this, { url: likesPath, params: params });
};

module.exports = new Jampie();
