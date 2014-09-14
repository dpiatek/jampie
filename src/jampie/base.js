const uxhr = require("uxhr");
const baseUrl = "http://api.thisismyjam.com";
const version = "1";

function Base() {}

Base.prototype.setApiKey = function(key) {
  this.apiKey = key;
};

Base.prototype.createUrl = function(string) {
  return [baseUrl, version, string].join("/") + ".json";
};

Base.prototype.fetch = function(options) {
  var keyParam = options.key ? { key: options.key } : {};

  var promise = new Promise(function(resolve, reject) {
    uxhr(options.url, keyParam, {
      success: data => resolve(data),
      error: err => reject(err)
    });
  });

  return promise
    .then(JSON.parse)
    .then(function(result) {
      var Fn = options.fn;

      if (keyParam) result.apiKey = options.key;

      return Fn ? new Fn(result) : result;
    });
};

module.exports = Base;
