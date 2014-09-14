var Person = require('./jampie/person');

module.exports = {
  getPerson: function(name) {
    var person = new Person(name);
    person.setApiKey(this.apiKey);
    return person.get();
  },
  setApiKey: function(apiKey) {
    this.apiKey = apiKey;
  }
};
