var uxhr = require("uxhr");
var baseUrl = "http://api.thisismyjam.com";
var version = "1";
var endpoints = ["Likes", "Jams", "Following", "Followers"];

function Base() {}

Base.endpoints = endpoints;
Base.baseUrl = baseUrl;
Base.version = version;

Base.prototype.setApiKey = function(key) {
  this.apiKey = key;
};

Base.prototype.createUrl = function(string) {
  return [baseUrl, version, string].join("/") + ".json";
};

Base.prototype.fetch = function(options) {
  var key = this.apiKey;
  var url = this.createUrl(options.url);
  var params = options.params || {};

  if (key) params.key = key;

  var promise = new Promise(function(resolve, reject) {
    uxhr(url, params, {
      success: function(data) {
        resolve(data);
      },
      error: function(err) {
        reject(err);
      }
    });
  });

  var decorateResults = function(result) {
    var Fn = options.fn, instance;

    if (Fn) {
      instance = new Fn(result);
      instance.setApiKey(key);
      return instance;
    } else {
      return result;
    }
  };

  return promise
    .then(JSON.parse)
    .then(decorateResults);
};

module.exports = Base;
