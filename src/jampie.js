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

Base.endpoints.forEach(function(endpoint) {
  Jampie.prototype["get" + endpoint] = function(name, params) {
    return this.fetch.call(this, { url: [name, endpoint.toLowerCase()].join("/"), params: params });
  };
});

module.exports = new Jampie();
