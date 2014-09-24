var util = require("util");
var Base = require("./jampie/base");
var Person = require("./jampie/person");

function Jampie() {
  Base.call(this);
}

util.inherits(Jampie, Base);

Jampie.prototype.getPerson = function(name) {
  return this.fetch.call(this, { url: name, fn: Person });
};

Base.endpoints.forEach(function(endpoint) {
  Jampie.prototype["get" + endpoint + "For"] = function(name, params) {
    return this.fetch.call(this, { url: [name, endpoint.toLowerCase()].join("/"), params: params });
  };
});

module.exports = new Jampie();
