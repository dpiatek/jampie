const util = require("util");
const Base = require("./jampie/base");
const Person = require("./jampie/person");

function Jampie() {
  Base.call(this);
}

util.inherits(Jampie, Base);

Jampie.prototype.getPerson = function(name) {
  var url = this.createUrl(name), key = this.apiKey;
  return this.fetch({ url: url, fn: Person, key: key, prop: "person" });
};

module.exports = new Jampie();
