const baseUrl = "http://api.thisismyjam.com";
const version = "1";

var uxhr = require("uxhr");
var apiKey = null;

function Base() {}

Base.prototype.setApiKey = string => apiKey = string;

Base.prototype.constructUrl = function(string) {
  return [baseUrl, version, string].join("/") + ".json";
};

Base.prototype.makeRequest = function(url) {
  var keyParam = apiKey ? { key: apiKey } : {};

  return new Promise(function(resolve, reject) {
    uxhr(url, keyParam, {
      success: function(data) {
        try {
          data = JSON.parse(data);
          resolve(data);
        } catch(err) {
          reject(err);
        }
      },
      error: function(err) {
        reject(err);
      }
    });
  });
};

module.exports = Base;
